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

    // 计算位置（考虑对齐）
    let absoluteX = this._resolvePercent(this.x, context.width)
    let absoluteY = this._resolvePercent(this.y, context.height)

    // 应用锚点偏移
    const anchorX = this.anchor ? this.anchor[0] : 0
    const anchorY = this.anchor ? this.anchor[1] : 0
    absoluteX = absoluteX - (this.width || 0) * anchorX
    absoluteY = absoluteY - (this.height || 0) * anchorY

    this._paperItem.position = new paper.Point(absoluteX, absoluteY)
    this._paperItem.opacity = this.opacity
    this._paperItem.visible = this.visible
  }
}

module.exports = { DividerElement }
