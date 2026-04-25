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
    this.children = config.children || []
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._initialized = true
  }

  getLayout(context = {}, posX = 0, posY = 0) {
    const context2d = { width: context.width || 1920, height: context.height || 1080 }

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
        x: posX + cellX,
        y: posY + cellY,
        width: cellWidth,
        height: cellHeight,
        centerX: posX + cellX + cellWidth / 2,
        centerY: posY + cellY + cellHeight / 2,
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
    if (!this._initialized) this.initialize(paper)
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absWidth * anchorX
    const posY = absY - absHeight * anchorY

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 背景
    if (this.backgroundColor) {
      const bg = new paper.Path.Rectangle({
        point: [posX, posY],
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
        point: [posX, posY],
        size: [absWidth, absHeight],
        radius: absRadius,
      })
      border.fillColor = new paper.Color('transparent')
      border.strokeColor = new paper.Color(this.borderColor)
      border.strokeWidth = absBorderWidth
      paper.project.activeLayer.addChild(border)
      this._pathElements.push(border)
    }

    // 渲染子元素 (children)
    const layout = this.getLayout(context, posX, posY)
    const children = this.children || []

    for (let i = 0; i < children.length && i < layout.totalCells; i++) {
      const child = children[i]
      const pos = layout.cellPositions[i]

      // 创建子元素矩形
      const childRect = new paper.Path.Rectangle({
        point: [pos.x, pos.y],
        size: [pos.width, pos.height],
        radius: absRadius / 2,
      })

      if (child.backgroundColor) {
        childRect.fillColor = new paper.Color(child.backgroundColor)
      } else if (this.backgroundColor) {
        childRect.fillColor = new paper.Color(this.backgroundColor).clone()
        childRect.fillColor.alpha = 0.5
      }

      paper.project.activeLayer.addChild(childRect)
      this._pathElements.push(childRect)

      // 如果有文字，添加文字
      if (child.text) {
        const textItem = new paper.PointText({
          point: [pos.centerX, pos.centerY + 5],
          content: child.text,
          fontSize: 14,
          fontFamily: 'Microsoft YaHei',
          fillColor: new paper.Color(child.color || '#ffffff'),
          justification: 'center',
        })
        paper.project.activeLayer.addChild(textItem)
        this._pathElements.push(textItem)
      }
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
