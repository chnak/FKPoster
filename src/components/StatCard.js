/**
 * 统计卡片组件
 */
const { Component } = require('../core/Component')
const { getFontFallbackChain } = require('../fonts')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class StatCard extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'statCard',
    })

    this.width = config.width || 200
    this.height = config.height || 120
    this.label = config.label || 'Total Users'
    this.value = config.value || '10,000'
    this.change = config.change
    this.positive = config.positive !== false
    this.icon = config.icon
    this.iconColor = config.iconColor || '#6366f1'
    this.backgroundColor = config.backgroundColor || '#2d2d3a'
    this.borderColor = config.borderColor || '#404050'
    this.radius = config.radius || 12
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absRadius = toPixels(this.radius, context2d, 'width')

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 背景
    const bg = new paper.Path.Rectangle({
      point: [absX, absY],
      size: [absWidth, absHeight],
      radius: absRadius,
    })
    bg.fillColor = new paper.Color(this.backgroundColor)
    bg.strokeColor = new paper.Color(this.borderColor)
    bg.strokeWidth = 1
    paper.project.activeLayer.addChild(bg)
    this._pathElements.push(bg)

    // 布局参数
    const paddingX = Math.max(16, absWidth * 0.08)
    const iconSize = Math.min(24, absHeight * 0.22)
    const valueSize = Math.min(24, absHeight * 0.2)
    const labelSize = Math.min(11, absHeight * 0.1)
    const changeSize = Math.min(11, absHeight * 0.09)

    // 计算总内容高度
    const iconHeight = this.icon ? iconSize : 0
    const labelHeight = labelSize
    const valueHeight = valueSize
    const changeHeight = this.change ? changeSize : 0
    const gaps = (this.icon ? 4 : 0) + (this.change ? 4 : 0) + 4 + 4  // 各元素间间距
    const totalContentHeight = iconHeight + labelHeight + valueHeight + changeHeight + gaps

    // 让内容在卡片内垂直居中
    const contentTopY = absY + (absHeight - totalContentHeight) / 2
    let currentY = contentTopY

    // 图标 - 在左上角，使用字体回退链
    if (this.icon) {
      const iconFontFamily = getFontFallbackChain(null, this.icon)
      const iconText = new paper.PointText({
        point: [absX + paddingX, currentY + iconSize],
        content: this.icon,
        fontSize: iconSize,
        fontFamily: iconFontFamily,
        fillColor: new paper.Color(this.iconColor),
      })
      paper.project.activeLayer.addChild(iconText)
      this._pathElements.push(iconText)
      currentY += iconSize + 4  // icon下方间距
    }

    // 标签
    const labelText = new paper.PointText({
      point: [absX + paddingX, currentY + labelSize],
      content: this.label,
      fontSize: labelSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color('#888888'),
    })
    paper.project.activeLayer.addChild(labelText)
    this._pathElements.push(labelText)
    currentY += labelHeight + 4  // label下方间距

    // 数值
    const valueText = new paper.PointText({
      point: [absX + paddingX, currentY + valueSize],
      content: this.value,
      fontSize: valueSize,
      fontFamily: this.fontFamily || 'Microsoft Ya Hei',
      fillColor: new paper.Color('#ffffff'),
      fontWeight: 'bold',
    })
    paper.project.activeLayer.addChild(valueText)
    this._pathElements.push(valueText)
    currentY += valueHeight + 4  // value下方间距

    // 变化值
    if (this.change) {
      const changeColor = this.positive ? '#22c55e' : '#ef4444'
      const changeIcon = this.positive ? '↑' : '↓'
      const changeText = new paper.PointText({
        point: [absX + paddingX, currentY + changeSize],
        content: `${changeIcon} ${this.change}`,
        fontSize: changeSize,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color(changeColor),
      })
      paper.project.activeLayer.addChild(changeText)
      this._pathElements.push(changeText)
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

module.exports = { StatCard }
