/**
 * 装饰边框组件 - 多种风格
 */
const { Component } = require('../core/Component')

class Frame extends Component {
  constructor(config = {}) {
    super({
      ...config,
      type: 'frame',
    })

    this.width = config.width || 400
    this.height = config.height || 300
    this.style = config.style || 'simple' // simple, double, dashed, dotted, corner, vintage, modern, floral
    this.color = config.color || '#000000'
    this.borderWidth = config.borderWidth || 2
    this.radius = config.radius || 0
    this.padding = config.padding || 0
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

    const effectiveX = absX + this.padding
    const effectiveY = absY + this.padding
    const effectiveWidth = this.width - this.padding * 2
    const effectiveHeight = this.height - this.padding * 2

    const strokeOpts = {
      strokeColor: new paper.Color(this.color),
      strokeWidth: this.borderWidth,
    }

    switch (this.style) {
      case 'simple':
        // 简单矩形
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          radius: this.radius,
          ...strokeOpts,
        }), paper)
        break

      case 'double':
        // 双线边框
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          radius: this.radius,
          ...strokeOpts,
        }), paper)
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX + 8, effectiveY + 8],
          size: [effectiveWidth - 16, effectiveHeight - 16],
          radius: this.radius,
          ...strokeOpts,
        }), paper)
        break

      case 'dashed':
        // 虚线边框
        const dashed = new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          radius: this.radius,
          ...strokeOpts,
        })
        dashed.dashArray = [10, 5]
        this._addItem(dashed, paper)
        break

      case 'dotted':
        // 点线边框
        const dotted = new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          radius: this.radius,
          strokeColor: new paper.Color(this.color),
          strokeWidth: this.borderWidth,
          dashArray: [2, 4],
        })
        this._addItem(dotted, paper)
        break

      case 'corner':
        // 四角装饰
        const cornerSize = Math.min(30, effectiveWidth / 4, effectiveHeight / 4)
        // 左上角
        this._addItem(new paper.Path.Line(
          [effectiveX, effectiveY + cornerSize],
          [effectiveX, effectiveY],
          { ...strokeOpts }
        ), paper)
        this._addItem(new paper.Path.Line(
          [effectiveX, effectiveY],
          [effectiveX + cornerSize, effectiveY],
          { ...strokeOpts }
        ), paper)
        // 右上角
        this._addItem(new paper.Path.Line(
          [effectiveX + effectiveWidth - cornerSize, effectiveY],
          [effectiveX + effectiveWidth, effectiveY],
          { ...strokeOpts }
        ), paper)
        this._addItem(new paper.Path.Line(
          [effectiveX + effectiveWidth, effectiveY],
          [effectiveX + effectiveWidth, effectiveY + cornerSize],
          { ...strokeOpts }
        ), paper)
        // 左下角
        this._addItem(new paper.Path.Line(
          [effectiveX, effectiveY + effectiveHeight - cornerSize],
          [effectiveX, effectiveY + effectiveHeight],
          { ...strokeOpts }
        ), paper)
        this._addItem(new paper.Path.Line(
          [effectiveX, effectiveY + effectiveHeight],
          [effectiveX + cornerSize, effectiveY + effectiveHeight],
          { ...strokeOpts }
        ), paper)
        // 右下角
        this._addItem(new paper.Path.Line(
          [effectiveX + effectiveWidth - cornerSize, effectiveY + effectiveHeight],
          [effectiveX + effectiveWidth, effectiveY + effectiveHeight],
          { ...strokeOpts }
        ), paper)
        this._addItem(new paper.Path.Line(
          [effectiveX + effectiveWidth, effectiveY + effectiveHeight - cornerSize],
          [effectiveX + effectiveWidth, effectiveY + effectiveHeight],
          { ...strokeOpts }
        ), paper)
        break

      case 'vintage':
        // 复古边框 - 双线+角装饰
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          ...strokeOpts,
        }), paper)
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX + 6, effectiveY + 6],
          size: [effectiveWidth - 12, effectiveHeight - 12],
          ...strokeOpts,
        }), paper)
        // 四角小方块
        const cornerBlockSize = 8
        const corners = [
          [effectiveX, effectiveY],
          [effectiveX + effectiveWidth - cornerBlockSize, effectiveY],
          [effectiveX, effectiveY + effectiveHeight - cornerBlockSize],
          [effectiveX + effectiveWidth - cornerBlockSize, effectiveY + effectiveHeight - cornerBlockSize],
        ]
        corners.forEach(([cx, cy]) => {
          this._addItem(new paper.Path.Rectangle({
            point: [cx, cy],
            size: [cornerBlockSize, cornerBlockSize],
            fillColor: new paper.Color(this.color),
          }), paper)
        })
        break

      case 'modern':
        // 现代边框 - 粗细交替
        const modernPath = new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          radius: this.radius,
          ...strokeOpts,
        })
        modernPath.dashArray = [20, 5, 5, 5]
        this._addItem(modernPath, paper)
        break

      case 'floral':
        // 花纹边框 - 角装饰+边线
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          ...strokeOpts,
        }), paper)
        // 四个角的花纹
        const fCornerSize = Math.min(25, effectiveWidth / 6, effectiveHeight / 6)
        const fCorners = [
          { x: effectiveX, y: effectiveY, rotation: 0 },
          { x: effectiveX + effectiveWidth - fCornerSize, y: effectiveY, rotation: 90 },
          { x: effectiveX, y: effectiveY + effectiveHeight - fCornerSize, rotation: 270 },
          { x: effectiveX + effectiveWidth - fCornerSize, y: effectiveY + effectiveHeight - fCornerSize, rotation: 180 },
        ]
        fCorners.forEach(({ x: fx, y: fy, rotation }) => {
          const ornament = new paper.Path()
          ornament.add(new paper.Point(fx + fCornerSize / 2, fy + fCornerSize))
          ornament.add(new paper.Point(fx + fCornerSize, fy + fCornerSize / 2))
          ornament.add(new paper.Point(fx + fCornerSize, fy + fCornerSize))
          ornament.strokeColor = new paper.Color(this.color)
          ornament.strokeWidth = this.borderWidth
          ornament.rotate(rotation, new paper.Point(fx + fCornerSize, fy + fCornerSize))
          this._addItem(ornament, paper)
        })
        break

      default:
        this._addItem(new paper.Path.Rectangle({
          point: [effectiveX, effectiveY],
          size: [effectiveWidth, effectiveHeight],
          radius: this.radius,
          ...strokeOpts,
        }), paper)
    }
  }

  _addItem(item, paper) {
    if (paper.project && paper.project.activeLayer) {
      paper.project.activeLayer.addChild(item)
      this._pathElements.push(item)
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

module.exports = { Frame }
