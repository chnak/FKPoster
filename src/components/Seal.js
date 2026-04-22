/**
 * 印章组件 - 印章效果
 */
const { Component } = require('../core/Component')

class Seal extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'seal',
    })

    this.size = config.size || 100
    this.text = config.text || '印章'
    this.fontSize = config.fontSize || 24
    this.fontFamily = config.fontFamily
    this.color = config.color || '#e74c3c'
    this.style = config.style || 'circle' // circle, square, star, hexagon
    this.borderWidth = config.borderWidth || 3
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  _createStarPath(cx, cy, outerR, innerR, points) {
    const path = new paper.Path()
    const angleStep = Math.PI / points

    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR
      const angle = i * angleStep - Math.PI / 2
      path.add(new paper.Point(cx + r * Math.cos(angle), cy + r * Math.sin(angle)))
    }
    path.closed = true
    return path
  }

  _createPolygonPath(cx, cy, radius, sides) {
    const path = new paper.Path()
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI / sides) - Math.PI / 2
      path.add(new paper.Point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)))
    }
    path.closed = true
    return path
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

    const centerX = absX + this.size / 2
    const centerY = absY + this.size / 2

    // 印章边框
    let border
    switch (this.style) {
      case 'circle':
        border = new paper.Path.Circle({
          center: [centerX, centerY],
          radius: this.size / 2 - this.borderWidth,
        })
        break
      case 'square':
        const squareSize = this.size - this.borderWidth * 2
        border = new paper.Path.Rectangle({
          point: [absX + this.borderWidth, absY + this.borderWidth],
          size: [squareSize, squareSize],
          radius: 4,
        })
        break
      case 'star':
        border = this._createStarPath(centerX, centerY, this.size / 2 - this.borderWidth, this.size / 2 - this.borderWidth - 10, 5)
        break
      case 'hexagon':
        border = this._createPolygonPath(centerX, centerY, this.size / 2 - this.borderWidth, 6)
        break
      default:
        border = new paper.Path.Circle({
          center: [centerX, centerY],
          radius: this.size / 2 - this.borderWidth,
        })
    }

    border.strokeColor = new paper.Color(this.color)
    border.strokeWidth = this.borderWidth
    border.fillColor = null
    paper.project.activeLayer.addChild(border)
    this._pathElements.push(border)

    // 内边框
    const innerBorder = border.clone()
    innerBorder.scale(0.85, 0.85, new paper.Point(centerX, centerY))
    innerBorder.strokeWidth = 1
    paper.project.activeLayer.addChild(innerBorder)
    this._pathElements.push(innerBorder)

    // 主文字
    const textItem = new paper.PointText({
      point: [centerX, centerY + this.fontSize / 3],
      content: this.text,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
    })
    paper.project.activeLayer.addChild(textItem)
    this._pathElements.push(textItem)

    // 顶部星星
    const topText = new paper.PointText({
      point: [centerX, centerY - this.size / 4],
      content: '★',
      fontSize: 16,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
    })
    paper.project.activeLayer.addChild(topText)
    this._pathElements.push(topText)

    // 底部星星装饰
    const bottomStar = new paper.PointText({
      point: [centerX, centerY + this.size / 3],
      content: '★ ★ ★',
      fontSize: 12,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
      letterSpacing: 8,
    })
    paper.project.activeLayer.addChild(bottomStar)
    this._pathElements.push(bottomStar)
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Seal }
