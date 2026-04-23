/**
 * 卡片组件
 * 支持标题+副标题，自动换行
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
    this.borderColor = config.borderColor || config.border
    this.borderWidth = config.borderWidth || config.borderWidth || 1
    this.radius = config.radius || 0

    // 标题
    this.title = config.title
    this.titleSize = config.titleSize || config.fontSize || 24
    this.titleColor = config.titleColor || '#000000'
    this.fontFamily = config.fontFamily

    // 副标题
    this.subtitle = config.subtitle
    this.subtitleSize = config.subtitleSize || 16
    this.subtitleColor = config.subtitleColor || '#666666'

    // 内边距
    this._padding = config.padding || 20

    // 文本自适应
    this._autoFit = config.autoFit !== false  // 默认开启自动适配
  }

  /**
   * 文本自动换行
   */
  _wrapText(paper, text, maxWidth, fontSize, fontFamily) {
    if (!maxWidth || maxWidth <= 0) return [text]

    const tempText = new paper.PointText({
      fontSize,
      fontFamily: fontFamily || 'sans-serif',
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
      borderColor: this.borderColor,
      borderWidth: 0,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._bgElement.initialize(paper)

    // 标题和副标题元素会在 render 时创建/更新
    this._titleElements = []
    this._subtitleElements = []
    this._titleLines = []
    this._subtitleLines = []
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absPadding = toPixels(this._padding, context2d, 'width')
    const absTitleSize = toFontSizePixels(this.titleSize, context2d)
    const absSubtitleSize = toFontSizePixels(this.subtitleSize, context2d)
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')

    // 计算可用宽度
    const maxTextWidth = absWidth - absPadding * 2

    // 标题换行
    let titleLines = []
    if (this.title) {
      titleLines = this._wrapText(paper, this.title, maxTextWidth, absTitleSize, this.fontFamily)
    }

    // 副标题换行
    let subtitleLines = []
    if (this.subtitle) {
      subtitleLines = this._wrapText(paper, this.subtitle, maxTextWidth, absSubtitleSize, this.fontFamily)
    }

    // 计算行高
    const titleLineHeight = absTitleSize * 1.3
    const subtitleLineHeight = absSubtitleSize * 1.3

    // 计算内容高度
    const titleHeight = titleLines.length * titleLineHeight
    const subtitleHeight = subtitleLines.length * subtitleLineHeight
    const contentHeight = titleHeight + (this.title && this.subtitle ? 8 : 0) + subtitleHeight

    // 计算最小高度（如果内容不足，用内容高度填充）
    const minHeight = absPadding * 2 + Math.max(contentHeight, absHeight - absPadding * 2)
    const actualHeight = Math.max(absHeight, minHeight)

    // 更新背景
    if (this._bgElement && this._bgElement._paperItem) {
      this._bgElement.width = absWidth
      this._bgElement.height = actualHeight
      this._bgElement.borderWidth = absBorderWidth
      this._bgElement.borderRadius = absRadius
      this._bgElement.x = absX
      this._bgElement.y = absY
      this._bgElement.render(paper, context)
    }

    // 销毁旧的标题元素
    for (const el of this._titleElements) {
      if (el) el.destroy()
    }
    this._titleElements = []

    // 标题文本元素
    for (let i = 0; i < titleLines.length; i++) {
      const el = new TextElement({
        x: absX + absPadding,
        y: absY + absPadding + absTitleSize + i * titleLineHeight,
        text: titleLines[i],
        fontSize: absTitleSize,
        fontFamily: this.fontFamily,
        color: this.titleColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      el.initialize(paper)
      el.render(paper, context)
      this._titleElements.push(el)
    }

    // 销毁旧的副标题元素
    for (const el of this._subtitleElements) {
      if (el) el.destroy()
    }
    this._subtitleElements = []

    // 副标题文本元素
    const subtitleStartY = absPadding + titleHeight + (this.title && this.subtitle ? 8 : 0)

    for (let i = 0; i < subtitleLines.length; i++) {
      const el = new TextElement({
        x: absX + absPadding,
        y: absY + subtitleStartY + absSubtitleSize + i * subtitleLineHeight,
        text: subtitleLines[i],
        fontSize: absSubtitleSize,
        fontFamily: this.fontFamily,
        color: this.subtitleColor,
        textAlign: 'left',
        opacity: this.opacity,
      })
      el.initialize(paper)
      el.render(paper, context)
      this._subtitleElements.push(el)
    }
  }

  destroy() {
    if (this._bgElement) this._bgElement.destroy()
    for (const el of this._titleElements) {
      if (el) el.destroy()
    }
    for (const el of this._subtitleElements) {
      if (el) el.destroy()
    }
    this._titleElements = []
    this._subtitleElements = []
    super.destroy()
  }
}

module.exports = { Card }