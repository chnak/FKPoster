/**
 * 文本元素
 */
const { BaseElement } = require('../core/BaseElement')
const { getFontFallbackChain, getDefaultFontFamily } = require('../fonts')
const { toPixels, toFontSizePixels, calculatePosition } = require('../utils/unit-converter')

class TextElement extends BaseElement {
  constructor(config = {}) {
    super({ ...config, type: 'text' })

    this.text = config.text || ''
    this.fontSize = config.fontSize || 32
    this.fontFamily = config.fontFamily || getDefaultFontFamily()
    this.fontWeight = config.fontWeight || 'normal'
    this.color = config.color || '#000000'
    this.textAlign = config.textAlign || 'left'
    this.maxWidth = config.maxWidth
    this.lineHeight = config.lineHeight || 1.5
  }

  _createPaperItem(paper) {
    const fontChain = getFontFallbackChain(this.fontFamily, this.text)

    const text = new paper.PointText({
      point: [0, 0],
      content: this.text,
      fontSize: this.fontSize,
      fontFamily: fontChain,
      fontWeight: this.fontWeight,
      fillColor: this.color,
      justification: 'left'
    })

    return text
  }

  _wrapText(paper, text, maxWidth, fontSize, fontFamily) {
    if (!maxWidth || maxWidth <= 0 || !text) return [text]

    const fontChain = getFontFallbackChain(fontFamily, text)
    const tempText = new paper.PointText({
      point: [0, 0],
      fontSize: fontSize,
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

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)
    if (!this._paperItem) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 解析位置（支持百分比、vw、vh、rpx 等）
    const absoluteX = toPixels(this.x, context2d, 'x')
    const absoluteY = toPixels(this.y, context2d, 'y')

    // 解析字体大小（支持百分比、rpx 等）
    const fontSize = toFontSizePixels(this.fontSize, context2d)

    // 支持 anchor 定位：[0,0] = 左上角基线，[0.5, 0.5] = 中心点
    const anchorX = this.anchor ? this.anchor[0] : 0
    const anchorY = this.anchor ? this.anchor[1] : 0

    // 获取文字尺寸
    const textWidth = this._paperItem.bounds.width

    // Paper.js PointText uses matrix for SVG export, not bounds
    // So we need to directly set the matrix translation
    const posX = absoluteX - textWidth * anchorX
    const posY = absoluteY

    // Apply position via matrix translation for correct SVG export
    this._paperItem.matrix.tx = posX
    this._paperItem.matrix.ty = posY

    this._paperItem.fontSize = fontSize

    // 更新字体回退链
    const fontChain = getFontFallbackChain(this.fontFamily, this.text)
    this._paperItem.fontFamily = fontChain

    // 换行处理
    const maxW = this.maxWidth ? toPixels(this.maxWidth, context2d, 'width') : null
    if (maxW && maxW > 0) {
      const wrappedLines = this._wrapText(paper, this.text, maxW, fontSize, this.fontFamily)
      this._paperItem.content = wrappedLines.join('\n')

      // 重新计算宽度（取最长行）
      let maxLineWidth = 0
      const tempText = new paper.PointText({
        point: [0, 0],
        fontSize: fontSize,
        fontFamily: fontChain,
      })
      for (const line of wrappedLines) {
        tempText.content = line
        maxLineWidth = Math.max(maxLineWidth, tempText.bounds.width)
      }
      tempText.remove()

      // 调整位置以适应换行后的宽度
      const newPosX = absoluteX - maxLineWidth * anchorX
      this._paperItem.matrix.tx = newPosX
    } else {
      this._paperItem.content = this.text
    }

    // 应用样式
    this._paperItem.opacity = this.opacity
    this._paperItem.rotation = this.rotation
    this._paperItem.visible = this.visible
  }
}

module.exports = { TextElement }
