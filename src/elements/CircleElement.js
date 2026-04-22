/**
 * 圆形元素
 */
const { BaseElement } = require('../core/BaseElement')
const { toPixels } = require('../utils/unit-converter')

class CircleElement extends BaseElement {
  constructor(config = {}) {
    super({ ...config, type: 'circle' })

    this.radius = config.radius || config.r || 50

    // 样式
    this.fillColor = config.fillColor || null
    this.strokeColor = config.strokeColor || null
    this.strokeWidth = config.strokeWidth || 0
  }

  _createPaperItem(paper) {
    // Use numeric placeholder since render() will calculate proper values
    const circle = new paper.Path.Circle({
      center: [0, 0],
      radius: typeof this.radius === 'string' ? 50 : this.radius
    })

    if (this.fillColor) {
      circle.fillColor = this.fillColor
    }
    if (this.strokeColor) {
      circle.strokeColor = this.strokeColor
      circle.strokeWidth = this.strokeWidth
    }

    return circle
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)
    if (!this._paperItem) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 解析半径（支持百分比、vw、vh、rpx 等）
    const radius = toPixels(this.radius, context2d, 'width')

    // 解析位置
    const x = toPixels(this.x, context2d, 'x')
    const y = toPixels(this.y, context2d, 'y')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0
    const anchorY = this.anchor ? this.anchor[1] : 0
    const centerX = x + radius * (1 - 2 * anchorX)
    const centerY = y + radius * (1 - 2 * anchorY)

    // 重建圆形以确保路径数据正确
    this._paperItem.remove()
    this._paperItem = new paper.Path.Circle({
      center: [centerX, centerY],
      radius: radius
    })

    if (this.fillColor) {
      this._paperItem.fillColor = new paper.Color(this.fillColor)
    }
    if (this.strokeColor) {
      this._paperItem.strokeColor = new paper.Color(this.strokeColor)
      this._paperItem.strokeWidth = this.strokeWidth
    }

    // 应用样式
    this._paperItem.opacity = this.opacity
    this._paperItem.rotation = this.rotation
    this._paperItem.visible = this.visible
  }
}

module.exports = { CircleElement }
