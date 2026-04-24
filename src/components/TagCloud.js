/**
 * 标签云组件
 */
const { Component } = require('../core/Component')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

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
    if (this._initialized) return
    this._paper = paper
    this._pathElements = []
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this._initialized) this.initialize(paper)
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absPadding = toPixels(this.padding, context2d, 'width')
    const absGap = toPixels(this.gap, context2d, 'width')
    const absMaxWidth = toPixels(this.maxWidth, context2d, 'width')

    // 支持 anchor 定位 - 使用 [0.5, 0.5] 默认中心定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = absX - absMaxWidth * anchorX
    const posY = absY

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    let currentX = posX
    let currentY = posY
    let rowHeight = 0

    for (const tag of this.tags) {
      const tagText = String(tag.text || '')
      if (!tagText) continue

      const textWidth = tagText.length * absFontSize * 0.6
      const tagWidth = textWidth + absPadding * 2
      const tagHeight = absFontSize + absPadding * 2

      // 换行处理
      if (currentX + tagWidth > absX + absMaxWidth && currentX > absX) {
        currentX = absX
        currentY += rowHeight + absGap
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
        point: [currentX + tagWidth / 2, currentY + tagHeight / 2 + absFontSize / 3],
        content: tagText,
        fontSize: absFontSize,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color(tag.color || '#4338ca'),
        justification: 'center',
      })
      paper.project.activeLayer.addChild(tagTextEl)
      this._pathElements.push(tagTextEl)

      currentX += tagWidth + absGap
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
