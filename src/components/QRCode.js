/**
 * 二维码组件
 */
const { Component } = require('../core/Component')
const { loadImage } = require('canvas')
const QRCodeGenerator = require('qrcode')

class QRCode extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'qrcode',
    })

    this.size = config.size || 200
    this.content = config.content || ''
    this.color = config.color || '#000000'
    this.backgroundColor = config.backgroundColor || '#ffffff'
    this.logo = config.logo
    this.logoSize = config.logoSize
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
    this._raster = null
    this._logoRaster = null
  }

  async _ensureRaster() {
    // 生成二维码
    if (this.content && !this._raster) {
      try {
        const dataUrl = await QRCodeGenerator.toDataURL(this.content, {
          width: this.size,
          margin: 2,
          color: {
            dark: this.color,
            light: this.backgroundColor,
          },
        })

        const imageData = await loadImage(dataUrl)
        this._raster = new this._paper.Raster(imageData)
        await new Promise((resolve, reject) => {
          this._raster.onLoad = resolve
          this._raster.onError = reject
        })
      } catch (err) {
        console.warn('[QRCode] Failed to generate QR code:', err.message)
      }
    }

    // 加载logo
    if (this.logo && !this._logoRaster) {
      try {
        const imageData = await loadImage(this.logo)
        this._logoRaster = new this._paper.Raster(imageData)
        await new Promise((resolve, reject) => {
          this._logoRaster.onLoad = resolve
          this._logoRaster.onError = reject
        })
      } catch (err) {
        console.warn('[QRCode] Failed to load logo:', err.message)
      }
    }
  }

  async render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 等待图片准备好
    await this._ensureRaster()

    // 添加二维码
    if (this._raster && this._raster.loaded) {
      const raster = new this._paper.Raster(this._raster.image)
      raster.bounds = new paper.Rectangle(absX, absY, this.size, this.size)
      paper.project.activeLayer.addChild(raster)
      this._pathElements.push(raster)
    }

    // 添加logo
    if (this.logo && this._logoRaster && this._logoRaster.loaded) {
      const ls = this.logoSize || this.size * 0.2

      // 白色背景
      const logoBg = new paper.Path.Rectangle({
        point: [absX + (this.size - ls) / 2 - 5, absY + (this.size - ls) / 2 - 5],
        size: [ls + 10, ls + 10],
        fillColor: new paper.Color(this.backgroundColor),
        radius: 4,
      })
      logoBg.sendToBack()
      paper.project.activeLayer.addChild(logoBg)
      this._pathElements.push(logoBg)

      // Logo
      const raster = new this._paper.Raster(this._logoRaster.image)
      const scale = ls / Math.max(raster.width, raster.height)
      raster.scale(scale, scale)
      raster.position = new paper.Point(absX + this.size / 2, absY + this.size / 2)
      paper.project.activeLayer.addChild(raster)
      this._pathElements.push(raster)
    }
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    if (this._raster) {
      this._raster.remove()
      this._raster = null
    }
    if (this._logoRaster) {
      this._logoRaster.remove()
      this._logoRaster = null
    }
    super.destroy()
  }
}

module.exports = { QRCode }
