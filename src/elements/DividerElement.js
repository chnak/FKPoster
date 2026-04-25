/**
 * 分隔线元素
 */
const { BaseElement } = require('../core/BaseElement')
const { toPixels } = require('../utils/unit-converter')

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
    // Use numeric placeholders since render() will calculate proper values
    const line = new paper.Path.Line({
      from: [0, 0],
      to: [100, 0],
      strokeColor: new paper.Color(this.color),
      strokeWidth: typeof this.thickness === 'string' ? 1 : this.thickness,
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

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 计算位置
    const x = toPixels(this.x, context2d, 'x')
    const y = toPixels(this.y, context2d, 'y')
    const width = toPixels(this.width, context2d, 'width')
    const thickness = toPixels(this.thickness, context2d, 'width')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = x - width * anchorX
    const posY = y - anchorY

    // Update line position and size
    const oldItem = this._paperItem
    this._paperItem = new paper.Path.Line({
      from: [posX, posY],
      to: [posX + width, posY],
      strokeColor: new paper.Color(this.color),
      strokeWidth: thickness,
    })

    // 彻底移除旧 item
    if (oldItem && oldItem.parent) {
      oldItem.remove()
    }

    if (this.style === 'dashed') {
      this._paperItem.dashArray = [10, 5]
    }

    this._paperItem.opacity = this.opacity
    this._paperItem.visible = this.visible
  }
}

module.exports = { DividerElement }
