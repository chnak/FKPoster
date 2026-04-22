/**
 * 分隔线组件
 */
const { Component } = require('../core/Component')

class Divider extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'divider',
    })

    this.width = config.width || 300
    this.color = config.color || '#00d9ff'
    this.thickness = config.thickness || 1
    this.style = config.style || 'solid'
    this.align = config.align || 'left'
  }

  initialize(paper) {
    // 不创建子元素，直接在 render 中创建
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 移除旧的线段
    if (this._paperItem) {
      this._paperItem.remove()
    }

    // 创建新线段
    const line = new paper.Path.Line({
      from: [absX, absY],
      to: [absX + this.width, absY],
      strokeColor: new paper.Color(this.color),
      strokeWidth: this.thickness,
    })

    if (this.style === 'dashed') {
      line.dashArray = [10, 5]
    }

    line.opacity = this.opacity
    this._paperItem = line
  }

  destroy() {
    if (this._paperItem) {
      this._paperItem.remove()
      this._paperItem = null
    }
    super.destroy()
  }
}

module.exports = { Divider }