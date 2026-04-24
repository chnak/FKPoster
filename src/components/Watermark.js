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
    if (this._initialized) return
    this._paper = paper
    this._paperItem = null
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absFontSize = toFontSizePixels(this.fontSize, context2d)

    // 支持 anchor 定位 - 使用 [0.5, 0.5] 默认中心定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absFontSize * anchorX
    const posY = absY - absFontSize * anchorY

    // 清理旧元素
    if (this._paperItem && this._paperItem.parent) {
      this._paperItem.remove()
    }

    if (!paper.project || !paper.project.activeLayer) return

    // Paper.js 中 point 的 y 是文字基线，需要偏移 fontSize/3
    const label = new paper.PointText({
      point: [posX, posY + absFontSize / 3],
      content: this.text,
      fontSize: absFontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: this.align,
    })

    if (this.rotation !== 0) {
      label.rotate(this.rotation, new paper.Point(posX, posY))
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
