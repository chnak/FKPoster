/**
 * 图表组件 - 支持柱状图和饼图
 */
const { Component } = require('../core/Component')
const { getFontFallbackChain } = require('../fonts')

class Chart extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'chart',
    })

    this.width = config.width || 400
    this.height = config.height || 300
    this.chartType = config.chartType || 'bar' // bar, pie
    this.data = config.data || []
    this.barColor = config.barColor || '#3b82f6'
    this.showLabels = config.showLabels !== false
    this.showValues = config.showValues !== false
    this.barGap = config.barGap || 4
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

    if (this.chartType === 'bar') {
      this._renderBarChart(paper, absX, absY)
    } else if (this.chartType === 'pie') {
      this._renderPieChart(paper, absX, absY)
    }
  }

  _renderBarChart(paper, absX, absY) {
    if (this.data.length === 0) return

    const chartFont = getFontFallbackChain(this.fontFamily, this.data.map(d => (d.label || '') + String(d.value)).join(''))
    const maxValue = Math.max(...this.data.map(d => d.value))
    const barCount = this.data.length
    const totalGap = this.barGap * (barCount - 1)
    const barWidth = (this.width - totalGap) / barCount
    const labelHeight = this.showLabels ? 24 : 0
    const valueHeight = this.showValues ? 20 : 0
    const chartHeight = this.height - labelHeight - valueHeight - 10

    this.data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight
      const barX = absX + index * (barWidth + this.barGap)
      const barY = absY + this.height - labelHeight - valueHeight - barHeight - 5
      const color = item.color || this.barColor

      // 绘制柱子
      const bar = new paper.Path.Rectangle({
        point: [barX, barY],
        size: [barWidth, barHeight],
        radius: [4, 4, 0, 0]
      })
      bar.fillColor = new paper.Color(color)
      paper.project.activeLayer.addChild(bar)
      this._pathElements.push(bar)

      // 绘制数值
      if (this.showValues) {
        const valueText = new paper.PointText({
          point: [barX + barWidth / 2, barY - 8],
          content: String(item.value),
          fontSize: 12,
          fontFamily: chartFont,
          fillColor: new paper.Color('#666666'),
          justification: 'center'
        })
        paper.project.activeLayer.addChild(valueText)
        this._pathElements.push(valueText)
      }

      // 绘制标签
      if (this.showLabels) {
        const labelText = new paper.PointText({
          point: [barX + barWidth / 2, absY + this.height - 8],
          content: item.label || '',
          fontSize: 11,
          fontFamily: chartFont,
          fillColor: new paper.Color('#333333'),
          justification: 'center'
        })
        paper.project.activeLayer.addChild(labelText)
        this._pathElements.push(labelText)
      }
    })
  }

  _renderPieChart(paper, absX, absY) {
    if (this.data.length === 0) return

    const chartFont = getFontFallbackChain(this.fontFamily, this.data.map(d => (d.label || '') + String(d.value)).join(''))
    const cx = absX + this.width / 2
    const cy = absY + this.height / 2
    const radius = Math.min(this.width, this.height) / 2 - 10
    const total = this.data.reduce((sum, d) => sum + d.value, 0)
    let currentAngle = -90
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

    this.data.forEach((item, index) => {
      const percentage = item.value / total
      const endAngle = currentAngle + percentage * 360

      // 使用线段绘制扇形
      const path = new paper.Path()
      path.moveTo(cx, cy)
      const segments = 36
      const startRad = currentAngle * Math.PI / 180
      const endRad = endAngle * Math.PI / 180
      const angleStep = (endRad - startRad) / segments
      for (let i = 1; i <= segments; i++) {
        const angle = startRad + angleStep * i
        path.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
      }
      path.closePath()
      path.fillColor = new paper.Color(item.color || colors[index % colors.length])
      paper.project.activeLayer.addChild(path)
      this._pathElements.push(path)

      // 绘制百分比标签
      if (this.showLabels && percentage > 0.05) {
        const midAngle = (currentAngle + endAngle) / 2
        const midRad = midAngle * Math.PI / 180
        const labelX = cx + radius * 0.7 * Math.cos(midRad)
        const labelY = cy + radius * 0.7 * Math.sin(midRad)
        const labelText = new paper.PointText({
          point: [labelX, labelY + 4],
          content: `${Math.round(percentage * 100)}%`,
          fontSize: 11,
          fontFamily: chartFont,
          fillColor: new paper.Color('#ffffff'),
          justification: 'center',
          fontWeight: 'bold'
        })
        paper.project.activeLayer.addChild(labelText)
        this._pathElements.push(labelText)
      }

      currentAngle = endAngle
    })
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { Chart }
