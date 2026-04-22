/**
 * Chip 标签组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Chip extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'chip',
      width: 'auto',
      height: 'auto',
    })

    this.text = config.text || ''
    this.backgroundColor = config.backgroundColor || '#e0e0e0'
    this.color = config.color || '#333333'
    this.borderColor = config.borderColor
    this.fontSize = config.fontSize || 12
    this.padding = config.padding || 12
    this.radius = config.radius || 16
    this.icon = config.icon
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    // 背景
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this.backgroundColor,
      borderColor: this.borderColor,
      borderWidth: 1,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 图标
    if (this.icon) {
      this._iconElement = new TextElement({
        x: 0,
        y: 0,
        text: this.icon,
        fontSize: 12,
        color: this.color,
        textAlign: 'center',
        anchor: [0.5, 0.5],
        opacity: this.opacity,
      })
      this._iconElement.initialize(paper)
    }

    // 文字
    this._textElement = new TextElement({
      x: 0,
      y: 0,
      text: this.text,
      fontSize: 12,
      fontFamily: this.fontFamily,
      color: this.color,
      textAlign: 'center',
      anchor: [0.5, 0.5],
      opacity: this.opacity,
    })
    this._textElement.initialize(paper)
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absPadding = toPixels(this.padding, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')

    // 计算尺寸
    const textStr = String(this.text || '')
    const chineseChars = (textStr.match(/[\u4e00-\u9fa5]/g) || []).length
    const otherChars = textStr.length - chineseChars
    const textWidth = chineseChars * absFontSize * 1.0 + otherChars * absFontSize * 0.5
    const iconWidth = this.icon ? absFontSize : 0

    const chipWidth = absPadding * 2 + textWidth + iconWidth + 4
    const chipHeight = absFontSize + absPadding * 2

    // 背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = chipWidth
      this._bgElement.height = chipHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX + chipWidth / 2
      this._bgElement.y = absY + chipHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
    }

    // 图标
    if (this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = absX + absPadding + absFontSize / 2
      this._iconElement.y = absY + chipHeight / 2
      this._iconElement.fontSize = absFontSize + 2
      this._iconElement.render(paper, context)
    }

    // 文字
    if (this._textElement && this._textElement._paperItem) {
      const textX = this.icon
        ? absX + absPadding + absFontSize + 4 + chipWidth / 2
        : absX + chipWidth / 2
      this._textElement.x = textX
      this._textElement.y = absY + chipHeight / 2
      this._textElement.fontSize = absFontSize
      this._textElement.render(paper, context)
      this._textElement._paperItem.bringToFront()
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._iconElement) this._iconElement.destroy()
    if (this._textElement) this._textElement.destroy()
    super.destroy()
  }
}

module.exports = { Chip }