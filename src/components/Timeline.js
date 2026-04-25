/**
 * 时间线组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { CircleElement } = require('../elements/CircleElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

class Timeline extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'timeline',
    })

    this.width = config.width || 500
    this.height = config.height || 150
    this.items = config.items || []
    this.lineColor = config.lineColor || '#4a4a5a'
    this.dotColor = config.dotColor || '#00d9ff'
    this.activeColor = config.activeColor || '#22c55e'
    this.dotSize = config.dotSize || 12
    this.gap = config.gap || 50
    this.fontFamily = config.fontFamily
    this.dateColor = config.dateColor || '#888888'
    this.titleColor = config.titleColor || '#ffffff'
    this.descColor = config.descColor || '#aaaaaa'
    // 可自定义的字体大小
    this.dateSize = config.dateSize || 14
    this.titleSize = config.titleSize || 16
    this.descSize = config.descSize || 12
    // 圆点边框
    this.dotBorderColor = config.dotBorderColor || '#ffffff'
    this.dotBorderWidth = config.dotBorderWidth || 2
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._initialized = true
    this._lineElement = null
    this._dotElements = []
    this._dateElements = []
    this._titleElements = []
    this._descElements = []
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
    const absDotSize = toPixels(this.dotSize, context2d, 'width')
    const absGap = toPixels(this.gap, context2d, 'height')
    const absDateSize = toFontSizePixels(this.dateSize, context2d)
    const absTitleSize = toFontSizePixels(this.titleSize, context2d)
    const absDescSize = toFontSizePixels(this.descSize, context2d)

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absWidth * anchorX
    const posY = absY - absHeight * anchorY

    // 清理旧元素
    this._cleanup()

    if (!this.items || this.items.length === 0) return

    // 组件内容区域居中布局
    const componentCenterX = posX + absWidth / 2
    const dotRadius = absDotSize / 2

    // 日期和标题区域各占一半宽度，圆点在中间
    const leftOffset = 60  // 日期相对中点的左偏移
    const rightOffset = 25  // 标题相对中点的右偏移

    // 计算实际使用的间距
    const itemGap = Math.max(absGap, absDotSize + absTitleSize * 2)
    const totalHeight = this.items.length * itemGap
    const startY = posY + absHeight / 2 - totalHeight / 2 + dotRadius

    // 主线 - 垂直线在圆点中心（组件中点）
    const lineX = componentCenterX
    const lineStartY = startY
    const lineEndY = startY + (this.items.length - 1) * itemGap

    this._lineElement = new RectElement({
      x: lineX,
      y: (lineStartY + lineEndY) / 2,
      width: 2,
      height: lineEndY - lineStartY,
      fillColor: this.lineColor,
      anchor: [0.5, 0.5],
      opacity: this.opacity,
    })
    this._lineElement.initialize(paper)
    this._lineElement.render(paper, context)

    // 绘制每个项目
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      if (!item) continue

      const dotCenterY = startY + i * itemGap
      const isActive = item.active !== false

      // 圆点 - 中心对齐（组件中点）
      const dot = new CircleElement({
        x: componentCenterX,
        y: dotCenterY,
        radius: dotRadius,
        fillColor: isActive ? this.dotColor : this.lineColor,
        borderColor: this.dotBorderColor,
        borderWidth: this.dotBorderWidth,
        anchor: [0.5, 0.5],
        opacity: this.opacity,
      })
      dot.initialize(paper)
      dot.render(paper, context)
      this._dotElements.push(dot)

      // 日期 - 在左侧，垂直居中于圆点
      if (item.date) {
        const dateEl = new TextElement({
          x: componentCenterX - leftOffset,
          y: dotCenterY + absDateSize * 0.35,  // 垂直居中
          text: item.date,
          fontSize: absDateSize,
          fontFamily: this.fontFamily,
          color: this.dateColor,
          textAlign: 'left',
          anchor: [0, 0],
          opacity: this.opacity,
        })
        dateEl.initialize(paper)
        dateEl.render(paper, context)
        this._dateElements.push(dateEl)
      }

      // 标题 - 在右侧，垂直居中于圆点
      const titleEl = new TextElement({
        x: componentCenterX + rightOffset,
        y: dotCenterY + absTitleSize * 0.35,
        text: item.title || `Event ${i + 1}`,
        fontSize: absTitleSize,
        fontFamily: this.fontFamily,
        color: isActive ? this.titleColor : '#666666',
        textAlign: 'left',
        anchor: [0, 0],
        opacity: this.opacity,
      })
      titleEl.initialize(paper)
      titleEl.render(paper, context)
      this._titleElements.push(titleEl)

      // 描述 - 在标题下方
      const desc = item.description || item.desc
      if (desc) {
        const descEl = new TextElement({
          x: componentCenterX + rightOffset,
          y: dotCenterY + absTitleSize * 1.5,
          text: desc,
          fontSize: absDescSize,
          fontFamily: this.fontFamily,
          color: this.descColor,
          textAlign: 'left',
          anchor: [0, 0],
          opacity: this.opacity,
        })
        descEl.initialize(paper)
        descEl.render(paper, context)
        this._descElements.push(descEl)
      }
    }
  }

  _cleanup() {
    if (this._lineElement) {
      this._lineElement.destroy()
      this._lineElement = null
    }
    for (const el of this._dotElements) {
      if (el) el.destroy()
    }
    for (const el of this._dateElements) {
      if (el) el.destroy()
    }
    for (const el of this._titleElements) {
      if (el) el.destroy()
    }
    for (const el of this._descElements) {
      if (el) el.destroy()
    }
    this._dotElements = []
    this._dateElements = []
    this._titleElements = []
    this._descElements = []
  }

  destroy() {
    this._cleanup()
    super.destroy()
  }
}

module.exports = { Timeline }