/**
 * 头像组件
 */
const { Component } = require('../core/Component')
const { CircleElement } = require('../elements/CircleElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels } = require('../utils/unit-converter')

class Avatar extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'avatar',
      width: config.size || 80,
      height: config.size || 80,
    })

    this.size = config.size || 80
    this.src = config.src
    this.initials = config.initials
    this.backgroundColor = config.backgroundColor || '#6366f1'
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 0
    this.color = config.color || '#ffffff'
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    // 圆形背景 - size 会在 render 时转换
    this._bgElement = new CircleElement({
      x: 0,
      y: 0,
      radius: 0, // 临时值，会在 render 时设置
      fillColor: this.backgroundColor,
      strokeColor: this.borderColor,
      strokeWidth: this.borderWidth,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 首字母 - 垂直居中
    if (!this.src && this.initials) {
      this._textElement = new TextElement({
        x: 0,
        y: 0, // 临时值，会在 render 时设置
        text: this.initials.charAt(0).toUpperCase(),
        fontSize: 0, // 临时值，会在 render 时设置
        fontFamily: this.fontFamily,
        color: this.color,
        textAlign: 'center',
        anchor: [0.5, 0.5],
        opacity: this.opacity,
      })
      this._textElement.initialize(paper)
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')
    const absSize = toPixels(this.size, context2d, 'width')

    // 圆形背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.x = absX
      this._bgElement.y = absY
      this._bgElement.radius = absSize / 2
      this._bgElement.render(paper, context)
    }

    // 首字母 - 与圆形中心对齐
    if (this._textElement && this._textElement._paperItem) {
      const fontSize = absSize * 0.4
      this._textElement.x = absX
      this._textElement.y = absY + fontSize / 3
      this._textElement.fontSize = fontSize
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

module.exports = { Avatar }