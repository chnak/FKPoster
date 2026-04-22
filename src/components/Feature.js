/**
 * 特性展示组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')

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

    const height = this.height || 120
    const contentWidth = this.width - this.padding * 2
    let currentY = this.padding

    // 背景
    if (this.backgroundColor) {
      this._bgElement = new RectElement({
        x: 0,
        y: 0,
        width: this.width,
        height: height,
        fillColor: this.backgroundColor,
        borderColor: this.borderColor,
        borderWidth: 1,
        borderRadius: this.radius,
        opacity: this.opacity,
      })
      this._bgElement.initialize(paper)
    }

    // 图标
    if (this.icon) {
      const iconEl = new TextElement({
        x: this.padding,
        y: currentY,
        text: this.icon,
        fontSize: this.iconSize,
        fontFamily: this.fontFamily,
        color: this.iconColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      iconEl.initialize(paper)
      this._textElements.push({ el: iconEl, type: 'icon', startY: currentY })
      currentY += this.iconSize + 4
    }

    // 标题 - 智能换行
    if (this.title) {
      const titleEl = new TextElement({
        x: this.padding,
        y: currentY,
        text: this.title,
        fontSize: this.titleSize,
        fontFamily: this.fontFamily,
        color: this.titleColor,
        textAlign: 'left',
        maxWidth: contentWidth,
        opacity: this.opacity,
      })
      titleEl.initialize(paper)
      this._textElements.push({ el: titleEl, type: 'title', startY: currentY })
      currentY += this.titleSize + 4
    }

    // 描述 - 智能换行
    if (this.description) {
      const descEl = new TextElement({
        x: this.padding,
        y: currentY,
        text: this.description,
        fontSize: this.descSize,
        fontFamily: this.fontFamily,
        color: this.descColor,
        textAlign: 'left',
        maxWidth: contentWidth,
        opacity: this.opacity,
      })
      descEl.initialize(paper)
      this._textElements.push({ el: descEl, type: 'desc', startY: currentY })
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    const height = this.height || 120
    const contentWidth = this.width - this.padding * 2

    // 背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement._paperItem.position = new paper.Point(
        absX + this.width / 2,
        absY + height / 2
      )
    }

    // 文本元素 - 动态Y位置
    let currentY = absY + this.padding
    for (const item of this._textElements) {
      const el = item.el
      if (el && el._paperItem) {
        el.x = absX + this.padding
        el.y = currentY
        el.render(paper, context)

        // 计算渲染后的实际高度
        if (item.type === 'icon') {
          currentY += this.iconSize + 4
        } else if (item.type === 'title') {
          const titleHeight = el._measureText().height || this.titleSize
          currentY += titleHeight + 4
        } else if (item.type === 'desc') {
          const descHeight = el._measureText().height || this.descSize
          currentY += descHeight
        }
      }
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