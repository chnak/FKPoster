/**
 * 通知/提示组件 - 简化版自动换行
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels } = require('../utils/unit-converter')

class Notification extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'notification',
    })

    this.width = config.width || 360
    this.notifType = config.type || 'info'
    this.title = config.title
    this.text = config.text || config.message || ''
    this.showIcon = config.showIcon !== false
    this.radius = config.radius || 12
    this.fontFamily = config.fontFamily
    this.autoWrap = config.autoWrap !== false

    const typeConfig = {
      success: { icon: '✓', bgColor: '#22c55e', iconColor: '#ffffff', textColor: '#ffffff', msgColor: '#d1fae5' },
      warning: { icon: '⚠', bgColor: '#f59e0b', iconColor: '#ffffff', textColor: '#ffffff', msgColor: '#fef3c7' },
      error: { icon: '✕', bgColor: '#ef4444', iconColor: '#ffffff', textColor: '#ffffff', msgColor: '#fee2e2' },
      info: { icon: '℠', bgColor: '#3b82f6', iconColor: '#ffffff', textColor: '#ffffff', msgColor: '#dbeafe' },
    }

    this._config = typeConfig[this.notifType] || typeConfig.info
    this._msgLineElements = []
    this._paperInitialized = false
  }

  initialize(paper) {
    this._paper = paper
    this._paperInitialized = true

    this._bgElement = new RectElement({
      x: 0, y: 0, width: 1, height: 1,
      fillColor: this._config.bgColor,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    this._iconElement = new TextElement({
      x: 0, y: 0,
      text: this._config.icon,
      fontSize: 24,
      fontFamily: this.fontFamily,
      color: this._config.iconColor,
      textAlign: 'center',
      anchor: [0.5, 0.5],
      opacity: this.opacity,
    })
    this._iconElement.initialize(paper)

    if (this.title) {
      this._titleElement = new TextElement({
        x: 0, y: 0,
        text: this.title,
        fontSize: 16,
        fontFamily: this.fontFamily,
        color: this._config.textColor,
        textAlign: 'left',
        anchor: [0, 0],
        opacity: this.opacity,
      })
      this._titleElement.initialize(paper)
    }

    this._createMessageLineElements(paper)
  }

  _createMessageLineElements(paper) {
    // 根据估算创建初始行元素
    const estimatedLines = this._estimateLineCount(this.text)
    for (let i = 0; i < estimatedLines; i++) {
      const lineEl = new TextElement({
        x: 0, y: 0,
        text: '',
        fontSize: 14,
        fontFamily: this.fontFamily,
        color: this._config.msgColor,
        textAlign: 'left',
        anchor: [0, 0],
        opacity: this.opacity,
      })
      lineEl.initialize(paper)
      this._msgLineElements.push(lineEl)
    }
  }

  _estimateLineCount(text) {
    // 简单估算：每行约20个中文字符
    if (!text) return 1
    return Math.max(1, Math.ceil(text.length / 20))
  }

  /**
   * 简单的自动换行 - 按字符数分割
   */
  _wrapTextSimple(text, maxCharsPerLine) {
    if (!text || !this.autoWrap) return [text]
    if (text.length <= maxCharsPerLine) return [text]

    const lines = []
    let currentLine = ''

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      if (currentLine.length >= maxCharsPerLine) {
        lines.push(currentLine)
        currentLine = ''
      }
      currentLine += char
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  /**
   * 使用 Paper.js 测量实际文字宽度来实现准确的自动换行
   */
  _wrapTextAccurate(text, maxWidth, fontSize, fontFamily) {
    if (!text || !maxWidth || maxWidth <= 0) return [text]
    if (!this._paper || !this._paper.project) {
      // Fallback: estimate by chars
      const charsPerLine = Math.floor(maxWidth / (fontSize * 0.6))
      return this._wrapTextSimple(text, charsPerLine)
    }

    const fontChain = fontFamily || 'Microsoft YaHei'
    const tempText = new this._paper.PointText({
      point: [0, 0],
      fontSize: fontSize,
      fontFamily: fontChain,
    })

    const lines = []
    let currentLine = ''

    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      const testLine = currentLine + char
      tempText.content = testLine

      if (tempText.bounds.width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine)
        currentLine = char
      } else {
        currentLine = testLine
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    tempText.remove()
    return lines.length > 0 ? lines : [text]
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    const absWidth = toPixels(this.width, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')

    const paddingH = 20
    const paddingV = 12
    const iconSize = 28
    const iconTextGap = 12
    const lineGap = 4

    const iconFontSize = 24
    const titleFontSize = 16
    const msgFontSize = 14

    const contentWidth = this.showIcon
      ? absWidth - paddingH - iconSize - iconTextGap - paddingH
      : absWidth - paddingH - paddingH

    const hasTitle = !!this.title
    const hasText = !!this.text

    const titleLineHeight = titleFontSize + 4

    // 使用精确换行（基于实际测量）
    const textLines = hasText ? this._wrapTextAccurate(this.text, contentWidth, msgFontSize, this.fontFamily) : []
    const msgLineHeight = msgFontSize + 4

    // 计算内容总高度
    let contentHeight = 0
    if (hasTitle && textLines.length > 0) {
      contentHeight = titleLineHeight + lineGap + (textLines.length * msgLineHeight) + (textLines.length - 1) * lineGap
    } else if (hasTitle) {
      contentHeight = titleLineHeight
    } else if (textLines.length > 0) {
      contentHeight = textLines.length * msgLineHeight + (textLines.length - 1) * lineGap
    }

    const iconLineHeight = iconFontSize + 4
    const actualContentHeight = Math.max(iconLineHeight, contentHeight)
    const actualHeight = paddingV * 2 + actualContentHeight

    // 位置计算
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absWidth * anchorX
    const posY = absY - actualHeight * anchorY

    // 背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = actualHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX
      this._bgElement.y = absY
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
      this._bgElement._paperItem.bringToFront()
    }

    const contentCenterY = posY + actualHeight / 2

    // 图标
    if (this.showIcon && this._iconElement && this._iconElement._paperItem) {
      this._iconElement.x = posX + paddingH + iconSize / 2
      this._iconElement.y = contentCenterY
      this._iconElement.fontSize = iconFontSize
      this._iconElement.render(paper, context)
      this._iconElement._paperItem.bringToFront()
    }

    const textStartX = this.showIcon
      ? posX + paddingH + iconSize + iconTextGap
      : posX + paddingH

    // 内容区域居中计算
    // 标题区域高度
    const titleBlockHeight = hasTitle ? titleLineHeight : 0
    // 文本区域高度（多行）
    const textBlockHeight = textLines.length > 0
      ? textLines.length * msgLineHeight + (textLines.length - 1) * lineGap
      : 0

    // 总内容高度
    const totalContentHeight = titleBlockHeight + (titleBlockHeight && textBlockHeight ? lineGap : 0) + textBlockHeight

    // 内容起点Y（垂直居中）
    const contentStartY = posY + (actualHeight - totalContentHeight) / 2

    // 标题
    if (this._titleElement && this._titleElement._paperItem && hasTitle) {
      this._titleElement.x = textStartX
      this._titleElement.y = contentStartY + titleLineHeight / 2
      this._titleElement.fontSize = titleFontSize
      this._titleElement.render(paper, context)
      this._titleElement._paperItem.bringToFront()
    }

    // 多行文本
    if (textLines.length > 0) {
      const textBlockStartY = contentStartY + titleBlockHeight + (titleBlockHeight && textBlockHeight ? lineGap : 0)
      const textFirstLineY = textBlockStartY + msgLineHeight / 2

      for (let i = 0; i < textLines.length; i++) {
        // 确保有足够的行元素
        while (i >= this._msgLineElements.length) {
          const lineEl = new TextElement({
            x: 0, y: 0,
            text: '',
            fontSize: msgFontSize,
            fontFamily: this.fontFamily,
            color: this._config.msgColor,
            textAlign: 'left',
            anchor: [0, 0],
            opacity: this.opacity,
          })
          lineEl.initialize(paper)
          this._msgLineElements.push(lineEl)
        }

        const lineY = textFirstLineY + i * (msgLineHeight + lineGap)
        const lineEl = this._msgLineElements[i]
        if (lineEl && lineEl._paperItem) {
          lineEl.text = textLines[i]  // 设置 text 属性，render 会用到
          lineEl.x = textStartX
          lineEl.y = lineY
          lineEl.fontSize = msgFontSize
          lineEl.render(paper, context)
          lineEl._paperItem.bringToFront()
        }
      }

      // 隐藏多余行
      for (let i = textLines.length; i < this._msgLineElements.length; i++) {
        if (this._msgLineElements[i] && this._msgLineElements[i]._paperItem) {
          this._msgLineElements[i]._paperItem.visible = false
        }
      }
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._iconElement) this._iconElement.destroy()
    if (this._titleElement) this._titleElement.destroy()
    for (const line of this._msgLineElements) {
      line.destroy()
    }
    super.destroy()
  }
}

module.exports = { Notification }