/**
 * 通知/提示组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')

class Notification extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'notification',
    })

    this.width = config.width || 360
    this.notifType = config.type || 'info'
    this.title = config.title
    this.message = config.message
    this.showIcon = config.showIcon !== false
    this.radius = config.radius || 12
    this.fontFamily = config.fontFamily

    // 类型配置
    const typeConfig = {
      success: { icon: '✓', bgColor: '#22c55e', iconColor: '#ffffff', borderColor: '#22c55e', textColor: '#ffffff', msgColor: '#d1fae5' },
      warning: { icon: '⚠', bgColor: '#f59e0b', iconColor: '#ffffff', borderColor: '#f59e0b', textColor: '#ffffff', msgColor: '#fef3c7' },
      error: { icon: '✕', bgColor: '#ef4444', iconColor: '#ffffff', borderColor: '#ef4444', textColor: '#ffffff', msgColor: '#fee2e2' },
      info: { icon: '℠', bgColor: '#3b82f6', iconColor: '#ffffff', borderColor: '#3b82f6', textColor: '#ffffff', msgColor: '#dbeafe' },
    }

    this._config = typeConfig[this.notifType] || typeConfig.info
  }

  initialize(paper) {
    this._paper = paper

    const padding = 16
    const lineHeight = 22
    const iconSize = 24
    const height = padding * 2 + (this.title ? lineHeight + 8 : 0) + (this.message ? lineHeight : 0)
    this._actualHeight = height

    // 背景
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: this.width,
      height: height,
      fillColor: this._config.bgColor,
      borderColor: this._config.borderColor,
      borderWidth: 1,
      borderRadius: this.radius,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 图标
    if (this.showIcon) {
      this._iconElement = new TextElement({
        x: padding + iconSize / 2,
        y: padding + iconSize / 2 + 6,
        text: this._config.icon,
        fontSize: iconSize,
        fontFamily: this.fontFamily,
        color: this._config.iconColor,
        textAlign: 'center',
        opacity: this.opacity,
      })
      this._iconElement.initialize(paper)
    }

    const textX = this.showIcon ? padding + iconSize + 12 : padding
    let currentY = padding

    // 标题
    if (this.title) {
      this._titleElement = new TextElement({
        x: textX,
        y: currentY + 18,
        text: this.title,
        fontSize: 16,
        fontFamily: this.fontFamily,
        color: this._config.textColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      this._titleElement.initialize(paper)
      currentY += lineHeight + 8
    }

    // 消息
    if (this.message) {
      this._msgElement = new TextElement({
        x: textX,
        y: currentY + 16,
        text: this.message,
        fontSize: 14,
        fontFamily: this.fontFamily,
        color: this._config.msgColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      this._msgElement.initialize(paper)
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
        absY + this._actualHeight / 2
      )
    }

    const padding = 16
    const lineHeight = 22
    const iconSize = 24
    const textX = this.showIcon ? padding + iconSize + 12 : padding

    // 图标
    if (this.showIcon && this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = absX + padding + iconSize / 2
      this._iconElement.y = absY + padding + iconSize / 2 + 6
      this._iconElement.render(paper, context)
    }

    let currentY = absY + padding

    // 标题
    if (this._titleElement && this._titleElement._paperItem) {
      this._titleElement.x = absX + textX
      this._titleElement.y = currentY + 18
      this._titleElement.render(paper, context)
      currentY += lineHeight + 8
    }

    // 消息
    if (this._msgElement && this._msgElement._paperItem) {
      this._msgElement.x = absX + textX
      this._msgElement.y = currentY + 16
      this._msgElement.render(paper, context)
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._iconElement) this._iconElement.destroy()
    if (this._titleElement) this._titleElement.destroy()
    if (this._msgElement) this._msgElement.destroy()
    super.destroy()
  }
}

module.exports = { Notification }