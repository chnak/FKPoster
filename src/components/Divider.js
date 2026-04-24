/**
 * 分隔线组件
 */
const { Component } = require('../core/Component')
const { toPixels } = require('../utils/unit-converter')

class Divider extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'divider',
    })

    this.width = config.width || 300
    this.color = config.color || '#00d9ff'
    this.thickness = config.thickness || 1
    this.style = config.style || 'solid'
    this.align = config.align || 'left'
  }

  initialize(paper) {
    if (this._initialized) return
    // 不创建子元素，直接在 render 中创建
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
    const absThickness = toPixels(this.thickness, context2d, 'height')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const startX = absX - absWidth * anchorX

    // 移除旧的线段
    if (this._paperItem) {
      this._paperItem.remove()
    }

    // 创建新线段
    const line = new paper.Path.Line({
      from: [startX, absY],
      to: [startX + absWidth, absY],
      strokeColor: new paper.Color(this.color),
      strokeWidth: absThickness,
    })

    if (this.style === 'dashed') {
      line.dashArray = [10, 5]
    }

    line.opacity = this.opacity
    this._paperItem = line
  }

  destroy() {
    if (this._paperItem) {
      this._paperItem.remove()
      this._paperItem = null
    }
    super.destroy()
  }
}

module.exports = { Divider }