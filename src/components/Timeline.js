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
    this._paper = paper
    this._dotElements = []
    this._dateElements = []
    this._titleElements = []
    this._descElements = []
  }

  render(paper, context = {}) {
    if (!this.visible) return

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

    const centerX = absX + 80
    const centerY = absY + absDotSize / 2
    const contentX = absX + 120
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
      // 文字基线对齐圆心：bounds.y = dotCenterY - fontSize * 0.7
      // 这样文本基线会落在 dotCenterY 位置
      const dateBaseline = dotCenterY - absDateSize * 0.7
      const titleBaseline = dotCenterY - absTitleSize * 0.7
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

      // 日期 - 文本基线对齐
      if (item.date) {
        const dateEl = new TextElement({
          x: absX + 10,
          y: dateBaseline,
          text: item.date,
          fontSize: absDateSize,
          fontFamily: this.fontFamily,
          color: this.dateColor,
          textAlign: 'left',
          opacity: this.opacity,
        })
        dateEl.initialize(paper)
        dateEl.render(paper, context)
        this._dateElements.push(dateEl)
      }

      // 标题 - 文本基线对齐
      const titleEl = new TextElement({
        x: contentX,
        y: titleBaseline,
        text: item.title || `Event ${i + 1}`,
        fontSize: absTitleSize,
        fontFamily: this.fontFamily,
        color: isActive ? this.titleColor : '#666666',
        textAlign: 'left',
        opacity: this.opacity,
      })
      titleEl.initialize(paper)
      titleEl.render(paper, context)
      this._titleElements.push(titleEl)

      // 描述 - 紧跟在标题下方
      if (item.description) {
        const descY = titleBaseline + absTitleSize + 8 + absDescSize / 3
        const descEl = new TextElement({
          x: contentX,
          y: descY,
          text: item.description,
          fontSize: absDescSize,
          fontFamily: this.fontFamily,
          color: this.descColor,
          textAlign: 'left',
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