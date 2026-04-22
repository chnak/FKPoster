/**
 * 引用块组件
 * 支持自动换行
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { getFontFallbackChain } = require('../fonts')
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
  }

  _wrapText(paper, text, maxWidth) {
    if (!maxWidth || maxWidth <= 0) return [text]

    const fontChain = getFontFallbackChain(this.fontFamily, text)
    const tempText = new paper.PointText({
      fontSize: this.fontSize,
      fontFamily: fontChain,
    })

    const lines = []
    const paragraphs = text.split('\n')

    for (const paragraph of paragraphs) {
      let currentLine = ''
      let i = 0

      while (i < paragraph.length) {
        const char = paragraph[i]
        const testLine = currentLine + char
        tempText.content = testLine

        if (tempText.bounds.width > maxWidth && currentLine.length > 0) {
          lines.push(currentLine)
          currentLine = char
        } else {
          currentLine = testLine
        }
        i++
      }

      if (currentLine.length > 0) {
        lines.push(currentLine)
      }
    }

    tempText.remove()
    return lines
  }

  initialize(paper) {
    this._paper = paper

    // 背景 - 使用临时尺寸
    this._bgElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this.backgroundColor,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 左边框 - 使用临时尺寸
    this._borderElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this.borderColor,
      opacity: this.opacity,
    })
    this._borderElement.initialize(paper)

    // 引号
    this._quoteMarkElement = new TextElement({
      x: 0,
      y: 0,
      text: '"',
      fontSize: 36,
      fontFamily: this.fontFamily,
      color: this.borderColor,
      textAlign: 'left',
      opacity: this.opacity,
    })
    this._quoteMarkElement.initialize(paper)

    // 引用文字元素
    this._textElements = []

    // 作者
    this._authorElement = null
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absPadding = toPixels(this.padding, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)

    // 文字换行计算
    const textPadding = absPadding + 30
    const maxTextWidth = absWidth - textPadding - absPadding
    const textLines = this._wrapText(paper, this.text, maxTextWidth)

    const lineHeight = absFontSize * 1.5
    const textBlockHeight = textLines.length * lineHeight
    const authorHeight = this.author ? absFontSize * 1.5 : 0
    const totalHeight = absPadding * 2 + textBlockHeight + authorHeight
    const totalHeightVal = Math.max(totalHeight, 80)

    // 销毁旧的文本元素
    for (const el of this._textElements) {
      if (el) el.destroy()
    }
    this._textElements = []

    // 先渲染背景和边框（放在下面）
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = totalHeightVal
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX + absWidth / 2
      this._bgElement.y = absY + totalHeightVal / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, context)
    }

    if (this._borderElement && this._borderElement._paperItem) {
      this._borderElement.width = absBorderWidth
      this._borderElement.height = totalHeightVal
      this._borderElement.x = absX + absBorderWidth / 2
      this._borderElement.y = absY + totalHeightVal / 2
      this._borderElement.anchor = [0.5, 0.5]
      this._borderElement.render(paper, context)
    }

    // 引用文字（放在上面）
    const textStartY = absPadding + absFontSize

    for (let i = 0; i < textLines.length; i++) {
      const textEl = new TextElement({
        x: absX + absPadding + 30,
        y: absY + textStartY + i * lineHeight,
        text: textLines[i],
        fontSize: absFontSize,
        fontFamily: this.fontFamily,
        color: this.textColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      textEl.initialize(paper)
      textEl.render(paper, context)
      this._textElements.push(textEl)
    }

    // 销毁旧作者元素
    if (this._authorElement) {
      this._authorElement.destroy()
      this._authorElement = null
    }

    // 作者
    if (this.author) {
      const authorY = absY + absPadding + textBlockHeight + absFontSize * 1.3
      this._authorElement = new TextElement({
        x: absX + absPadding,
        y: authorY,
        text: `— ${this.author}`,
        fontSize: absFontSize * 0.85,
        fontFamily: this.fontFamily,
        color: this.authorColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      this._authorElement.initialize(paper)
      this._authorElement.render(paper, context)
    }

    // 更新引号
    if (this._quoteMarkElement && this._quoteMarkElement._paperItem) {
      this._quoteMarkElement.x = absX + absPadding + 10
      this._quoteMarkElement.y = absY + absPadding + absFontSize
      this._quoteMarkElement.fontSize = absFontSize * 2
      this._quoteMarkElement.render(paper, context)
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._borderElement) this._borderElement.destroy()
    if (this._quoteMarkElement) this._quoteMarkElement.destroy()
    for (const el of this._textElements) {
      if (el) el.destroy()
    }
    if (this._authorElement) this._authorElement.destroy()
    super.destroy()
  }
}

module.exports = { Quote }