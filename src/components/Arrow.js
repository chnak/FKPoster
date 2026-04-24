/**
 * 箭头组件
 */
const { Component } = require('../core/Component')
const { toPixels } = require('../utils/unit-converter')

class Arrow extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'arrow',
    })

    this.x1 = config.x1 || 0
    this.y1 = config.y1 || 0
    this.x2 = config.x2 || 100
    this.y2 = config.y2 || 0
    this.color = config.color || '#333333'
    this.strokeWidth = config.strokeWidth || 2
    this.headSize = config.headSize || 12
    this.style = config.style || 'solid' // solid, dashed
    this.direction = config.direction || 'end' // end, start, both
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')
    const absWidth = toPixels(this.width || 100, context2d, 'width')
    const absHeight = toPixels(this.height || 40, context2d, 'height')

    // 计算箭头起点和终点（基于 x, y 作为中心点）
    const x1 = absX - absWidth / 2
    const y1 = absY - absHeight / 2
    const x2 = absX + absWidth / 2
    const y2 = absY + absHeight / 2

    // 转换单位
    const absStrokeWidth = toPixels(this.strokeWidth, context2d, 'width')
    const absHeadSize = toPixels(this.headSize, context2d, 'width')

    if (!paper.project || !paper.project.activeLayer) return

    // 创建主线
    const line = new paper.Path.Line({
      from: [x1, y1],
      to: [x2, y2]
    })
    line.strokeColor = new paper.Color(this.color)
    line.strokeWidth = absStrokeWidth
    if (this.style === 'dashed') {
      line.dashArray = [10, 5]
    }
    paper.project.activeLayer.addChild(line)
    this._pathElements.push(line)

    // 创建箭头头部
    const createArrowHead = (endX, endY, angle) => {
      const path = new paper.Path()
      const angle1 = angle + Math.PI * 0.8
      const angle2 = angle - Math.PI * 0.8

      path.moveTo(endX, endY)
      path.lineTo(
        endX + absHeadSize * Math.cos(angle1),
        endY + absHeadSize * Math.sin(angle1)
      )
      path.moveTo(endX, endY)
      path.lineTo(
        endX + absHeadSize * Math.cos(angle2),
        endY + absHeadSize * Math.sin(angle2)
      )

      path.strokeColor = new paper.Color(this.color)
      path.strokeWidth = absStrokeWidth
      path.strokeCap = 'round'
      return path
    }

    const angle = Math.atan2(y2 - y1, x2 - x1)

    if (this.direction === 'end' || this.direction === 'both') {
      const head = createArrowHead(x2, y2, angle)
      paper.project.activeLayer.addChild(head)
      this._pathElements.push(head)
    }

    if (this.direction === 'start' || this.direction === 'both') {
      const head = createArrowHead(x1, y1, angle + Math.PI)
      paper.project.activeLayer.addChild(head)
      this._pathElements.push(head)
    }
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Arrow }
