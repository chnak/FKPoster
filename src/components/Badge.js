/**
 * 徽章/标签组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Badge extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'badge',
      width: 'auto',
      height: 'auto',
    })

    this.text = config.text || ''
    this.backgroundColor = config.backgroundColor || '#007bff'
    this.color = config.color || '#ffffff'
    this.borderColor = config.borderColor
    this.fontSize = config.fontSize || 18
    this.padding = config.padding || 15
    this.radius = config.radius || 4
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    if (this._initialized) return
    this._initialized = true

    // 创建占位的背景（会在 render 时设置实际尺寸）
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

    // 文字 - 居中定位（临时值，会在 render 时更新）
    this._textElement = new TextElement({
      x: 0,
      y: 0,
      text: this.text,
      fontSize: this.fontSize,
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

    const badgeWidth = textWidth + absPadding * 2
    const badgeHeight = absFontSize + absPadding * 2

    // 背景位置 - 居中定位
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = badgeWidth
      this._bgElement.height = badgeHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX + badgeWidth / 2
      this._bgElement.y = absY + badgeHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
    }

    // 文字位置 - 居中定位
    if (this._textElement && this._textElement._paperItem) {
      this._textElement.x = absX + badgeWidth / 2
      this._textElement.y = absY + badgeHeight / 2
      this._textElement.fontSize = absFontSize
      this._textElement.render(paper, context)
      this._textElement._paperItem.bringToFront()
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._textElement) this._textElement.destroy()
    super.destroy()
  }
}

module.exports = { Badge }