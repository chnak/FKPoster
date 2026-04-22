/**
 * 标签云组件
 */
const { Component } = require('../core/Component')

class TagCloud extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'tagCloud',
    })

    this.tags = config.tags || []
    this.fontSize = config.fontSize || 14
    this.padding = config.padding || 12
    this.gap = config.gap || 10
    this.maxWidth = config.maxWidth || 400
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

    let currentX = absX
    let currentY = absY
    let rowHeight = 0

    for (const tag of this.tags) {
      const tagText = String(tag.text || '')
      if (!tagText) continue

      const textWidth = tagText.length * this.fontSize * 0.6
      const tagWidth = textWidth + this.padding * 2
      const tagHeight = this.fontSize + this.padding * 2

      // 换行处理
      if (currentX + tagWidth > absX + this.maxWidth && currentX > absX) {
        currentX = absX
        currentY += rowHeight + this.gap
        rowHeight = 0
      }

      // 标签背景
      const tagBg = new paper.Path.Rectangle({
        point: [currentX, currentY],
        size: [tagWidth, tagHeight],
        radius: tagHeight / 2,
      })
      tagBg.fillColor = new paper.Color(tag.bgColor || '#e0e7ff')
      paper.project.activeLayer.addChild(tagBg)
      this._pathElements.push(tagBg)

      // 标签文字
      const tagTextEl = new paper.PointText({
        point: [currentX + tagWidth / 2, currentY + tagHeight / 2 + this.fontSize / 3],
        content: tagText,
        fontSize: this.fontSize,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color(tag.color || '#4338ca'),
        justification: 'center',
      })
      paper.project.activeLayer.addChild(tagTextEl)
      this._pathElements.push(tagTextEl)

      currentX += tagWidth + this.gap
      rowHeight = Math.max(rowHeight, tagHeight)
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

module.exports = { TagCloud }
