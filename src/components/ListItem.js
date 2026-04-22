/**
 * 列表项组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')

class ListItem extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'listItem',
    })

    this.width = config.width || 400
    this.height = config.height || 60
    this.icon = config.icon || '→'
    this.title = config.title
    this.description = config.description
    this.badge = config.badge
    this.badgeColor = config.badgeColor || '#6366f1'
    this.iconColor = config.iconColor || '#6366f1'
    this.backgroundColor = config.backgroundColor || '#2d2d3a'
    this.borderColor = config.borderColor || '#404050'
    this.radius = config.radius || 8
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper

    // 背景
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fillColor: this.backgroundColor,
      borderColor: this.borderColor,
      borderWidth: 1,
      borderRadius: this.radius,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 图标
    this._iconElement = new TextElement({
      x: 15,
      y: this.height / 2 + 6,
      text: this.icon,
      fontSize: 20,
      fontFamily: this.fontFamily,
      color: this.iconColor,
      textAlign: 'center',
      opacity: this.opacity,
    })
    this._iconElement.initialize(paper)

    // 标题
    this._titleElement = new TextElement({
      x: 50,
      y: this.height / 2 - 5,
      text: this.title || 'List Item',
      fontSize: 16,
      fontFamily: this.fontFamily,
      color: '#ffffff',
      textAlign: 'left',
      opacity: this.opacity,
    })
    this._titleElement.initialize(paper)

    // 描述
    if (this.description) {
      this._descElement = new TextElement({
        x: 50,
        y: this.height / 2 + 15,
        text: this.description,
        fontSize: 12,
        fontFamily: this.fontFamily,
        color: '#888888',
        textAlign: 'left',
        opacity: this.opacity,
      })
      this._descElement.initialize(paper)
    }

    // 徽章
    if (this.badge) {
      const badgeWidth = this.badge.length * 10 + 20
      this._badgeBgElement = new RectElement({
        x: this.width - badgeWidth - 15,
        y: (this.height - 24) / 2,
        width: badgeWidth,
        height: 24,
        fillColor: this.badgeColor,
        borderRadius: 12,
        opacity: this.opacity,
      })
      this._badgeBgElement.initialize(paper)

      this._badgeElement = new TextElement({
        x: this.width - badgeWidth / 2 - 15,
        y: this.height / 2 + 4,
        text: this.badge,
        fontSize: 12,
        fontFamily: this.fontFamily,
        color: '#ffffff',
        textAlign: 'center',
        opacity: this.opacity,
      })
      this._badgeElement.initialize(paper)
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement._paperItem.position = new paper.Point(
        absX + this.width / 2,
        absY + this.height / 2
      )
    }

    // 图标
    if (this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = absX + 15
      this._iconElement.y = absY + this.height / 2 + 6
      this._iconElement.render(paper, context)
    }

    // 标题
    if (this._titleElement && this._titleElement._paperItem) {
      this._titleElement.x = absX + 50
      this._titleElement.y = absY + this.height / 2 - 5
      this._titleElement.render(paper, context)
    }

    // 描述
    if (this._descElement && this._descElement._paperItem) {
      this._descElement.x = absX + 50
      this._descElement.y = absY + this.height / 2 + 15
      this._descElement.render(paper, context)
    }

    // 徽章
    if (this._badgeBgElement && this._badgeBgElement._paperItem) {
      const badgeWidth = this.badge.length * 10 + 20
      this._badgeBgElement.x = absX + this.width - badgeWidth - 15
      this._badgeBgElement.y = absY + (this.height - 24) / 2
      this._badgeBgElement._paperItem.position = new paper.Point(
        absX + this.width - badgeWidth / 2 - 15,
        absY + this.height / 2
      )
    }

    if (this._badgeElement && this._badgeElement._paperItem) {
      const badgeWidth = this.badge.length * 10 + 20
      this._badgeElement.x = absX + this.width - badgeWidth / 2 - 15
      this._badgeElement.y = absY + this.height / 2 + 4
      this._badgeElement.render(paper, context)
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._iconElement) this._iconElement.destroy()
    if (this._titleElement) this._titleElement.destroy()
    if (this._descElement) this._descElement.destroy()
    if (this._badgeBgElement) this._badgeBgElement.destroy()
    if (this._badgeElement) this._badgeElement.destroy()
    super.destroy()
  }
}

module.exports = { ListItem }