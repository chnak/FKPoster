/**
 * 引用块组件
 */
const { Component } = require('../core/Component')
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
    this._items = []
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    const absWidth = toPixels(this.width, context2d, 'width')
    const absPadding = toPixels(this.padding, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)

    // 文字换行计算
    // 引号在 x=absPadding+2，文字在 x=absPadding+20（间距18px）
    const textStartX = absPadding + 20
    // 确保文字在背景框内，留出右侧安全边距
    const maxTextWidth = absWidth - textStartX - absPadding - 10

    const textLines = this._wrapText(paper, this.text, maxTextWidth)

    const lineHeight = absFontSize * 1.5
    const quoteMarkFontSize = absFontSize * 2
    const authorFontSize = absFontSize * 0.85

    // 计算内容高度 - 用 Paper.js 实际测量文本 bounds
    // 测量单行文字的实际 ascent + descent
    const tempText = new paper.PointText({
      point: [absX, absY],
      fontSize: absFontSize,
      fontFamily: getFontFallbackChain(this.fontFamily, textLines[0] || ''),
    })
    const firstLineActualHeight = tempText.bounds.height

    // 多行总高度 = 第一行 ascent + (n-1)*lineHeight + 最后一行 descent
    // Paper.js bounds.height 已经包含 ascent + descent
    const textBlockActualHeight = firstLineActualHeight + (textLines.length - 1) * lineHeight

    // 作者高度
    const authorActualHeight = this.author ? authorFontSize * 1.1 : 0
    // 作者间距
    const authorGap = this.author ? lineHeight * 1.28 : 0

    const totalContentHeight = absPadding + textBlockActualHeight + authorGap + authorActualHeight + absPadding
    tempText.remove()

    // 销毁旧元素
    for (const item of this._items) {
      item.remove()
    }
    this._items = []

    // 背景
    const bgRect = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [absWidth, totalContentHeight],
      radius: absRadius,
      fillColor: this.backgroundColor,
    })
    paper.project.activeLayer.addChild(bgRect)
    this._items.push(bgRect)

    // 左边框
    const borderRect = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [absBorderWidth, totalContentHeight],
      fillColor: this.borderColor,
    })
    paper.project.activeLayer.addChild(borderRect)
    this._items.push(borderRect)

    // 引用文字 baseline 偏移量
    const textBaselineOffset = 16

    // 引号 - 稍低于文字 baseline
    const quoteMarkY = absY + absPadding + textBaselineOffset + 6
    const quoteMarkText = new paper.PointText({
      point: [absX + absPadding + 2, quoteMarkY],
      content: '"',
      fontSize: quoteMarkFontSize,
      fontFamily: getFontFallbackChain(this.fontFamily, '"'),
      fillColor: this.borderColor,
    })
    paper.project.activeLayer.addChild(quoteMarkText)
    this._items.push(quoteMarkText)

    // 引用文字 - baseline at padding + textBaselineOffset
    for (let i = 0; i < textLines.length; i++) {
      const lineY = absY + absPadding + textBaselineOffset + i * lineHeight
      const lineText = new paper.PointText({
        point: [absX + textStartX, lineY],
        content: textLines[i],
        fontSize: absFontSize,
        fontFamily: getFontFallbackChain(this.fontFamily, textLines[i]),
        fillColor: this.textColor,
      })
      paper.project.activeLayer.addChild(lineText)
      this._items.push(lineText)
    }

    // 作者 - 再离左边远一点
    if (this.author) {
      const lastLineBaselineY = absY + absPadding + textBaselineOffset + (textLines.length - 1) * lineHeight
      const authorY = lastLineBaselineY + authorGap
      const authorText = new paper.PointText({
        point: [absX + absPadding + 10, authorY],
        content: `— ${this.author}`,
        fontSize: authorFontSize,
        fontFamily: getFontFallbackChain(this.fontFamily, this.author),
        fillColor: this.authorColor,
      })
      paper.project.activeLayer.addChild(authorText)
      this._items.push(authorText)
    }
  }

  destroy() {
    for (const item of this._items) {
      item.remove()
    }
    this._items = []
    super.destroy()
  }
}

module.exports = { Quote }