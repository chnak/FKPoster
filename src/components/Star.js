/**
 * 星形组件
 * 支持多角星形
 */
const { Component } = require('../core/Component')
const { toPixels } = require('../utils/unit-converter')

class Star extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'star',
    })

    this.points = config.points || 5
    this.outerRadius = config.outerRadius || 50
    this.innerRadius = config.innerRadius || config.outerRadius * 0.4 || 20
    this.fillColor = config.fillColor || '#fbbf24'
    this.strokeColor = config.strokeColor
    this.strokeWidth = config.strokeWidth || 1
    this.rotation = config.rotation || 0
  }

  initialize(paper) {
    // 不需要初始化子元素
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')
    const absOuterRadius = toPixels(this.outerRadius, context2d, 'width')
    const absInnerRadius = toPixels(this.innerRadius, context2d, 'width')

    if (this._paperItem) {
      this._paperItem.remove()
    }

    // 创建星形路径
    const path = new paper.Path()
    const angleStep = Math.PI / this.points

    for (let i = 0; i < this.points * 2; i++) {
      const radius = i % 2 === 0 ? absOuterRadius : absInnerRadius
      const angle = i * angleStep - Math.PI / 2 + (this.rotation * Math.PI / 180)
      const px = absX + absOuterRadius + radius * Math.cos(angle)
      const py = absY + absOuterRadius + radius * Math.sin(angle)

      if (i === 0) {
        path.moveTo(px, py)
      } else {
        path.lineTo(px, py)
      }
    }
    path.closePath()

    if (this.fillColor) {
      path.fillColor = new paper.Color(this.fillColor)
    }
    if (this.strokeColor) {
      path.strokeColor = new paper.Color(this.strokeColor)
      path.strokeWidth = toPixels(this.strokeWidth, context2d, 'width')
    }
    path.opacity = this.opacity

    // 添加到活动层
    if (paper.project && paper.project.activeLayer) {
      paper.project.activeLayer.addChild(path)
    }

    this._paperItem = path
  }

  destroy() {
    if (this._paperItem) {
      this._paperItem.remove()
      this._paperItem = null
    }
    super.destroy()
  }
}

module.exports = { Star }