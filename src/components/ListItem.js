/**
 * 列表项组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

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
    this.description = config.description || config.subtitle
    this.badge = config.badge
    this.badgeColor = config.badgeColor || '#6366f1'
    this.iconColor = config.iconColor || '#6366f1'
    this.backgroundColor = config.backgroundColor || '#2d2d3a'
    this.borderColor = config.borderColor || '#404050'
    this.radius = config.radius || 8
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._initialized = true

    // 背景
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

    // 图标
    this._iconElement = new TextElement({
      x: 0,
      y: 0,
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
      x: 0,
      y: 0,
      text: this.title || 'List Item',
      fontSize: 16,
      fontFamily: this.fontFamily,
      color: '#ffffff',
      textAlign: 'left',
      opacity: this.opacity,
    })
    this._titleElement.initialize(paper)

    // 描述
    this._descElement = null
    if (this.description) {
      this._descElement = new TextElement({
        x: 0,
        y: 0,
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
    this._badgeBgElement = null
    this._badgeElement = null
    this._badgeWidth = 0
    if (this.badge) {
      const badgeWidth = this.badge.length * 10 + 20
      this._badgeWidth = badgeWidth
      this._badgeBgElement = new RectElement({
        x: 0,
        y: 0,
        width: badgeWidth,
        height: 24,
        fillColor: this.badgeColor,
        borderRadius: 12,
        opacity: this.opacity,
      })
      this._badgeBgElement.initialize(paper)

      this._badgeElement = new TextElement({
        x: 0,
        y: 0,
        text: this.badge,
        fontSize: 12,
        fontFamily: this.fontFamily,
        color: '#ffffff',
        textAlign: 'center',
        anchor: [0.5, 0.5],
        opacity: this.opacity,
      })
      this._badgeElement.initialize(paper)
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
    const absRadius = toPixels(this.radius, context2d, 'width')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absWidth * anchorX
    const posY = absY - absHeight * anchorY

    // 背景 - 使用左上角定位
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = absHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = posX
      this._bgElement.y = posY
      this._bgElement.anchor = [0, 0]  // 避免 RectElement 再次偏移
      this._bgElement.render(paper, context)
    }

    // 图标
    if (this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = posX + 15
      this._iconElement.y = posY + absHeight / 2
      this._iconElement.anchor = [0.5, 0.5]
      this._iconElement.render(paper, context)
      this._iconElement._paperItem.bringToFront()
    }

    // 标题 - 垂直居中
    if (this._titleElement && this._titleElement._paperItem) {
      this._titleElement.x = posX + 50
      this._titleElement.y = posY + (absHeight - 16) / 2  // 垂直居中 (字体16)
      this._titleElement.anchor = [0, 0]
      this._titleElement.render(paper, context)
      this._titleElement._paperItem.bringToFront()
    }

    // 描述 - 在标题下方
    if (this._descElement && this._descElement._paperItem) {
      this._descElement.x = posX + 50
      this._descElement.y = posY + (absHeight + 16) / 2 + 4  // 标题下方4px
      this._descElement.anchor = [0, 0]
      this._descElement.render(paper, context)
      this._descElement._paperItem.bringToFront()
    }

    // 徽章 - 右对齐，使用左上角定位
    if (this._badgeBgElement && this._badgeBgElement._paperItem) {
      const badgeX = posX + absWidth - this._badgeWidth - 15
      const badgeY = posY + (absHeight - 24) / 2
      this._badgeBgElement.x = badgeX
      this._badgeBgElement.y = badgeY
      this._badgeBgElement.anchor = [0, 0]  // 避免 RectElement 再次偏移
      this._badgeBgElement.render(paper, context)
      this._badgeBgElement._paperItem.bringToFront()
    }

    if (this._badgeElement && this._badgeElement._paperItem) {
      const badgeX = posX + absWidth - this._badgeWidth - 15
      const badgeY = posY + (absHeight - 24) / 2
      this._badgeElement.x = badgeX + this._badgeWidth / 2  // 居中
      this._badgeElement.y = badgeY + 12  // 垂直居中 (24/2 + 基线偏移)
      this._badgeElement.render(paper, context)
      this._badgeElement._paperItem.bringToFront()
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