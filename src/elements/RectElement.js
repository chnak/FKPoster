/**
 * 矩形元素
 */
const { BaseElement } = require('../core/BaseElement')
const { toPixels } = require('../utils/unit-converter')

class RectElement extends BaseElement {
  constructor(config = {}) {
    super({ ...config, type: 'rect' })

    this.width = config.width || 200
    this.height = config.height || 100

    // 样式
    this.fillColor = config.fillColor || config.bgcolor || null
    this.strokeColor = config.strokeColor || config.borderColor || null
    this.strokeWidth = config.strokeWidth || config.borderWidth || 0
    this.borderRadius = config.borderRadius || config.radius || 0
  }

  _createPaperItem(paper) {
    // Use numeric placeholder values since render() will calculate proper values
    const rect = new paper.Path.Rectangle({
      point: [0, 0],
      size: [100, 100],
      radius: typeof this.borderRadius === 'string' ? 0 : this.borderRadius
    })

    if (this.fillColor) {
      rect.fillColor = this.fillColor
    }
    if (this.strokeColor) {
      rect.strokeColor = this.strokeColor
      rect.strokeWidth = this.strokeWidth
    }

    return rect
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)
    if (!this._paperItem) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 解析尺寸（支持百分比、vw、vh、rpx 等）
    const width = toPixels(this.width, context2d, 'width')
    const height = toPixels(this.height, context2d, 'height')

    // 解析位置
    const x = toPixels(this.x, context2d, 'x')
    const y = toPixels(this.y, context2d, 'y')

    // 支持 anchor 定位：[0,0] = 左上角，[0.5, 0.5] = 中心点
    const anchorX = this.anchor ? this.anchor[0] : 0
    const anchorY = this.anchor ? this.anchor[1] : 0
    const posX = x - width * anchorX
    const posY = y - height * anchorY

    // 重建矩形以确保路径数据正确
    this._paperItem.remove()
    this._paperItem = new paper.Path.Rectangle({
      point: [posX, posY],
      size: [width, height],
      radius: typeof this.borderRadius === 'string' ? 0 : toPixels(this.borderRadius, context2d, 'width')
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

module.exports = { RectElement }
