/**
 * 图标组件 - 支持 emoji、图片图标
 */
const { Component } = require('../core/Component')
const { getFontFallbackChain } = require('../fonts')
const { toPixels } = require('../utils/unit-converter')

class Icon extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'icon',
    })

    this.size = config.size || 64
    this.icon = config.icon || '👍' // emoji 或 图片URL
    this.color = config.color
    this.backgroundColor = config.backgroundColor
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 0
    this.radius = config.radius || 0
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
    this._raster = null
  }

  async _loadImage(paper, icon) {
    try {
      const raster = new paper.Raster(icon)
      await new Promise((resolve, reject) => {
        raster.onLoad = resolve
        raster.onError = reject
      })
      return raster
    } catch (err) {
      console.warn('[Icon] Failed to load image:', err.message)
      return null
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')
    const absSize = toPixels(this.size, context2d, 'width')

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    if (this._raster) {
      this._raster.remove()
      this._raster = null
    }

    if (!paper.project || !paper.project.activeLayer) return

    // 背景
    if (this.backgroundColor || this.borderColor) {
      const absRadius = toPixels(this.radius, context2d, 'width')
      const bg = new paper.Path.Rectangle({
        point: [absX, absY],
        size: [absSize, absSize],
        radius: absRadius,
      })

      if (this.backgroundColor) {
        bg.fillColor = new paper.Color(this.backgroundColor)
      }

      if (this.borderColor) {
        bg.strokeColor = new paper.Color(this.borderColor)
        bg.strokeWidth = toPixels(this.borderWidth, context2d, 'width')
      }

      paper.project.activeLayer.addChild(bg)
      this._pathElements.push(bg)
    }

    // 判断是否为图片路径
    const isImagePath = icon => {
      return icon.startsWith('http') || icon.startsWith('data:') ||
        (icon.match(/\.(png|jpg|jpeg|gif|svg|webp|bmp)$/i) && !icon.match(/[\u4e00-\u9fa5]/))
    }

    if (isImagePath(this.icon)) {
      // 图片图标
      const padding = this.backgroundColor ? 8 : 0
      const iconSize = absSize - padding * 2

      this._loadImage(paper, this.icon).then(raster => {
        if (raster && raster.loaded) {
          const scale = iconSize / Math.max(raster.width, raster.height)
          raster.scale(scale, scale)
          raster.position = new paper.Point(absX + absSize / 2, absY + absSize / 2)
          if (paper.project && paper.project.activeLayer) {
            paper.project.activeLayer.addChild(raster)
          }
          this._raster = raster
        }
      })
    } else {
      // Emoji 或文字图标 - 使用字体回退链
      const fontSize = Math.min(absSize * 0.6, 64)
      const fontFamily = getFontFallbackChain(null, this.icon)
      const textItem = new paper.PointText({
        point: [absX + absSize / 2, absY + absSize / 2 + fontSize / 3],
        content: this.icon,
        fontSize,
        fontFamily,
        justification: 'center',
      })
      if (this.color) {
        textItem.fillColor = new paper.Color(this.color)
      }
      paper.project.activeLayer.addChild(textItem)
      this._pathElements.push(textItem)
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

module.exports = { Icon }
