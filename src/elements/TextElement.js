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
    const textHeight = this._paperItem.bounds.height

    const posX = absoluteX - textWidth * anchorX
    const posY = absoluteY - textHeight * anchorY

    this._paperItem.bounds.x = posX
    this._paperItem.bounds.y = posY

    this._paperItem.fontSize = fontSize

    // 更新字体回退链
    const fontChain = getFontFallbackChain(this.fontFamily, this.text)
    this._paperItem.fontFamily = fontChain

    // 更新文本
    this._paperItem.content = this.text

    // 应用样式
    this._paperItem.opacity = this.opacity
    this._paperItem.rotation = this.rotation
    this._paperItem.visible = this.visible
  }
}

module.exports = { TextElement }
