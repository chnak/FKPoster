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
    // 使用配置的值作为占位符，render() 会重新计算正确的值
    const rect = new paper.Path.Rectangle({
      point: [0, 0],
      size: [this.width || 100, this.height || 100],
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

    // 保存旧 item 引用以便彻底移除
    const oldItem = this._paperItem

    // 重建矩形以确保路径数据正确
    this._paperItem = new paper.Path.Rectangle({
      point: [posX, posY],
      size: [width, height],
      radius: typeof this.borderRadius === 'string' ? 0 : toPixels(this.borderRadius, context2d, 'width')
    })
    // 显式添加到活动图层
    if (paper.project && paper.project.activeLayer) {
      paper.project.activeLayer.addChild(this._paperItem)
    }

    // 彻底移除旧 item（remove() 只断开引用，需要从父级移除）
    if (oldItem && oldItem.parent) {
      oldItem.remove()
    }

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
