/**
 * 网格布局组件
 */
const { Component } = require('../core/Component')

class Grid extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'grid',
    })

    this.width = config.width || 400
    this.height = config.height || 300
    this.columns = config.columns || 3
    this.rows = config.rows || 2
    this.gapX = config.gapX || 20
    this.gapY = config.gapY || 20
    this.backgroundColor = config.backgroundColor
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 1
    this.radius = config.radius || 0
    this.direction = config.direction || 'row' // row, column
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  getLayout() {
    const totalGapX = this.gapX * (this.columns - 1)
    const totalGapY = this.gapY * (this.rows - 1)
    const cellWidth = (this.width - totalGapX) / this.columns
    const cellHeight = (this.height - totalGapY) / this.rows

    const cellPositions = []
    const totalCells = this.columns * this.rows

    for (let i = 0; i < totalCells; i++) {
      let col, row

      if (this.direction === 'row') {
        col = i % this.columns
        row = Math.floor(i / this.columns)
      } else {
        row = i % this.rows
        col = Math.floor(i / this.rows)
      }

      const cellX = col * (cellWidth + this.gapX)
      const cellY = row * (cellHeight + this.gapY)

      cellPositions.push({
        index: i,
        column: col,
        row: row,
        x: this.x + cellX,
        y: this.y + cellY,
        width: cellWidth,
        height: cellHeight,
        centerX: this.x + cellX + cellWidth / 2,
        centerY: this.y + cellY + cellHeight / 2,
      })
    }

    return {
      cellPositions,
      cellWidth,
      cellHeight,
      columns: this.columns,
      rows: this.rows,
      totalCells,
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
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Grid }
