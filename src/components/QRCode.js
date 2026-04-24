/**
 * 二维码组件
 */
const { Component } = require('../core/Component')
const { loadImage } = require('canvas')
const QRCodeGenerator = require('qrcode')
const { toPixels } = require('../utils/unit-converter')

class QRCode extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'qrcode',
    })

    this.size = config.size || 200
    this.content = config.content || config.value || ''
    this.color = config.color || '#000000'
    this.backgroundColor = config.backgroundColor || '#ffffff'
    this.logo = config.logo
    this.logoSize = config.logoSize
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._rasterImage = null
    this._logoImage = null
    this._initialized = true
  }

  async _ensureRaster() {
    // 生成二维码
    if (this.content && !this._rasterImage) {
      try {
        const dataUrl = await QRCodeGenerator.toDataURL(this.content, {
          width: this.size,
          margin: 2,
          color: {
            dark: this.color,
            light: this.backgroundColor,
          },
        })

        this._rasterImage = await loadImage(dataUrl)
      } catch (err) {
        console.warn('[QRCode] Failed to generate QR code:', err.message)
      }
    }

    // 加载logo
    if (this.logo && !this._logoImage) {
      try {
        this._logoImage = await loadImage(this.logo)
      } catch (err) {
        console.warn('[QRCode] Failed to load logo:', err.message)
      }
    }
  }

  async render(paper, context = {}) {
    if (!this._initialized) this.initialize(paper)
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 支持 anchor 定位 - 改为 [0.5, 0.5] 默认中心定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5

    // 根据 anchor 计算实际绘制起始位置
    const drawX = absX - this.size * anchorX
    const drawY = absY - this.size * anchorY
    const centerX = drawX + this.size / 2
    const centerY = drawY + this.size / 2

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 等待图片准备好
    await this._ensureRaster()

    // 添加二维码
    if (this._rasterImage) {
      const raster = new this._paper.Raster(this._rasterImage)
      raster.bounds = new paper.Rectangle(drawX, drawY, this.size, this.size)
      paper.project.activeLayer.addChild(raster)
      this._pathElements.push(raster)
    }

    // 添加logo
    if (this.logo && this._logoImage) {
      const ls = this.logoSize || this.size * 0.2

      // 白色背景
      const logoBg = new paper.Path.Rectangle({
        point: [centerX - ls / 2 - 5, centerY - ls / 2 - 5],
        size: [ls + 10, ls + 10],
        fillColor: new paper.Color(this.backgroundColor),
        radius: 4,
      })
      logoBg.sendToBack()
      paper.project.activeLayer.addChild(logoBg)
      this._pathElements.push(logoBg)

      // Logo
      const raster = new this._paper.Raster(this._logoImage)
      const scale = ls / Math.max(raster.width, raster.height)
      raster.scale(scale, scale)
      raster.position = new paper.Point(centerX, centerY)
      paper.project.activeLayer.addChild(raster)
      this._pathElements.push(raster)
    }
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    this._rasterImage = null
    this._logoImage = null
    super.destroy()
  }
}

module.exports = { QRCode }
