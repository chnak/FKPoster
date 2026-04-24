/**
 * 图片框组件 - 带装饰边框的图片
 */
const { Component } = require('../core/Component')
const { toPixels } = require('../utils/unit-converter')

class ImageFrame extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'imageFrame',
    })

    this.src = config.src
    this.width = config.width || 200
    this.height = config.height || 200
    this.borderColor = config.borderColor || '#ffffff'
    this.borderWidth = config.borderWidth || 3
    this.outerColor = config.outerColor || '#1a1a2e'
    this.outerWidth = config.outerWidth || 6
    this.radius = config.radius || 0
    this.overlayColor = config.overlayColor
    this.overlayOpacity = config.overlayOpacity || 0
    this.fit = config.fit || 'cover'
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._raster = null
    this._initialized = true
  }

  async _loadImage(paper) {
    if (!this._clipRect) return
    try {
      // 使用 paper.Raster 从 URL 加载
      this._raster = new paper.Raster(this.src)

      await new Promise((resolve, reject) => {
        this._raster.onLoad = resolve
        this._raster.onError = reject
      })

      // 计算 cover/contain 适配
      const imgWidth = this._raster.width
      const imgHeight = this._raster.height

      let scale = 1
      if (this.fit === 'cover') {
        scale = Math.max(this.width / imgWidth, this.height / imgHeight)
      } else if (this.fit === 'contain') {
        scale = Math.min(this.width / imgWidth, this.height / imgHeight)
      }

      // 设置 raster 位置（在 clipRect 中心）
      this._raster.position = this._clipRect.bounds.center.clone()

      // 设置 raster 大小
      this._raster.scale(scale)

      // 使用 Group 的 clipped 属性进行裁剪
      // clipRect 已经在 _clipGroup 中，设置 clipped = true 后会自动裁剪组内内容
      this._clipGroup.clipped = true
      this._clipGroup.addChild(this._raster)
    } catch (err) {
      console.warn('[ImageFrame] Failed to load image:', err.message)
    }
  }

  async render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')
    const absOuterWidth = toPixels(this.outerWidth, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const frameX = absX - absWidth * anchorX - (this.outerWidth > 0 ? absOuterWidth : 0)
    const frameY = absY - absHeight * anchorY - (this.outerWidth > 0 ? absOuterWidth : 0)

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    // 添加元素到活动层
    if (paper.project && paper.project.activeLayer) {
      // 外边框
      if (this.outerWidth > 0) {
        const outerRect = new paper.Path.Rectangle({
          point: [frameX, frameY],
          size: [absWidth + absOuterWidth * 2, absHeight + absOuterWidth * 2],
          radius: absRadius + absOuterWidth,
        })
        outerRect.fillColor = new paper.Color(this.outerColor)
        paper.project.activeLayer.addChild(outerRect)
        this._pathElements.push(outerRect)
      }

      // 边框
      if (this.borderWidth > 0) {
        const borderRect = new paper.Path.Rectangle({
          point: [absX - absWidth * anchorX, absY - absHeight * anchorY],
          size: [absWidth, absHeight],
          radius: absRadius,
        })
        borderRect.fillColor = new paper.Color(this.borderColor)
        paper.project.activeLayer.addChild(borderRect)
        this._pathElements.push(borderRect)
      }

      // 裁剪组
      this._clipGroup = new paper.Group()
      const clipRect = new paper.Path.Rectangle({
        point: [absX - absWidth * anchorX, absY - absHeight * anchorY],
        size: [absWidth, absHeight],
        radius: absRadius,
      })
      this._clipRect = clipRect
      this._clipGroup.addChild(clipRect)

      // 叠加色
      if (this.overlayColor && this.overlayOpacity > 0) {
        const overlayRect = new paper.Path.Rectangle({
          point: [absX - absWidth * anchorX, absY - absHeight * anchorY],
          size: [absWidth, absHeight],
          radius: absRadius,
        })
        overlayRect.fillColor = new paper.Color(this.overlayColor)
        overlayRect.fillColor.alpha = this.overlayOpacity
        this._clipGroup.addChild(overlayRect)
      }

      // 加载并添加图片
      if (this.src) {
        await this._loadImage(paper)
      }

      paper.project.activeLayer.addChild(this._clipGroup)
      this._pathElements.push(this._clipGroup)
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
    super.destroy()
  }
}

module.exports = { ImageFrame }