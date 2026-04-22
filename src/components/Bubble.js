/**
 * 对话气泡组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')

class Bubble extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'bubble',
    })

    this.width = config.width || 300
    this.height = config.height || 100
    this.text = config.text || ''
    this.fontSize = config.fontSize || 24
    this.fontFamily = config.fontFamily
    this.color = config.color || '#000000'
    this.backgroundColor = config.backgroundColor || '#ffffff'
    this.borderColor = config.borderColor
    this.borderWidth = config.borderWidth || 1
    this.radius = config.radius || 20
    this.tailDirection = config.tailDirection || 'bottom' // bottom, top, left, right
    this.tailPosition = config.tailPosition || 'left' // left, center, right
  }

  initialize(paper) {
    this._paper = paper
    this._pathElements = []
  }

  _wrapText(paper, text, maxWidth, fontSize, fontFamily) {
    if (!text) return [text]

    const lines = []
    let currentLine = ''

    for (const char of text) {
      const testLine = currentLine + char
      const testWidth = this._measureText(paper, testLine, fontSize, fontFamily)

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = char
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)
    return lines
  }

  _measureText(paper, text, fontSize, fontFamily) {
    // Use paper.js to measure text width
    const tempText = new paper.PointText({
      point: [0, 0],
      content: text,
      fontSize: fontSize,
      fontFamily: fontFamily || 'Microsoft YaHei',
    })
    const width = tempText.bounds.width
    tempText.remove()
    return width
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

    // 气泡主体偏移
    const bubbleX = this.tailDirection === 'left' ? absX + 15 : absX
    const bubbleY = this.tailDirection === 'top' ? absY + 15 : absY
    const bubbleWidth = this.tailDirection === 'left' ? this.width - 15 : this.width
    const bubbleHeight = this.tailDirection === 'top' ? this.height - 15 : this.height

    // 气泡主体
    const bg = new paper.Path.Rectangle({
      point: [bubbleX, bubbleY],
      size: [bubbleWidth, bubbleHeight],
      radius: this.radius,
    })
    bg.fillColor = new paper.Color(this.backgroundColor)
    if (this.borderColor) {
      bg.strokeColor = new paper.Color(this.borderColor)
      bg.strokeWidth = this.borderWidth
    }
    paper.project.activeLayer.addChild(bg)
    this._pathElements.push(bg)

    // 气泡尾巴
    const tailSize = 20
    let tailX, tailY, tailRotation

    switch (this.tailDirection) {
      case 'bottom':
        tailY = bubbleY + bubbleHeight - 5
        if (this.tailPosition === 'left') tailX = bubbleX + 30
        else if (this.tailPosition === 'right') tailX = bubbleX + bubbleWidth - 30
        else tailX = bubbleX + bubbleWidth / 2
        tailRotation = 0
        break
      case 'top':
        tailY = bubbleY + 5
        if (this.tailPosition === 'left') tailX = bubbleX + 30
        else if (this.tailPosition === 'right') tailX = bubbleX + bubbleWidth - 30
        else tailX = bubbleX + bubbleWidth / 2
        tailRotation = 180
        break
      case 'left':
        tailX = bubbleX + 5
        if (this.tailPosition === 'left') tailY = bubbleY + 30
        else if (this.tailPosition === 'right') tailY = bubbleY + bubbleHeight - 30
        else tailY = bubbleY + bubbleHeight / 2
        tailRotation = 90
        break
      case 'right':
        tailX = bubbleX + bubbleWidth - 5
        if (this.tailPosition === 'left') tailY = bubbleY + 30
        else if (this.tailPosition === 'right') tailY = bubbleY + bubbleHeight - 30
        else tailY = bubbleY + bubbleHeight / 2
        tailRotation = 270
        break
    }

    const tail = new paper.Path()
    tail.add(new paper.Point(tailX - tailSize, tailY))
    tail.add(new paper.Point(tailX, tailY + tailSize * 0.7))
    tail.add(new paper.Point(tailX, tailY - tailSize * 0.7))
    tail.closed = true
    tail.fillColor = new paper.Color(this.backgroundColor)
    if (this.borderColor) {
      tail.strokeColor = new paper.Color(this.borderColor)
      tail.strokeWidth = this.borderWidth
    }
    tail.rotate(tailRotation, new paper.Point(tailX, tailY))
    paper.project.activeLayer.addChild(tail)
    this._pathElements.push(tail)

    // 文字
    const padding = 25
    const maxTextWidth = bubbleWidth - padding * 2
    const lines = this._wrapText(paper, this.text, maxTextWidth, this.fontSize, this.fontFamily)
    const lineHeight = this.fontSize * 1.4
    const totalTextHeight = lines.length * lineHeight
    const startY = bubbleY + (bubbleHeight - totalTextHeight) / 2 + this.fontSize

    for (let i = 0; i < lines.length; i++) {
      const lineText = new paper.PointText({
        point: [bubbleX + padding, startY + i * lineHeight],
        content: lines[i],
        fontSize: this.fontSize,
        fontFamily: this.fontFamily || 'Microsoft YaHei',
        fillColor: new paper.Color(this.color),
        justification: this.tailPosition === 'left' ? 'left' : this.tailPosition === 'right' ? 'right' : 'center',
      })
      paper.project.activeLayer.addChild(lineText)
      this._pathElements.push(lineText)
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

module.exports = { Bubble }
