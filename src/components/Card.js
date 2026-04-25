/**
 * 卡片组件
 * 支持标题+副标题，自动换行，文本不超出边框
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Card extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'card',
    })

    this.backgroundColor = config.backgroundColor || config.background || '#ffffff'
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 1
    this.radius = config.radius || 0

    // 标题
    this.title = config.title
    this.titleSize = config.titleSize || 24
    this.titleColor = config.titleColor || '#000000'
    this.fontFamily = config.fontFamily

    // 副标题
    this.subtitle = config.subtitle
    this.subtitleSize = config.subtitleSize || 16
    this.subtitleColor = config.subtitleColor || '#666666'

    // 内边距
    this.padding = config.padding || 20
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._initialized = true

    // 背景
    this._bgElement = new RectElement({
      x: 0, y: 0, width: 1, height: 1,
      fillColor: this.backgroundColor,
      borderColor: this.borderColor,
      borderWidth: 0,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 标题元素（动态创建）
    this._titleElement = null
    // 副标题元素（动态创建）
    this._subtitleElement = null
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const ctx = { width: context.width || 1920, height: context.height || 1080 }

    // 计算尺寸
    const absX = toPixels(this.x, ctx, 'x')
    const absY = toPixels(this.y, ctx, 'y')
    const absWidth = toPixels(this.width, ctx, 'width')
    const absHeight = toPixels(this.height, ctx, 'height')
    const absPadding = toPixels(this.padding, ctx, 'width')
    const absTitleSize = toFontSizePixels(this.titleSize, ctx)
    const absSubtitleSize = toFontSizePixels(this.subtitleSize, ctx)
    const absRadius = toPixels(this.radius, ctx, 'width')
    const absBorderWidth = toPixels(this.borderWidth, ctx, 'width')

    // 锚点定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absWidth * anchorX
    const posY = absY - absHeight * anchorY

    // 可用宽度
    const maxTextWidth = absWidth - absPadding * 2

    // === 换行处理 ===
    const titleLines = this._wrapText(paper, this.title, maxTextWidth, absTitleSize, this.fontFamily)
    const subtitleLines = this._wrapText(paper, this.subtitle, maxTextWidth, absSubtitleSize, this.fontFamily)

    // 行高
    const titleLineHeight = absTitleSize * 1.2
    const subtitleLineHeight = absSubtitleSize * 1.2

    // 计算内容高度
    const titleHeight = titleLines.length * titleLineHeight
    const subtitleHeight = subtitleLines.length * subtitleLineHeight
    const contentGap = (this.title && this.subtitle) ? 8 : 0
    const totalContentHeight = titleHeight + contentGap + subtitleHeight

    // 最小高度
    const minHeight = absPadding * 2 + totalContentHeight
    const actualHeight = Math.max(absHeight, minHeight)

    // === 更新背景 ===
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = actualHeight
      this._bgElement.borderWidth = absBorderWidth
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = posX + absWidth / 2  // anchor [0.5, 0.5]
      this._bgElement.y = posY + actualHeight / 2
      this._bgElement.anchor = [0.5, 0.5]
      this._bgElement.render(paper, ctx)
    }

    // === 销毁旧元素 ===
    if (this._titleElement) {
      this._titleElement.destroy()
      this._titleElement = null
    }
    if (this._subtitleElement) {
      this._subtitleElement.destroy()
      this._subtitleElement = null
    }

    // === 内容起点 Y（顶部对齐 + padding）===
    const contentStartY = posY + absPadding

    // 第一行基线偏移（固定值，不再乘fontSize）
    let firstLineBaselineOffset = 8

    // === 创建标题元素 ===
    if (this.title) {
	  if(titleLines.length>1){
		  firstLineBaselineOffset+=8
	  }
      // 合并所有标题行为一个 TextElement
      const titleContent = titleLines.join('\n')
      this._titleElement = new TextElement({
        x: posX + absPadding,
        y: contentStartY + firstLineBaselineOffset,
        text: titleContent,
        fontSize: absTitleSize,
        fontFamily: this.fontFamily,
        color: this.titleColor,
        textAlign: 'left',
        anchor: [0, 0],
        opacity: this.opacity,
      })
      this._titleElement.initialize(paper)
      this._titleElement.render(paper, ctx)
    }

    // === 创建副标题元素 ===
    if (this.subtitle) {
      const subtitleStartY = contentStartY + titleHeight + contentGap
      const subtitleContent = subtitleLines.join('\n')
	  if(titleLines.length===1){
		  firstLineBaselineOffset+=8
	  }
      this._subtitleElement = new TextElement({
        x: posX + absPadding,
        y: subtitleStartY + firstLineBaselineOffset,
        text: subtitleContent,
        fontSize: absSubtitleSize,
        fontFamily: this.fontFamily,
        color: this.subtitleColor,
        textAlign: 'left',
        anchor: [0, 0],
        opacity: this.opacity,
      })
      this._subtitleElement.initialize(paper)
      this._subtitleElement.render(paper, ctx)
    }
  }

  /**
   * 文本换行
   */
  _wrapText(paper, text, maxWidth, fontSize, fontFamily) {
    if (!text || !maxWidth || maxWidth <= 0) return [text || '']

    if (!paper || !paper.project) {
      // 无 paper 对象，使用字符估算
      const charsPerLine = Math.floor(maxWidth / (fontSize * 0.6))
      return this._wrapTextByChars(text, charsPerLine)
    }

    const fontChain = fontFamily || 'Microsoft YaHei'
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

  /**
   * 按字符数换行（备用方案）
   */
  _wrapTextByChars(text, maxCharsPerLine) {
    if (!text) return ['']
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

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    if (this._titleElement) this._titleElement.destroy()
    if (this._subtitleElement) this._subtitleElement.destroy()
    super.destroy()
  }
}

module.exports = { Card }