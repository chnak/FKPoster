/**
 * 分隔线元素
 */
const { BaseElement } = require('../core/BaseElement')

class DividerElement extends BaseElement {
  constructor(config = {}) {
    super({ ...config, type: 'divider' })

    this.width = config.width || 300
    this.color = config.color || '#00d9ff'
    this.thickness = config.thickness || 1
    this.style = config.style || 'solid'
    this.align = config.align || 'left'
  }

  _createPaperItem(paper) {
    // 直接使用 Line
    const line = new paper.Path.Line({
      from: [0, 0],
      to: [this.width, 0],
      strokeColor: new paper.Color(this.color),
      strokeWidth: this.thickness,
    })

    if (this.style === 'dashed') {
      line.dashArray = [10, 5]
    }

    return line
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)
    if (!this._paperItem) return

    // 计算位置
    const x = this._resolvePercent(this.x, context.width)
    const y = this._resolvePercent(this.y, context.height)

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0
    const anchorY = this.anchor ? this.anchor[1] : 0
    const posX = x - this.width * anchorX
    const posY = y - anchorY

    this._paperItem.bounds.x = posX
    this._paperItem.bounds.y = posY

    this._paperItem.opacity = this.opacity
    this._paperItem.visible = this.visible
  }
}

module.exports = { DividerElement }
