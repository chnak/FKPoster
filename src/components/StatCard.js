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
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
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

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absWidth * anchorX
    const posY = absY - absHeight * anchorY

    // 背景
    const bg = new paper.Path.Rectangle({
      point: [posX, posY],
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
    const paddingY = 16
    const iconSize = Math.min(20, absHeight * 0.18)
    const valueSize = Math.min(28, absHeight * 0.28)
    const labelSize = Math.min(12, absHeight * 0.12)
    const changeSize = Math.min(11, absHeight * 0.09)

    // 内容从左上角开始
    let currentY = posY + paddingY

    // 图标 - 左上角
    if (this.icon) {
      const iconFontFamily = getFontFallbackChain(null, this.icon)
      const iconText = new paper.PointText({
        point: [posX + paddingX, currentY + iconSize],
        content: this.icon,
        fontSize: iconSize,
        fontFamily: iconFontFamily,
        fillColor: new paper.Color(this.iconColor),
      })
      paper.project.activeLayer.addChild(iconText)
      this._pathElements.push(iconText)
    }

    // 数值 - 在图标旁边或新的一行
    let valueX = posX + paddingX
    if (this.icon) {
      valueX += iconSize + 10  // 图标宽度 + 间距
    }
    const valueText = new paper.PointText({
      point: [valueX, currentY + valueSize],
      content: this.value,
      fontSize: valueSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color('#ffffff'),
      fontWeight: 'bold',
    })
    paper.project.activeLayer.addChild(valueText)
    this._pathElements.push(valueText)

    // 下一行
    currentY += valueSize + 8

    // 标签
    const labelText = new paper.PointText({
      point: [posX + paddingX, currentY + labelSize],
      content: this.label,
      fontSize: labelSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color('#888888'),
    })
    paper.project.activeLayer.addChild(labelText)
    this._pathElements.push(labelText)
    currentY += labelSize + 4

    // 变化值
    if (this.change) {
      const changeColor = this.positive ? '#22c55e' : '#ef4444'
      const changeIcon = this.positive ? '↑' : '↓'
      const changeText = new paper.PointText({
        point: [posX + paddingX, currentY + changeSize],
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
