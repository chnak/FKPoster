/**
 * 对话气泡组件
 */
const { Component } = require('../core/Component')
const { RectElement } = require('../elements/RectElement')
const { TextElement } = require('../elements/TextElement')
const { toPixels, toFontSizePixels } = require('../utils/unit-converter')

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
    if (!this._initialized) this.initialize(paper)
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 转换单位
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')
    const absFontSize = toFontSizePixels(this.fontSize, context2d)
    const absRadius = toPixels(this.radius, context2d, 'width')
    const absBorderWidth = toPixels(this.borderWidth, context2d, 'width')

    // 清理旧元素
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 气泡主体偏移
    const bubbleX = this.tailDirection === 'left' ? absX + 15 : absX
    const bubbleY = this.tailDirection === 'top' ? absY + 15 : absY
    const bubbleWidth = this.tailDirection === 'left' ? absWidth - 15 : absWidth

    // 文字
    const padding = 25
    const maxTextWidth = bubbleWidth - padding * 2
    const lines = this._wrapText(paper, this.text, maxTextWidth, absFontSize, this.fontFamily)
    const lineHeight = absFontSize * 1.4

    // 计算自适应高度
    const minHeight = absHeight
    const contentHeight = lines.length * lineHeight + padding * 2
    const actualBubbleHeight = Math.max(minHeight, contentHeight)

    // 气泡主体
    const bg = new paper.Path.Rectangle({
      point: [bubbleX, bubbleY],
      size: [bubbleWidth, actualBubbleHeight],
      radius: absRadius,
    })
    bg.fillColor = new paper.Color(this.backgroundColor)
    if (this.borderColor) {
      bg.strokeColor = new paper.Color(this.borderColor)
      bg.strokeWidth = absBorderWidth
    }
    paper.project.activeLayer.addChild(bg)
    this._pathElements.push(bg)

    // 气泡尾巴位置计算
    const tailSize = 20
    let tailX, tailY, tailRotation

    switch (this.tailDirection) {
      case 'bottom':
        tailY = bubbleY + actualBubbleHeight - 5
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
        else if (this.tailPosition === 'right') tailY = bubbleY + actualBubbleHeight - 30
        else tailY = bubbleY + actualBubbleHeight / 2
        tailRotation = 90
        break
      case 'right':
        tailX = bubbleX + bubbleWidth - 5
        if (this.tailPosition === 'left') tailY = bubbleY + 30
        else if (this.tailPosition === 'right') tailY = bubbleY + actualBubbleHeight - 30
        else tailY = bubbleY + actualBubbleHeight / 2
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
      tail.strokeWidth = absBorderWidth
    }
    tail.rotate(tailRotation, new paper.Point(tailX, tailY))
    paper.project.activeLayer.addChild(tail)
    this._pathElements.push(tail)

    // 文字 - 垂直居中
    const totalTextHeight = lines.length * lineHeight
    const textStartY = bubbleY + (actualBubbleHeight - totalTextHeight) / 2 + absFontSize

    for (let i = 0; i < lines.length; i++) {
      let textX
      if (this.tailPosition === 'left') {
        textX = bubbleX + padding
      } else if (this.tailPosition === 'right') {
        textX = bubbleX + bubbleWidth - padding
      } else {
        textX = bubbleX + bubbleWidth / 2
      }
      const lineText = new paper.PointText({
        point: [textX, textStartY + i * lineHeight],
        content: lines[i],
        fontSize: absFontSize,
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
