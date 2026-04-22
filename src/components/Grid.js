/**
 * 网格布局组件
 */
const { Component } = require('../core/Component')
const { toPixels } = require('../utils/unit-converter')

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

  getLayout(context = {}) {
    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absGapX = toPixels(this.gapX, context2d, 'width')
    const absGapY = toPixels(this.gapY, context2d, 'height')

    const totalGapX = absGapX * (this.columns - 1)
    const totalGapY = absGapY * (this.rows - 1)
    const cellWidth = (absWidth - totalGapX) / this.columns
    const cellHeight = (absHeight - totalGapY) / this.rows

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

      const cellX = col * (cellWidth + absGapX)
      const cellY = row * (cellHeight + absGapY)

      cellPositions.push({
        index: i,
        column: col,
        row: row,
        x: absX + cellX,
        y: absY + cellY,
        width: cellWidth,
        height: cellHeight,
        centerX: absX + cellX + cellWidth / 2,
        centerY: absY + cellY + cellHeight / 2,
      })
    }

    return {
      cellPositions,
      cellWidth,
      cellHeight,
      columns: this.columns,
      rows: this.rows,
      totalCells,
      totalWidth: absWidth,
      totalHeight: absHeight,
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')

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
        size: [absWidth, absHeight],
        radius: absRadius,
      })
      bg.fillColor = new paper.Color(this.backgroundColor)
      paper.project.activeLayer.addChild(bg)
      this._pathElements.push(bg)
    }

    // 边框
    if (this.borderColor && this.borderWidth > 0) {
      const border = new paper.Path.Rectangle({
        point: [absX, absY],
        size: [absWidth, absHeight],
        radius: absRadius,
      })
      border.fillColor = new paper.Color('transparent')
      border.strokeColor = new paper.Color(this.borderColor)
      border.strokeWidth = absBorderWidth
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
