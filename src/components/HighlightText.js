/**
 * 高亮文字组件 - 荧光笔效果
 */
const { Component } = require('../core/Component')

class HighlightText extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'highlightText',
    })

    this.text = config.text || ''
    this.fontSize = config.fontSize || 48
    this.fontFamily = config.fontFamily
    this.color = config.color || '#000000'
    this.highlightColor = config.highlightColor || '#ffff00'
    this.highlightStyle = config.highlightStyle || 'marker' // marker, underline, background, stroke, neon
    this.highlightWidth = config.highlightWidth || 20
    this.strokeWidth = config.strokeWidth || 2
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
    this._textItem = null
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

    // 创建文字
    const textItem = new paper.PointText({
      point: [absX, absY + this.fontSize],
      content: this.text,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily || 'Microsoft YaHei',
      fillColor: new paper.Color(this.color),
      justification: 'left',
    })
    paper.project.activeLayer.addChild(textItem)
    this._textItem = textItem
    this._pathElements.push(textItem)

    const textBounds = textItem.bounds

    // 根据样式添加高亮
    switch (this.highlightStyle) {
      case 'marker':
        // 荧光笔效果 - 倾斜的矩形
        const markerHeight = this.fontSize * 0.8
        const marker = new paper.Path.Rectangle({
          point: [textBounds.x - 5, textBounds.y + this.fontSize * 0.3],
          size: [textBounds.width + 10, markerHeight],
        })
        marker.fillColor = new paper.Color(this.highlightColor)
        marker.opacity = 0.5
        marker.rotate(-5, marker.bounds.center)
        paper.project.activeLayer.addChild(marker)
        this._pathElements.push(marker)
        break

      case 'underline':
        // 下划线
        const underlineY = textBounds.y + this.fontSize + 5
        const underline = new paper.Path.Line(
          [textBounds.x, underlineY],
          [textBounds.x + textBounds.width, underlineY]
        )
        underline.strokeColor = new paper.Color(this.highlightColor)
        underline.strokeWidth = this.highlightWidth
        underline.strokeCap = 'round'
        paper.project.activeLayer.addChild(underline)
        this._pathElements.push(underline)
        break

      case 'background':
        // 背景色块
        const padding = 8
        const bg = new paper.Path.Rectangle({
          point: [textBounds.x - padding, textBounds.y - 5],
          size: [textBounds.width + padding * 2, this.fontSize + 10],
          radius: 4,
        })
        bg.fillColor = new paper.Color(this.highlightColor)
        bg.opacity = 0.6
        paper.project.activeLayer.addChild(bg)
        this._pathElements.push(bg)
        break

      case 'stroke':
        // 描边效果
        textItem.strokeColor = new paper.Color(this.highlightColor)
        textItem.strokeWidth = this.strokeWidth
        break

      case 'neon':
        // 霓虹效果
        textItem.strokeColor = new paper.Color(this.highlightColor)
        textItem.strokeWidth = this.strokeWidth * 2
        const neonClone = textItem.clone()
        neonClone.strokeWidth = this.strokeWidth * 4
        neonClone.strokeColor = new paper.Color(this.highlightColor)
        neonClone.fillColor = null
        neonClone.opacity = 0.3
        paper.project.activeLayer.addChild(neonClone)
        this._pathElements.push(neonClone)
        break
    }
  }

  destroy() {
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    this._textItem = null
    super.destroy()
  }
}

module.exports = { HighlightText }
