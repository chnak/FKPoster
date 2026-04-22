/**
 * 水印组件
 */
const { Component } = require('../core/Component')

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

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 清理旧元素
    if (this._paperItem && this._paperItem.parent) {
      this._paperItem.remove()
    }

    if (!paper.project || !paper.project.activeLayer) return

    const label = new paper.PointText({
      point: [absX, absY],
      content: this.text,
      fontSize: this.fontSize,
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
