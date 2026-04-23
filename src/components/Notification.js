/**
 * 通知/提示组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

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

    // 背景 - 使用临时尺寸
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this._config.bgColor,
      borderColor: this._config.borderColor,
      borderWidth: 0,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 图标
    this._iconElement = new TextElement({
      x: 0,
      y: 0,
      text: this._config.icon,
      fontSize: 24,
      fontFamily: this.fontFamily,
      color: this._config.iconColor,
      textAlign: 'center',
      opacity: this.opacity,
    })
    this._iconElement.initialize(paper)

    // 标题
    this._titleElement = null
    if (this.title) {
      this._titleElement = new TextElement({
        x: 0,
        y: 0,
        text: this.title,
        fontSize: 16,
        fontFamily: this.fontFamily,
        color: this._config.textColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      this._titleElement.initialize(paper)
    }

    // 消息
    this._msgElement = null
    if (this.message) {
      this._msgElement = new TextElement({
        x: 0,
        y: 0,
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

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')

    const padding = 16
    const lineHeight = 22
    const iconSize = 24
    const gap = 6
    const topPadding = 10
    const bottomPadding = 22

    // 统一用 lineHeight 作为一行的高度
    const contentHeight = lineHeight + (this.title ? gap + lineHeight : 0) + (this.message ? gap + lineHeight : 0)
    // 顶部间距小，底部间距大，让内容偏下
    const actualHeight = topPadding + contentHeight + bottomPadding

    // 背景 - 使用 anchor: [0.5, 0.5] 让系统自动居中
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = actualHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX
      this._bgElement.y = absY
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
    }

    const textX = this.showIcon ? padding + iconSize + 12 : padding

    // 图标 - 垂直居中于第一行
    if (this.showIcon && this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = absX + padding
      this._iconElement.y = absY + topPadding + lineHeight
      this._iconElement.render(paper, context)
    }

    let currentY = absY + topPadding

    // 标题 - 垂直居中于第一行
    if (this._titleElement && this._titleElement._paperItem) {
      this._titleElement.x = absX + textX
      this._titleElement.y = currentY + lineHeight
      this._titleElement.render(paper, context)
      currentY += lineHeight + gap
    }

    // 消息 - 垂直居中于第二行
    if (this._msgElement && this._msgElement._paperItem) {
      this._msgElement.x = absX + textX
      this._msgElement.y = currentY + lineHeight
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