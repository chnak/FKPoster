/**
 * 丝带/飘带组件
 */
const { Component } = require('../core/Component')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Ribbon extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'ribbon',
    })

    this.width = config.width || 300
    this.text = config.text || ''
    this.fontSize = config.fontSize || 28
    this.fontFamily = config.fontFamily
    this.color = config.color || '#ffffff'
    this.backgroundColor = config.backgroundColor || '#e74c3c'
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 2
    this.style = config.style || 'fold' // fold, diagonal, corner
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  _darkenColor(paper, hexColor, factor = 0.7) {
    const color = new paper.Color(hexColor)
    return new paper.Color(
      Math.round(color.red * factor),
      Math.round(color.green * factor),
      Math.round(color.blue * factor)
    )
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    if (this.style === 'diagonal') {
      this._renderDiagonal(paper, absX, absY, absWidth, absFontSize, absBorderWidth)
    } else if (this.style === 'corner') {
      this._renderCorner(paper, absX, absY, absWidth, absFontSize, absBorderWidth)
    } else {
      this._renderFold(paper, absX, absY, absWidth, absFontSize, absBorderWidth)
    }
  }

  _renderDiagonal(paper, absX, absY, absWidth, absFontSize, absBorderWidth) {
    const ribbonHeight = 60
    const diagonalLength = Math.sqrt(absWidth ** 2 + ribbonHeight ** 2)
    const angle = Math.atan2(ribbonHeight, absWidth) * 180 / Math.PI

    const ribbon = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [diagonalLength, ribbonHeight],
      radius: 4,
    })
    ribbon.fillColor = new paper.Color(this.backgroundColor)
    if (this.borderColor) {
      ribbon.strokeColor = new paper.Color(this.borderColor)
      ribbon.strokeWidth = absBorderWidth
    }
    ribbon.rotate(angle, new paper.Point(absX, absY))
    paper.project.activeLayer.addChild(ribbon)
    this._pathElements.push(ribbon)

    const textItem = new paper.PointText({
      point: [absX + diagonalLength / 2, absY + ribbonHeight / 2 + absFontSize / 3],
      content: this.text,
      fontSize: absFontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
    })
    textItem.rotate(angle, new paper.Point(absX + diagonalLength / 2, absY + ribbonHeight / 2))
    paper.project.activeLayer.addChild(textItem)
    this._pathElements.push(textItem)
  }

  _renderCorner(paper, absX, absY, absWidth, absFontSize, absBorderWidth) {
    const ribbonWidth = absWidth
    const ribbonHeight = 50
    const foldSize = 20

    // 主丝带
    const ribbon = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [ribbonWidth, ribbonHeight],
      fillColor: new paper.Color(this.backgroundColor),
    })
    if (this.borderColor) {
      ribbon.strokeColor = new paper.Color(this.borderColor)
      ribbon.strokeWidth = absBorderWidth
    }
    paper.project.activeLayer.addChild(ribbon)
    this._pathElements.push(ribbon)

    // 左下角折叠三角
    const leftFold = new paper.Path()
    leftFold.add(new paper.Point(absX, absY + ribbonHeight))
    leftFold.add(new paper.Point(absX - foldSize, absY + ribbonHeight))
    leftFold.add(new paper.Point(absX, absY + ribbonHeight - foldSize))
    leftFold.closed = true
    leftFold.fillColor = this._darkenColor(paper, this.backgroundColor, 0.7)
    paper.project.activeLayer.addChild(leftFold)
    this._pathElements.push(leftFold)

    // 右下角折叠三角
    const rightFold = new paper.Path()
    rightFold.add(new paper.Point(absX + ribbonWidth, absY + ribbonHeight))
    rightFold.add(new paper.Point(absX + ribbonWidth + foldSize, absY + ribbonHeight))
    rightFold.add(new paper.Point(absX + ribbonWidth, absY + ribbonHeight - foldSize))
    rightFold.closed = true
    rightFold.fillColor = this._darkenColor(paper, this.backgroundColor, 0.7)
    paper.project.activeLayer.addChild(rightFold)
    this._pathElements.push(rightFold)

    // 文字
    const textItem = new paper.PointText({
      point: [absX + ribbonWidth / 2, absY + ribbonHeight / 2 + absFontSize / 3],
      content: this.text,
      fontSize: absFontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
    })
    paper.project.activeLayer.addChild(textItem)
    this._pathElements.push(textItem)
  }

  _renderFold(paper, absX, absY, absWidth, absFontSize, absBorderWidth) {
    const ribbonHeight = 50
    const foldSize = 15

    // 主丝带
    const ribbon = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [absWidth, ribbonHeight],
      fillColor: new paper.Color(this.backgroundColor),
    })
    if (this.borderColor) {
      ribbon.strokeColor = new paper.Color(this.borderColor)
      ribbon.strokeWidth = absBorderWidth
    }
    paper.project.activeLayer.addChild(ribbon)
    this._pathElements.push(ribbon)

    // 左上角折叠三角 - 向左上角折叠
    const leftFold = new paper.Path()
    leftFold.add(new paper.Point(absX, absY))
    leftFold.add(new paper.Point(absX, absY - foldSize))
    leftFold.add(new paper.Point(absX - foldSize, absY))
    leftFold.closed = true
    leftFold.fillColor = this._darkenColor(paper, this.backgroundColor, 0.7)
    paper.project.activeLayer.addChild(leftFold)
    this._pathElements.push(leftFold)

    // 右上角折叠三角 - 向右上角折叠
    const rightFold = new paper.Path()
    rightFold.add(new paper.Point(absX + absWidth, absY))
    rightFold.add(new paper.Point(absX + absWidth, absY - foldSize))
    rightFold.add(new paper.Point(absX + absWidth + foldSize, absY))
    rightFold.closed = true
    rightFold.fillColor = this._darkenColor(paper, this.backgroundColor, 0.7)
    paper.project.activeLayer.addChild(rightFold)
    this._pathElements.push(rightFold)

    // 文字
    const textItem = new paper.PointText({
      point: [absX + absWidth / 2, absY + ribbonHeight / 2 + absFontSize / 3],
      content: this.text,
      fontSize: absFontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
    })
    paper.project.activeLayer.addChild(textItem)
    this._pathElements.push(textItem)
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Ribbon }
