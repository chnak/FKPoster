/**
 * 特性网格组件
 */
const { Component } = require('../core/Component')
const { Feature } = require('./Feature')

class FeatureGrid extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'featureGrid',
    })

    this.columns = config.columns || 3
    this.itemWidth = config.itemWidth || 200
    this.itemHeight = config.itemHeight || 120
    this.gap = config.gap || 20
    this.padding = config.padding || 15
    this.items = config.items || []
    this.backgroundColor = config.backgroundColor || '#2d2d3a'
    this.borderColor = config.borderColor || '#404050'
    this.radius = config.radius || 8
    this.fontFamily = config.fontFamily
  }

  initialize(paper) {
    this._paper = paper
    this._featureComponents = []
    this._bgElement = null
    this._pathElements = []
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)

    // 清理旧组件
    for (const comp of this._featureComponents) {
      comp.destroy()
    }
    this._featureComponents = []
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []

    if (!paper.project || !paper.project.activeLayer) return

    // 计算网格总尺寸
    const rows = Math.ceil(this.items.length / this.columns)
    const totalWidth = this.columns * this.itemWidth + (this.columns - 1) * this.gap + this.padding * 2
    const totalHeight = rows * this.itemHeight + (rows - 1) * this.gap + this.padding * 2

    // 绘制背景
    if (this.backgroundColor) {
      const bg = new paper.Path.Rectangle({
        point: [absX, absY],
        size: [totalWidth, totalHeight],
        radius: this.radius,
        fillColor: new paper.Color(this.backgroundColor),
        strokeColor: this.borderColor ? new paper.Color(this.borderColor) : null,
        strokeWidth: this.borderColor ? 1 : 0,
      })
      paper.project.activeLayer.addChild(bg)
      this._pathElements.push(bg)
    }

    // 绘制每个 item
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i]
      const col = i % this.columns
      const row = Math.floor(i / this.columns)

      const itemX = absX + this.padding + col * (this.itemWidth + this.gap)
      const itemY = absY + this.padding + row * (this.itemHeight + this.gap)

      // 创建特性组件
      const feature = new Feature({
        x: itemX,
        y: itemY,
        width: this.itemWidth,
        height: this.itemHeight,
        icon: item.icon,
        title: item.title,
        description: item.description,
        iconColor: item.iconColor,
        titleColor: item.titleColor,
        descColor: item.descColor,
        iconSize: item.iconSize || 28,
        titleSize: item.titleSize || 16,
        descSize: item.descSize || 12,
        backgroundColor: 'transparent',
        borderColor: null,
        radius: 0,
        padding: 12,
        fontFamily: this.fontFamily,
        opacity: this.opacity,
      })

      feature.initialize(paper)
      feature.render(paper, context)
      this._featureComponents.push(feature)
    }
  }

  destroy() {
    for (const comp of this._featureComponents) {
      comp.destroy()
    }
    this._featureComponents = []
    for (const el of this._pathElements) {
      if (el.parent) el.remove()
    }
    this._pathElements = []
    super.destroy()
  }
}

module.exports = { FeatureGrid }
