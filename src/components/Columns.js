/**
 * 分栏布局组件
 */
const { Component } = require('../core/Component')
const { toPixels } = require('../utils/unit-converter')

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

  getLayout(context = {}) {
    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absGap = toPixels(this.gap, context2d, 'width')

    const totalGap = absGap * (this.columnCount - 1)
    const columnWidth = (absWidth - totalGap) / this.columnCount

    const columnPositions = []
    for (let i = 0; i < this.columnCount; i++) {
      const colX = (columnWidth + absGap) * i
      let colY
      if (this.align === 'center') {
        colY = (absHeight - absHeight) / 2
      } else if (this.align === 'bottom') {
        colY = absHeight - absHeight
      } else {
        colY = 0
      }

      columnPositions.push({
        index: i,
        x: absX + colX,
        y: absY + colY,
        width: columnWidth,
        height: absHeight,
      })
    }

    return {
      columnPositions,
      columnWidth,
      totalWidth: absWidth,
      totalHeight: absHeight,
    }
  }

  render(paper, context = {}) {
    if (!this._initialized) this.initialize(paper)
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absGap = toPixels(this.gap, context2d, 'width')
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

    // 分割线
    const totalGap = absGap * (this.columnCount - 1)
    const columnWidth = (absWidth - totalGap) / this.columnCount

    for (let i = 1; i < this.columnCount; i++) {
      const lineX = absX + columnWidth * i + absGap * (i - 1) + absGap / 2
      const line = new paper.Path.Line({
        from: [lineX, absY + 20],
        to: [lineX, absY + absHeight - 20],
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
