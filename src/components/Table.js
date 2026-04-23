/**
 * 表格组件
 */
const { Component } = require('../core/Component')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Table extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'table',
    })

    this.width = config.width || 400
    this.columns = config.columns || []
    this.rows = config.rows || []
    this.rowHeight = config.rowHeight || 36
    this.headerBg = config.headerBg || '#f0f0f0'
    this.headerColor = config.headerColor || '#333333'
    this.borderColor = config.borderColor || '#e0e0e0'
    this.cellColor = config.cellColor || '#333333'
    this.fontSize = config.fontSize || 12
    this.headerFontSize = config.headerFontSize || 13
    this.striped = config.striped !== false
    this.stripeColor = config.stripeColor || '#fafafa'
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  render(paper, context = {}) {
    if (!this._initialized) this.initialize(paper)
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absRowHeight = toPixels(this.rowHeight, context2d, 'height')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absHeaderFontSize = toFontSizePixels(this.headerFontSize, context2d)

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return
    if (!Array.isArray(this.columns) || this.columns.length === 0) return

    const totalHeight = absRowHeight * (this.rows.length + 1)

    // 外边框
    const outerBorder = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [absWidth, totalHeight]
    })
    outerBorder.fillColor = new paper.Color('transparent')
    outerBorder.strokeColor = new paper.Color(this.borderColor)
    outerBorder.strokeWidth = 1
    paper.project.activeLayer.addChild(outerBorder)
    this._pathElements.push(outerBorder)

    // 表头背景
    const headerBgRect = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [absWidth, absRowHeight]
    })
    headerBgRect.fillColor = new paper.Color(this.headerBg)
    headerBgRect.strokeColor = new paper.Color(this.borderColor)
    headerBgRect.strokeWidth = 0.5
    paper.project.activeLayer.addChild(headerBgRect)
    this._pathElements.push(headerBgRect)

    // 表头
    let currentX = absX
    this.columns.forEach((col, index) => {
      const colWidth = col.width ? toPixels(col.width, context2d, 'width') : (absWidth / this.columns.length)

      // 列分隔线
      if (index > 0) {
        const line = new paper.Path.Line({
          from: [currentX, absY],
          to: [currentX, absY + totalHeight]
        })
        line.strokeColor = new paper.Color(this.borderColor)
        line.strokeWidth = 0.5
        paper.project.activeLayer.addChild(line)
        this._pathElements.push(line)
      }

      // 表头文字
      const headerText = new paper.PointText({
        point: [currentX + colWidth / 2, absY + absRowHeight / 2 + absHeaderFontSize / 3],
        content: col.title || '',
        fontSize: absHeaderFontSize,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color(this.headerColor),
        justification: col.align || 'center',
        fontWeight: 'bold'
      })
      paper.project.activeLayer.addChild(headerText)
      this._pathElements.push(headerText)

      currentX += colWidth
    })

    // 数据行
    this.rows.forEach((row, rowIndex) => {
      const rowY = absY + absRowHeight * (rowIndex + 1)

      // 斑马纹背景
      if (this.striped && rowIndex % 2 === 1) {
        const stripeBg = new paper.Path.Rectangle({
          point: [absX, rowY],
          size: [absWidth, absRowHeight]
        })
        stripeBg.fillColor = new paper.Color(this.stripeColor)
        stripeBg.strokeColor = new paper.Color(this.borderColor)
        stripeBg.strokeWidth = 0.5
        paper.project.activeLayer.addChild(stripeBg)
        this._pathElements.push(stripeBg)
      }

      // 行分隔线
      const rowLine = new paper.Path.Line({
        from: [absX, rowY],
        to: [absX + absWidth, rowY]
      })
      rowLine.strokeColor = new paper.Color(this.borderColor)
      rowLine.strokeWidth = 0.5
      paper.project.activeLayer.addChild(rowLine)
      this._pathElements.push(rowLine)

      // 单元格
      let cellX = absX
      this.columns.forEach((col, colIndex) => {
        const colWidth = col.width ? toPixels(col.width, context2d, 'width') : (absWidth / this.columns.length)
        const cellValue = row[colIndex] || ''
        const cellText = new paper.PointText({
          point: [cellX + colWidth / 2, rowY + absRowHeight / 2 + absFontSize / 3],
          content: String(cellValue),
          fontSize: absFontSize,
          fontFamily: this.fontFamily || 'Microsoft YaHei',
          fillColor: new paper.Color(this.cellColor),
          justification: col.align || 'center'
        })
        paper.project.activeLayer.addChild(cellText)
        this._pathElements.push(cellText)

        cellX += colWidth
      })
    })
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Table }
