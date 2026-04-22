/**
 * 按钮组件
 * 支持渐变、阴影、图标
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { ImageElement } = require('../elements/ImageElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Button extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'button',
      width: config.width || 'auto',
      height: config.height || 60,
    })

    this.text = config.text || '按钮'
    this.fontSize = config.fontSize || 24
    this.fontFamily = config.fontFamily
    this.color = config.color || '#ffffff'
    this.backgroundColor = config.backgroundColor || '#3b82f6'
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 0
    this.radius = config.radius || 8
    this.shadow = config.shadow
    this.gradient = config.gradient
    this.icon = config.icon
    this.iconPosition = config.iconPosition || 'left'
    this.padding = config.padding || 30
    this.textAlign = 'center'
  }

  initialize(paper) {
    // 创建占位的背景
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this.backgroundColor,
      borderColor: this.borderColor,
      borderWidth: 0,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 创建文字元素（临时值）
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

    // 创建图标元素（如果是URL图片）
    if (this.icon && (this.icon.startsWith('http') || this.icon.startsWith('data:'))) {
      this._iconElement = new ImageElement({
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        src: this.icon,
        anchor: [0.5, 0.5],
        opacity: this.opacity,
      })
      this._iconElement.initialize(paper)
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 计算绝对位置
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absPadding = toPixels(this.padding, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')

    // 计算文字宽度
    const textStr = String(this.text || '')
    const chineseChars = (textStr.match(/[\u4e00-\u9fa5]/g) || []).length
    const otherChars = textStr.length - chineseChars
    const textWidth = chineseChars * absFontSize * 1.0 + otherChars * absFontSize * 0.5

    // 图标宽度
    const iconWidth = this.icon ? Math.min(absHeight * 0.5, absFontSize) + 8 : 0

    // 计算最终宽度
    const finalWidth = typeof this.width === 'number'
      ? toPixels(this.width, context2d, 'width')
      : (textWidth + absPadding * 2 + iconWidth)
    const finalHeight = absHeight

    // 更新背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = finalWidth
      this._bgElement.height = finalHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.borderWidth = absBorderWidth
      // Use center positioning with anchor [0.5, 0.5]
      this._bgElement.x = absX + finalWidth / 2
      this._bgElement.y = absY + finalHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
    }

    // 更新文字位置
    if (this._textElement && this._textElement._paperItem) {
      this._textElement.x = absX + finalWidth / 2
      this._textElement.y = absY + finalHeight / 2
      this._textElement.fontSize = absFontSize
      this._textElement.render(paper, context)
      // 确保文字在最上层
      this._textElement._paperItem.bringToFront()
    }

    // 更新图标位置
    if (this._iconElement && this._iconElement._paperItem) {
      const iconSize = Math.min(finalHeight * 0.5, absFontSize)
      const iconX = this.iconPosition === 'left'
        ? absX + absPadding + iconSize / 2
        : absX + finalWidth - absPadding - iconSize / 2

      this._iconElement.x = iconX
      this._iconElement.y = absY + finalHeight / 2
      this._iconElement.width = iconSize
      this._iconElement.height = iconSize
      this._iconElement.render(paper, context)
      // 确保图标在最上层
      this._iconElement._paperItem.bringToFront()
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._textElement) this._textElement.destroy()
    if (this._iconElement) this._iconElement.destroy()
    super.destroy()
  }
}

module.exports = { Button }