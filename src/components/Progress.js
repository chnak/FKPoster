/**
 * 进度条组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels } = require('../utils/unit-converter')

class Progress extends Component {
  constructor(config = {}) {
    // 禁用基类的背景创建，Progress 自己管理轨道和填充
    super({
      ...config,
      type: 'progress',
      backgroundColor: null,
    })

    this.width = config.width || 300
    this.height = config.height || 20
    this.value = config.value !== undefined ? config.value : 50
    this.trackColor = config.trackColor || '#e0e0e0'
    this.fillColor = config.fillColor || '#6366f1'
    this.radius = config.radius || 10
    this.showLabel = config.showLabel || false
    this.label = config.label
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    if (this._initialized) return
    // 轨道背景 - 使用临时尺寸，会在 render 时更新
    this._trackElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this.trackColor,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._trackElement.initialize(paper)

    // 进度填充 - 使用临时尺寸
    this._fillElement = new RectElement({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fillColor: this.fillColor,
      borderRadius: 0,
      opacity: this.opacity,
    })
    this._fillElement.initialize(paper)

    // 标签
    if (this.showLabel && this.label) {
      this._labelElement = new TextElement({
        x: 0,
        y: 0,
        text: this.label,
        fontSize: 14,
        fontFamily: this.fontFamily,
        color: '#666666',
        textAlign: 'center',
        opacity: this.opacity,
      })
      this._labelElement.initialize(paper)
    }
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absRadius = toPixels(this.radius, context2d, 'width')

    // 轨道 - 使用 anchor: [0.5, 0.5] 让系统自动居中
    if (this._trackElement && this._trackElement._paperItem) {
      this._trackElement.width = absWidth
      this._trackElement.height = absHeight
      this._trackElement.borderRadius = absRadius
      this._trackElement.x = absX
      this._trackElement.y = absY
      this._trackElement.anchor = [0.5, 0.5]
      this._trackElement.render(paper, context)
    }

    // 进度 (value 是百分比 0-100) - 使用 anchor: [0, 0.5] 让进度从左开始
    if (this._fillElement && this._fillElement._paperItem) {
      const progressWidth = (this.value / 100) * absWidth
      this._fillElement.width = progressWidth
      this._fillElement.height = absHeight
      this._fillElement.borderRadius = absRadius
      this._fillElement.x = absX - absWidth / 2  // 左边缘对齐轨道左边缘
      this._fillElement.y = absY
      this._fillElement.anchor = [0, 0.5]
      this._fillElement.render(paper, context)
    }

    // 标签 - 直接使用 absX, absY 作为中心点
    if (this._labelElement && this._labelElement._paperItem) {
      this._labelElement.x = absX
      this._labelElement.y = absY
      this._labelElement.render(paper, context)
    }
  }

  destroy() {
    if (this._trackElement) this._trackElement.destroy()
    if (this._fillElement) this._fillElement.destroy()
    if (this._labelElement) this._labelElement.destroy()
    super.destroy()
  }
}

module.exports = { Progress }