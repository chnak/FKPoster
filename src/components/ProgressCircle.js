/**
 * 圆形进度条组件
 */
const { Component } = require('../core/Component')
const { TextElement } = require('../elements/TextElement')

class ProgressCircle extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'progressCircle',
    })

    this.radius = config.radius || 50
    this.value = config.value !== undefined ? config.value : 75
    this.strokeWidth = config.strokeWidth || 10
    this.trackColor = config.trackColor || '#3a3a4a'
    this.fillColor = config.fillColor || '#00d9ff'
    this.backgroundColor = config.backgroundColor
    this.showLabel = config.showLabel !== false
    this.labelColor = config.labelColor || this.fillColor
    this.startAngle = config.startAngle || -90
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []

    if (this.showLabel) {
      const fontSize = Math.min(Math.max(Math.round(this.radius * 0.35), 12), 48)
      this._labelElement = new TextElement({
        x: 0,
        y: fontSize * 0.35,
        text: `${Math.round(this.value)}%`,
        fontSize: fontSize,
        fontFamily: this.fontFamily,
        color: this.labelColor,
        textAlign: 'center',
        anchor: [0.5, 0.5],
        fontWeight: 'bold',
        opacity: this.opacity,
      })
      this._labelElement.initialize(paper)
    }
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el) el.remove()
    }
    this._pathElements = []

    // 背景圆（填充整个区域）
    if (this.backgroundColor) {
      const bgCircle = new paper.Path.Circle({
        center: [absX + this.radius, absY + this.radius],
        radius: this.radius + this.strokeWidth / 2,
      })
      bgCircle.fillColor = new paper.Color(this.backgroundColor)
      if (paper.project && paper.project.activeLayer) {
        paper.project.activeLayer.addChild(bgCircle)
      }
      this._pathElements.push(bgCircle)
    }

    // 轨道（空心圆）
    const trackCircle = new paper.Path.Circle({
      center: [absX + this.radius, absY + this.radius],
      radius: this.radius,
    })
    trackCircle.fillColor = null
    trackCircle.strokeColor = new paper.Color(this.trackColor)
    trackCircle.strokeWidth = this.strokeWidth
    if (paper.project && paper.project.activeLayer) {
      paper.project.activeLayer.addChild(trackCircle)
    }
    this._pathElements.push(trackCircle)

    // 进度弧线
    if (this.value > 0 && this.value <= 100) {
      const percentage = this.value / 100
      const arcAngle = percentage * 360
      const startRad = this.startAngle * Math.PI / 180
      const endRad = (this.startAngle + arcAngle) * Math.PI / 180

      const progressArc = new paper.Path()

      // 起点
      progressArc.moveTo(
        absX + this.radius + this.radius * Math.cos(startRad),
        absY + this.radius + this.radius * Math.sin(startRad)
      )

      // 弧线上的点
      const segments = 36
      const angleStep = (endRad - startRad) / segments
      for (let i = 1; i <= segments; i++) {
        const angle = startRad + angleStep * i
        progressArc.lineTo(
          absX + this.radius + this.radius * Math.cos(angle),
          absY + this.radius + this.radius * Math.sin(angle)
        )
      }

      progressArc.strokeColor = new paper.Color(this.fillColor)
      progressArc.strokeWidth = this.strokeWidth
      progressArc.strokeCap = 'round'

      if (paper.project && paper.project.activeLayer) {
        paper.project.activeLayer.addChild(progressArc)
      }
      this._pathElements.push(progressArc)
    }

    // 标签
    if (this._labelElement && this._labelElement._paperItem) {
      this._labelElement.x = absX + this.radius
      this._labelElement.y = absY + this.radius
      this._labelElement.render(paper, context)
    }
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el) el.remove()
    }
    this._pathElements = []
    if (this._labelElement) this._labelElement.destroy()
    super.destroy()
  }
}

module.exports = { ProgressCircle }