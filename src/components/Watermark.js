/**
 * 水印组件
 */
const { Component } = require('../core/Component')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Watermark extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'watermark',
    })

    this.text = config.text || '水印'
    this.fontSize = config.fontSize || 48
    this.fontFamily = config.fontFamily
    this.color = config.color || 'rgba(0,0,0,0.1)'
    this.rotation = config.rotation || 0
    this.align = config.align || 'center'
  }

  initialize(paper) {
    this._paper = paper
    this._paperItem = null
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absFontSize = toFontSizePixels(this.fontSize, context2d)

    // 清理旧元素
    if (this._paperItem && this._paperItem.parent) {
      this._paperItem.remove()
    }

    if (!paper.project || !paper.project.activeLayer) return

    // Paper.js 中 point 的 y 是文字基线，需要偏移 fontSize/3
    const label = new paper.PointText({
      point: [absX, absY + absFontSize / 3],
      content: this.text,
      fontSize: absFontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: this.align,
    })

    if (this.rotation !== 0) {
      label.rotate(this.rotation, new paper.Point(absX, absY))
    }

    paper.project.activeLayer.addChild(label)
    this._paperItem = label
  }

  destroy() {
    if (this._paperItem && this._paperItem.parent) {
      this._paperItem.remove()
    }
    this._paperItem = null
    super.destroy()
  }
}

module.exports = { Watermark }
