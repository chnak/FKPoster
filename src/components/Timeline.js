/**
 * 时间线组件
 */
const { Component } = require('../core/Component')
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
    this.items = config.items || []
    this.lineColor = config.lineColor || '#4a4a5a'
    this.dotColor = config.dotColor || '#00d9ff'
    this.activeColor = config.activeColor || '#22c55e'
    this.dotSize = config.dotSize || 16
    this.gap = config.gap || 60
    this.fontFamily = config.fontFamily
    this.dateColor = config.dateColor || '#888888'
    this.titleColor = config.titleColor || '#ffffff'
    this.descColor = config.descColor || '#aaaaaa'
    // 可自定义的字体大小
    this.dateSize = config.dateSize || 12
    this.titleSize = config.titleSize || 16
    this.descSize = config.descSize || 13
  }

  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._dotElements = []
    this._dateElements = []
    this._titleElements = []
    this._descElements = []
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absDotSize = toPixels(this.dotSize, context2d, 'width')
    const absGap = toPixels(this.gap, context2d, 'height')
    const absDateSize = toFontSizePixels(this.dateSize, context2d)
    const absTitleSize = toFontSizePixels(this.titleSize, context2d)
    const absDescSize = toFontSizePixels(this.descSize, context2d)

    // 清理旧元素
    this._cleanup()

    if (!this.items || this.items.length === 0) return

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = this.items.length * absGap
    const posX = absX - absWidth * anchorX
    const posY = absY - absHeight * anchorY

    const centerX = posX + absWidth / 2
    const centerY = posY + absDotSize / 2
    const endY = centerY + (this.items.length - 1) * absGap

    // 主线 - 从第一个点到最后一个点
    if (this.items.length > 1) {
      this._lineItem = new paper.Path.Line({
        from: [centerX, centerY],
        to: [centerX, endY],
        strokeColor: new paper.Color(this.lineColor),
        strokeWidth: 2,
      })
    }

    // 绘制每个项目
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      if (!item) continue

      // 圆点中心 Y 位置
      const dotCenterY = centerY + i * absGap
      const isActive = item.active !== false

      // 圆点 - 中心对齐
      const dot = new CircleElement({
        x: centerX,
        y: dotCenterY,
        radius: absDotSize / 2,
        fillColor: isActive ? this.dotColor : this.lineColor,
        anchor: [0.5, 0.5],
        opacity: this.opacity,
      })
      dot.initialize(paper)
      dot.render(paper, context)
      this._dotElements.push(dot)

      // 文字左右偏移量
      const leftX = centerX - absWidth / 4  // 左侧文字位置
      const rightX = centerX + absWidth / 4  // 右侧文字位置

      // 日期 - 在左侧，垂直位置在圆点上方
      if (item.date) {
        const dateEl = new TextElement({
          x: leftX,
          y: dotCenterY - absDateSize * 0.5,  // 日期在圆心上方的基线
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

      // 标题 - 在右侧，垂直位置在圆点处
      const titleEl = new TextElement({
        x: rightX,
        y: dotCenterY - absTitleSize * 0.5,  // 标题基线在圆心位置
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
      if (item.description) {
        const descY = dotCenterY + absTitleSize * 0.3 + 4  // 标题下方
        const descEl = new TextElement({
          x: rightX,
          y: descY,
          text: item.description,
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
    if (this._lineItem) {
      this._lineItem.remove()
      this._lineItem = null
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