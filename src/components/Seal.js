/**
 * 印章组件 - 印章效果
 */
const { Component } = require('../core/Component')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

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
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._initialized = true
  }

  _createStarPath(paper, cx, cy, outerR, innerR, points) {
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

  _createPolygonPath(paper, cx, cy, radius, sides) {
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
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absSize = toPixels(this.size, context2d, 'width')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const centerX = absX - absSize * anchorX + absSize / 2
    const centerY = absY - absSize * anchorY + absSize / 2

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 印章边框
    let border
    switch (this.style) {
      case 'circle':
        border = new paper.Path.Circle({
          center: [centerX, centerY],
          radius: absSize / 2 - absBorderWidth,
        })
        break
      case 'square':
        const squareSize = absSize - absBorderWidth * 2
        border = new paper.Path.Rectangle({
          point: [centerX - squareSize / 2, centerY - squareSize / 2],
          size: [squareSize, squareSize],
          radius: 4,
        })
        break
      case 'star':
        border = this._createStarPath(paper, centerX, centerY, absSize / 2 - absBorderWidth, absSize / 2 - absBorderWidth - 10, 5)
        break
      case 'hexagon':
        border = this._createPolygonPath(paper, centerX, centerY, absSize / 2 - absBorderWidth, 6)
        break
      default:
        border = new paper.Path.Circle({
          center: [centerX, centerY],
          radius: absSize / 2 - absBorderWidth,
        })
    }

    border.strokeColor = new paper.Color(this.color)
    border.strokeWidth = absBorderWidth
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
      point: [centerX, centerY + absFontSize / 3],
      content: this.text,
      fontSize: absFontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'center',
    })
    paper.project.activeLayer.addChild(textItem)
    this._pathElements.push(textItem)

    // 顶部星星
    const topText = new paper.PointText({
      point: [centerX, centerY - absSize / 4],
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
      point: [centerX, centerY + absSize / 3],
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
