/**
 * 分栏布局组件
 */
const { Component } = require('../core/Component')

class Columns extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'columns',
    })

    this.width = config.width || 400
    this.height = config.height || 200
    this.columnCount = config.columns || 2
    this.gap = config.gap || 20
    this.backgroundColor = config.backgroundColor
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 1
    this.radius = config.radius || 0
    this.direction = config.direction || 'horizontal' // horizontal, vertical
    this.align = config.align || 'top' // top, center, bottom
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  getLayout() {
    const totalGap = this.gap * (this.columnCount - 1)
    const columnWidth = (this.width - totalGap) / this.columnCount

    const columnPositions = []
    for (let i = 0; i < this.columnCount; i++) {
      const colX = (columnWidth + this.gap) * i
      let colY
      if (this.align === 'center') {
        colY = (this.height - this.height) / 2
      } else if (this.align === 'bottom') {
        colY = this.height - this.height
      } else {
        colY = 0
      }

      columnPositions.push({
        index: i,
        x: this.x + colX,
        y: this.y + colY,
        width: columnWidth,
        height: this.height,
      })
    }

    return {
      columnPositions,
      columnWidth,
      totalWidth: this.width,
      totalHeight: this.height,
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 背景
    if (this.backgroundColor) {
      const bg = new paper.Path.Rectangle({
        point: [absX, absY],
        size: [this.width, this.height],
        radius: this.radius,
      })
      bg.fillColor = new paper.Color(this.backgroundColor)
      paper.project.activeLayer.addChild(bg)
      this._pathElements.push(bg)
    }

    // 边框
    if (this.borderColor && this.borderWidth > 0) {
      const border = new paper.Path.Rectangle({
        point: [absX, absY],
        size: [this.width, this.height],
        radius: this.radius,
      })
      border.fillColor = new paper.Color('transparent')
      border.strokeColor = new paper.Color(this.borderColor)
      border.strokeWidth = this.borderWidth
      paper.project.activeLayer.addChild(border)
      this._pathElements.push(border)
    }

    // 分割线
    const totalGap = this.gap * (this.columnCount - 1)
    const columnWidth = (this.width - totalGap) / this.columnCount

    for (let i = 1; i < this.columnCount; i++) {
      const lineX = absX + columnWidth * i + this.gap * (i - 1) + this.gap / 2
      const line = new paper.Path.Line({
        from: [lineX, absY + 20],
        to: [lineX, absY + this.height - 20],
      })
      line.strokeColor = new paper.Color('#e0e0e0')
      line.strokeWidth = 1
      paper.project.activeLayer.addChild(line)
      this._pathElements.push(line)
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

module.exports = { Columns }
