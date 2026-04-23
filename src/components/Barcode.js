/**
 * 条形码组件
 */
const { Component } = require('../core/Component')
const { getFontFallbackChain } = require('../fonts')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Barcode extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'barcode',
    })

    this.width = config.width || 300
    this.height = config.height || 100
    this.content = config.content || '1234567890'
    this.showText = config.showText !== false
    this.textColor = config.textColor || '#000000'
    this.fontSize = config.fontSize || 16
    this.color = config.color || '#000000'
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const startX = absX - absWidth * anchorX
    const startY = absY - absHeight * anchorY

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    const textHeight = this.showText ? 25 : 0
    const barHeight = absHeight - textHeight
    const padding = 10
    const barAreaWidth = absWidth - padding * 2
    const barCount = this.content.length * 3  // 每个字符用3个bar表示
    const barUnitWidth = barAreaWidth / barCount
    const barWidth = barUnitWidth * 0.7  // bar占80%宽度，留20%间距

    // 绘制条形
    let currentX = startX + padding
    for (let i = 0; i < this.content.length; i++) {
      const charCode = this.content.charCodeAt(i)
      // 用3个bar表示一个字符：宽、窄、宽/窄 交替
      const pattern = [
        charCode % 2 === 0,  // 第一个bar
        true,                 // 第二个bar总是窄
        charCode % 3 === 0   // 第三个bar
      ]

      for (let p = 0; p < 3; p++) {
        const isWide = pattern[p]
        const w = isWide ? barUnitWidth : barUnitWidth * 0.5

        const bar = new paper.Path.Rectangle({
          point: [currentX, startY],
          size: [w, barHeight],
          fillColor: new paper.Color(this.color),
        })
        paper.project.activeLayer.addChild(bar)
        this._pathElements.push(bar)

        currentX += barUnitWidth  // 每个位置占barUnitWidth宽度
      }
    }

    // 文字
    if (this.showText) {
      const fontFamily = getFontFallbackChain('monospace', this.content)
      const textItem = new paper.PointText({
        point: [startX + absWidth / 2, startY + barHeight + absFontSize + 2],
        content: this.content,
        fontSize: absFontSize,
        fontFamily,
        fillColor: new paper.Color(this.textColor),
        justification: 'center',
      })
      paper.project.activeLayer.addChild(textItem)
      this._pathElements.push(textItem)
    }
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Barcode }
