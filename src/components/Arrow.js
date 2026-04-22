/**
 * 箭头组件
 */
const { Component } = require('../core/Component')

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
    this._paper = paper
    this._pathElements = []
  }

  render(paper, context = {}) {
    if (!this.visible) return

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    const x1 = this._resolvePercent(this.x1, context.width)
    const y1 = this._resolvePercent(this.y1, context.height)
    const x2 = this._resolvePercent(this.x2, context.width)
    const y2 = this._resolvePercent(this.y2, context.height)

    if (!paper.project || !paper.project.activeLayer) return

    // 创建主线
    const line = new paper.Path.Line({
      from: [x1, y1],
      to: [x2, y2]
    })
    line.strokeColor = new paper.Color(this.color)
    line.strokeWidth = this.strokeWidth
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
        endX + this.headSize * Math.cos(angle1),
        endY + this.headSize * Math.sin(angle1)
      )
      path.moveTo(endX, endY)
      path.lineTo(
        endX + this.headSize * Math.cos(angle2),
        endY + this.headSize * Math.sin(angle2)
      )

      path.strokeColor = new paper.Color(this.color)
      path.strokeWidth = this.strokeWidth
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
