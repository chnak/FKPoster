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
    this._paper = paper
    this._pathElements = []
    this._raster = null
    this._initialized = false
  }

  async _loadImage(paper) {
    try {
      this._raster = new paper.Raster(this.src)

      await new Promise((resolve, reject) => {
        this._raster.onLoad = resolve
        this._raster.onError = reject
      })

      if (this._raster && this._raster.loaded) {
        const imgWidth = this._raster.width
        const imgHeight = this._raster.height
        const imgRatio = imgWidth / imgHeight
        const boxRatio = this.width / this.height

        let drawX = 0, drawY = 0, drawW = this.width, drawH = this.height

        if (this.fit === 'cover') {
          if (imgRatio > boxRatio) {
            drawH = this.height
            drawW = this.height * imgRatio
            drawX = -(drawW - this.width) / 2
          } else {
            drawW = this.width
            drawH = this.width / imgRatio
            drawY = -(drawH - this.height) / 2
          }
        } else if (this.fit === 'contain') {
          if (imgRatio > boxRatio) {
            drawW = this.width
            drawH = this.width / imgRatio
            drawY = (this.height - drawH) / 2
          } else {
            drawH = this.height
            drawW = this.height * imgRatio
            drawX = (this.width - drawW) / 2
          }
        }

        this._raster.bounds = new paper.Rectangle(drawX, drawY, drawW, drawH)
        this._raster.clipped = true
        this._raster.clipMask = this._clipRect
        this._clipGroup.addChild(this._raster)
      }
    } catch (err) {
      console.warn('[ImageFrame] Failed to load image:', err.message)
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')
    const absOuterWidth = toPixels(this.outerWidth, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')

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
          point: [absX - absOuterWidth, absY - absOuterWidth],
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
          point: [absX, absY],
          size: [absWidth, absHeight],
          radius: absRadius,
        })
        borderRect.fillColor = new paper.Color(this.borderColor)
        paper.project.activeLayer.addChild(borderRect)
        this._pathElements.push(borderRect)
      }

      // 裁剪组
      const clipGroup = new paper.Group()
      const clipRect = new paper.Path.Rectangle({
        point: [absX, absY],
        size: [absWidth, absHeight],
        radius: absRadius,
      })
      clipGroup.addChild(clipRect)

      // 叠加色
      if (this.overlayColor && this.overlayOpacity > 0) {
        const overlayRect = new paper.Path.Rectangle({
          point: [absX, absY],
          size: [absWidth, absHeight],
          radius: absRadius,
        })
        overlayRect.fillColor = new paper.Color(this.overlayColor)
        overlayRect.fillColor.alpha = this.overlayOpacity
        clipGroup.addChild(overlayRect)
      }

      paper.project.activeLayer.addChild(clipGroup)
      this._pathElements.push(clipGroup)
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