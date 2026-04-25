/**
 * 引用块组件
 * 支持自动高度
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Quote extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'quote',
    })

    this.width = config.width || 400
    this.text = config.text || ''
    this.author = config.author
    this.backgroundColor = config.backgroundColor || '#2d2d3a'
    this.borderColor = config.borderColor || '#00d9ff'
    this.borderWidth = config.borderWidth || 4
    this.padding = config.padding || 20
    this.radius = config.radius || 8
    this.textColor = config.textColor || '#ffffff'
    this.authorColor = config.authorColor || '#aaaaaa'
    this.fontSize = config.fontSize || 18
    this.fontFamily = config.fontFamily
    this.autoHeight = config.autoHeight === true // 默认开启自适应高度

    // 兼容旧接口：height 用于指定最小高度
    this._minHeight = config.height ? toPixels(config.height, { width: 1920, height: 1080 }, 'height') : 0
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._initialized = true

    // 背景
    this._bgElement = new RectElement({
      x: 0, y: 0, width: 1, height: 1,
      fillColor: this.backgroundColor,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 边框
    this._borderElement = new RectElement({
      x: 0, y: 0, width: this.borderWidth,
      height: 1,
      fillColor: this.borderColor,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._borderElement.initialize(paper)

    // 引号
    this._quoteElement = new TextElement({
      x: 0, y: 0,
      text: '"',
      fontSize: this.fontSize * 2,
      fontFamily: this.fontFamily,
      color: this.borderColor,
      textAlign: 'left',
      anchor: [0, 0],
      opacity: this.opacity,
    })
    this._quoteElement.initialize(paper)

    // 文本
    this._textElement = new TextElement({
      x: 0, y: 0,
      text: this.text,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      color: this.textColor,
      textAlign: 'left',
      anchor: [0, 0],
      opacity: this.opacity,
    })
    this._textElement.initialize(paper)

    // 作者
    if (this.author) {
      this._authorElement = new TextElement({
        x: 0, y: 0,
        text: `— ${this.author}`,
        fontSize: this.fontSize * 0.85,
        fontFamily: this.fontFamily,
        color: this.authorColor,
        textAlign: 'left',
        anchor: [0, 0],
        opacity: this.opacity,
      })
      this._authorElement.initialize(paper)
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const ctx = { width: context.width || 1920, height: context.height || 1080 }

    const absX = toPixels(this.x, ctx, 'x')
    const absY = toPixels(this.y, ctx, 'y')
    const absWidth = toPixels(this.width, ctx, 'width')
    const absPadding = toPixels(this.padding, ctx, 'width')
    const absBorderWidth = toPixels(this.borderWidth, ctx, 'width')
    const absRadius = toPixels(this.radius, ctx, 'width')
    const absFontSize = toFontSizePixels(this.fontSize, ctx)

    // 锚点定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5

    // 内容宽度
    const contentWidth = absWidth - absPadding * 2 - absBorderWidth - 20 // 减去左边距、边框、引号间距

    // 文本换行
    const textLines = this._wrapText(paper, this.text, contentWidth, absFontSize, this.fontFamily)
    const lineHeight = absFontSize * 1.2  // 恢复行高

    // 计算内容高度（简洁版）
    // 文本高度 + 作者高度
    const textHeight = textLines.length * lineHeight
    const authorHeight = this.author ? absFontSize * 0.8 : 0
    const authorGap = this.author ? absFontSize * 0.5 : 0

    const totalContentHeight = absPadding * 2 + textHeight + authorGap + authorHeight

    // 自适应高度：如果设置了 minHeight，使用它；否则完全自适应
    const actualHeight = this._minHeight > 0 ? Math.max(this._minHeight, totalContentHeight) : totalContentHeight

    // 位置
    const posX = absX - absWidth * anchorX
    const posY = absY - actualHeight * anchorY

    // 更新背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = actualHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = posX + absWidth / 2
      this._bgElement.y = posY + actualHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, ctx)
    }

    // 更新边框
    if (this._borderElement && this._borderElement._paperItem) {
      this._borderElement.width = absBorderWidth
      this._borderElement.height = actualHeight
      this._borderElement.x = posX + absBorderWidth / 2
      this._borderElement.y = posY + actualHeight / 2
      this._borderElement.anchor = [0.5, 0.5]
      this._borderElement.render(paper, ctx)
    }

    // 引号位置
    if (this._quoteElement && this._quoteElement._paperItem) {
      this._quoteElement.x = posX + absPadding
      this._quoteElement.y = posY + absPadding + absFontSize * 0.3
      this._quoteElement.fontSize = absFontSize * 2
      this._quoteElement.render(paper, ctx)
      this._quoteElement._paperItem.bringToFront()
    }

    // 文本位置
    if (this._textElement && this._textElement._paperItem) {
      this._textElement.text = textLines.join('\n')
      this._textElement.x = posX + absPadding + absBorderWidth+15
      this._textElement.y = posY + absPadding + absFontSize +(textLines.length>1?15:-5)-5
      this._textElement.fontSize = absFontSize
      this._textElement.render(paper, ctx)
      this._textElement._paperItem.bringToFront()
    }

    // 作者位置
    if (this._authorElement && this._authorElement._paperItem) {
      const textEndY = posY + absPadding + textHeight + absFontSize
      this._authorElement.x = posX + absPadding + absBorderWidth+15
      this._authorElement.y = textEndY + authorGap - (textLines.length>1?10:5)-5
      this._authorElement.render(paper, ctx)
      this._authorElement._paperItem.bringToFront()
    }
  }

  _wrapText(paper, text, maxWidth, fontSize, fontFamily) {
    if (!text || !maxWidth || maxWidth <= 0) return [text || '']

    if (!paper || !paper.project) {
      // 备用：按字符估算
      const charsPerLine = Math.floor(maxWidth / (fontSize * 0.6))
      return this._wrapTextSimple(text, charsPerLine)
    }

    const fontChain = this.fontFamily || 'Microsoft YaHei'
    const tempText = new paper.PointText({
      point: [0, 0],
      fontSize,
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

  _wrapTextSimple(text, maxCharsPerLine) {
    if (!text) return ['']
    if (text.length <= maxCharsPerLine) return [text]

    const lines = []
    let currentLine = ''

    for (let i = 0; i < text.length; i++) {
      if (currentLine.length >= maxCharsPerLine) {
        lines.push(currentLine)
        currentLine = ''
      }
      currentLine += text[i]
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._borderElement) this._borderElement.destroy()
    if (this._quoteElement) this._quoteElement.destroy()
    if (this._textElement) this._textElement.destroy()
    if (this._authorElement) this._authorElement.destroy()
    super.destroy()
  }
}

module.exports = { Quote }