/**
 * 步骤指示器组件
 */
const { Component } = require('../core/Component')

class Stepper extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'stepper',
    })

    this.width = config.width || 600
    this.steps = config.steps || []
    this.currentStep = config.currentStep || 0
    this.activeColor = config.activeColor || '#6366f1'
    this.inactiveColor = config.inactiveColor || '#e5e7eb'
    this.completedColor = config.completedColor || '#22c55e'
    this.circleSize = config.circleSize || 40
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    const stepWidth = this.steps.length > 1 ? this.width / (this.steps.length - 1) : this.width
    const lineY = absY + this.circleSize / 2

    // 绘制连接线
    if (this.steps.length > 1) {
      const line = new paper.Path.Line({
        from: [absX + this.circleSize / 2, lineY],
        to: [absX + this.width - this.circleSize / 2, lineY],
        strokeColor: new paper.Color(this.inactiveColor),
        strokeWidth: 2,
      })
      paper.project.activeLayer.addChild(line)
      this._pathElements.push(line)

      // 已完成部分的覆盖线
      if (this.currentStep > 0) {
        const completedLine = new paper.Path.Line({
          from: [absX + this.circleSize / 2, lineY],
          to: [absX + this.circleSize / 2 + this.currentStep * stepWidth, lineY],
          strokeColor: new paper.Color(this.completedColor),
          strokeWidth: 2,
        })
        paper.project.activeLayer.addChild(completedLine)
        this._pathElements.push(completedLine)
      }
    }

    // 绘制每个步骤
    for (let i = 0; i < this.steps.length; i++) {
      const stepX = this.steps.length > 1 ? absX + i * stepWidth : absX
      const step = this.steps[i]
      let color = this.inactiveColor

      if (i < this.currentStep) {
        color = this.completedColor
      } else if (i === this.currentStep) {
        color = this.activeColor
      }

      // 圆圈
      const circle = new paper.Path.Circle({
        center: [stepX + this.circleSize / 2, lineY],
        radius: this.circleSize / 2,
      })
      circle.fillColor = new paper.Color(color)
      paper.project.activeLayer.addChild(circle)
      this._pathElements.push(circle)

      // 步骤编号或勾选
      const icon = i < this.currentStep ? '✓' : String(i + 1)
      const iconText = new paper.PointText({
        point: [stepX + this.circleSize / 2, lineY + this.circleSize / 6],
        content: icon,
        fontSize: 16,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color('#ffffff'),
        justification: 'center',
      })
      paper.project.activeLayer.addChild(iconText)
      this._pathElements.push(iconText)

      // 标题
      const titleText = new paper.PointText({
        point: [stepX + this.circleSize / 2, absY + this.circleSize + 20],
        content: step.title || `Step ${i + 1}`,
        fontSize: 14,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color(i <= this.currentStep ? '#1e293b' : '#94a3b8'),
        justification: 'center',
      })
      paper.project.activeLayer.addChild(titleText)
      this._pathElements.push(titleText)

      // 描述
      if (step.description) {
        const descText = new paper.PointText({
          point: [stepX + this.circleSize / 2, absY + this.circleSize + 38],
          content: step.description,
          fontSize: 11,
          fontFamily: this.fontFamily || 'Microsoft YaHei',
          fillColor: new paper.Color('#94a3b8'),
          justification: 'center',
        })
        paper.project.activeLayer.addChild(descText)
        this._pathElements.push(descText)
      }
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

module.exports = { Stepper }
