/**
 * 特性展示组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Feature extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'feature',
    })

    this.width = config.width || 200
    this.icon = config.icon
    this.title = config.title
    this.description = config.description
    this.iconColor = config.iconColor || '#00d9ff'
    this.titleColor = config.titleColor || '#ffffff'
    this.descColor = config.descColor || '#aaaaaa'
    this.iconSize = config.iconSize || 28
    this.titleSize = config.titleSize || 16
    this.descSize = config.descSize || 12
    this.backgroundColor = config.backgroundColor || '#2d2d3a'
    this.borderColor = config.borderColor
    this.radius = config.radius || 8
    this.padding = config.padding || 15
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper
    this._textElements = []
    this._bgElement = null

    // 背景 - 使用临时尺寸
    if (this.backgroundColor) {
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
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absPadding = toPixels(this.padding, context2d, 'width')
    const absIconSize = toFontSizePixels(this.iconSize, context2d)
    const absTitleSize = toFontSizePixels(this.titleSize, context2d)
    const absDescSize = toFontSizePixels(this.descSize, context2d)
    const absRadius = toPixels(this.radius, context2d, 'width')

    // 背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = absHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX + absWidth / 2
      this._bgElement.y = absY + absHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
    }

    // 销毁旧的文本元素
    for (const item of this._textElements) {
      if (item.el) item.el.destroy()
    }
    this._textElements = []

    const contentWidth = absWidth - absPadding * 2
    let currentY = absY + absPadding

    // 图标
    if (this.icon) {
      const iconEl = new TextElement({
        x: absX + absPadding,
        y: currentY,
        text: this.icon,
        fontSize: absIconSize,
        fontFamily: this.fontFamily,
        color: this.iconColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      iconEl.initialize(paper)
      iconEl.render(paper, context)
      this._textElements.push({ el: iconEl, type: 'icon' })
      currentY += absIconSize + 4
    }

    // 标题 - 智能换行
    if (this.title) {
      const titleEl = new TextElement({
        x: absX + absPadding,
        y: currentY,
        text: this.title,
        fontSize: absTitleSize,
        fontFamily: this.fontFamily,
        color: this.titleColor,
        textAlign: 'left',
        maxWidth: contentWidth,
        opacity: this.opacity,
      })
      titleEl.initialize(paper)
      titleEl.render(paper, context)
      this._textElements.push({ el: titleEl, type: 'title' })
      currentY += absTitleSize + 4
    }

    // 描述 - 智能换行
    if (this.description) {
      const descEl = new TextElement({
        x: absX + absPadding,
        y: currentY,
        text: this.description,
        fontSize: absDescSize,
        fontFamily: this.fontFamily,
        color: this.descColor,
        textAlign: 'left',
        maxWidth: contentWidth,
        opacity: this.opacity,
      })
      descEl.initialize(paper)
      descEl.render(paper, context)
      this._textElements.push({ el: descEl, type: 'desc' })
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    for (const item of this._textElements) {
      if (item.el) item.el.destroy()
    }
    this._textElements = []
    super.destroy()
  }
}

module.exports = { Feature }