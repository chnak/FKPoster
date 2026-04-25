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

    // 计算内容高度
    // 文本高度 + 作者高度
    const authorFontSize = absFontSize * 0.85
    const textHeight = textLines.length * lineHeight
    const authorHeight = this.author ? authorFontSize : 0
    // 作者与文本的间距（至少一行高度的间距）
    const authorGap = this.author ? lineHeight : 0

    const totalContentHeight = absPadding * 2 + textHeight + authorGap + authorHeight

    // 自适应高度
    const actualHeight = this._minHeight > 0 ? Math.max(this._minHeight, totalContentHeight) : totalContentHeight

    // 位置
    const posX = absX - absWidth * anchorX
    const posY = absY - actualHeight * anchorY

    // 更新背景（中心对齐）
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = actualHeight
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = posX + absWidth / 2
      this._bgElement.y = posY + actualHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, ctx)
    }

    // 更新左边框
    if (this._borderElement && this._borderElement._paperItem) {
      this._borderElement.width = absBorderWidth
      this._borderElement.height = actualHeight
      this._borderElement.x = posX + absBorderWidth / 2
      this._borderElement.y = posY + actualHeight / 2
      this._borderElement.anchor = [0.5, 0.5]
      this._borderElement.render(paper, ctx)
    }

    // 内容起点 Y（顶部 + padding）
    const contentStartY = posY + absPadding

    // 内容起点 X（左侧 + padding + border）
    const contentStartX = posX + absPadding + absBorderWidth

    // 引号位置（左侧，baseline 偏移）
    if (this._quoteElement && this._quoteElement._paperItem) {
      this._quoteElement.x = posX + absPadding
      this._quoteElement.y = contentStartY + absFontSize
      this._quoteElement.fontSize = absFontSize * 2
      this._quoteElement.render(paper, ctx)
      this._quoteElement._paperItem.bringToFront()
    }

    // 文本位置（引号右侧，baseline 偏移）
    if (this._textElement && this._textElement._paperItem) {
      this._textElement.text = textLines.join('\n')
      this._textElement.x = contentStartX + 10
      // 多行文本需要调整 Y 位置：baselineY = contentStartY + absFontSize
      const textHeight = textLines.length * lineHeight
      const baselineY = contentStartY + absFontSize
      this._textElement.y = baselineY - absFontSize + textHeight / 2
      this._textElement.fontSize = absFontSize
      this._textElement.render(paper, ctx)
      this._textElement._paperItem.bringToFront()
    }

    // 作者位置（文本下方，baseline 偏移）
    if (this._authorElement && this._authorElement._paperItem) {
      this._authorElement.x = posX + absPadding + absBorderWidth + 15
      // 最后一行 baseline = contentStartY + 第一行 baseline 偏移 + (行数-1) * 行高
      const lastLineBaseline = contentStartY + absFontSize + (textLines.length - 1) * lineHeight
      // 作者 baseline = 最后一行 baseline + 行高（作为间距）+ 作者字体本身 baseline 偏移
      this._authorElement.y = lastLineBaseline + lineHeight + authorFontSize
      this._authorElement.fontSize = authorFontSize
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