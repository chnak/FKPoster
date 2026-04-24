/**
 * Chip 标签组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Chip extends Component {
  constructor(config = {}) {
    // 禁用基类的背景创建，Chip 自己管理背景
    super({
      ...config,
      type: 'chip',
      width: 'auto',
      height: 'auto',
      backgroundColor: null,  // 禁用基类背景
    })

    this.text = config.text || ''
    // 背景色由 Chip 自己管理，不通过 Component 基类
    this._chipBgColor = config.backgroundColor !== undefined ? config.backgroundColor : '#e0e0e0'
    this.color = config.color || '#333333'
    this.borderColor = config.borderColor
    this.fontSize = config.fontSize || 12
    this.padding = config.padding || 12
    this.radius = config.radius || 16
    this.icon = config.icon
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    // 背景 - 由 Chip 自己创建在 render 时
    // 先创建一个空的占位符，render 时会正确创建
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: null,  // 临时设为 null
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
    if (!this._initialized) this.initialize(paper)

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

    // 背景 - 使用 anchor: [0.5, 0.5] 让系统自动居中
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = chipWidth
      this._bgElement.height = chipHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX
      this._bgElement.y = absY
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.fillColor = this._chipBgColor
      this._bgElement.render(paper, context)
    }

    // 图标 - 直接使用 absX, absY 作为中心点
    if (this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = absX
      this._iconElement.y = absY
      this._iconElement.fontSize = absFontSize + 2
      this._iconElement.anchor = [0.5, 0.5]
      this._iconElement.render(paper, context)
    }

    // 文字 - 直接使用 absX, absY 作为中心点
    if (this._textElement && this._textElement._paperItem) {
      this._textElement.x = absX
      this._textElement.y = absY
      this._textElement.fontSize = absFontSize
      this._textElement.text = this.text  // 更新文字内容
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