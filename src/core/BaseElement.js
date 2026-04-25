/**
 * 基础元素类
 * 所有元素的基类，定义通用属性和方法
 *
 * 锚点 (anchor) 约定:
 * - [0, 0] = 元素左上角（默认）
 * - [0.5, 0.5] = 元素中心点
 * - [1, 1] = 元素右下角
 *
 * 定位说明:
 * - x, y 坐标表示锚点所在位置
 * - 默认 anchor: [0, 0]，即元素左上角对齐到 (x, y)
 * - 如需中心对齐，设置 anchor: [0.5, 0.5]
 */
const { toPixels, calculatePosition } = require('../utils/unit-converter')

class BaseElement {
  constructor(config = {}) {
    // 基础属性
    this.id = config.id || `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    this.type = config.type || 'base'

    // 位置（相对于父容器，支持百分比、vw、vh、rpx 等）
    this.x = config.x !== undefined ? config.x : 0
    this.y = config.y !== undefined ? config.y : 0

    // 尺寸
    this.width = config.width
    this.height = config.height

    // 锚点 [0-1, 0-1]，默认中心点 [0.5, 0.5]
    this.anchor = config.anchor !== undefined ? config.anchor : [0.5, 0.5]

    // 样式
    this.opacity = config.opacity !== undefined ? config.opacity : 1
    this.rotation = config.rotation || 0
    this.visible = config.visible !== undefined ? config.visible : true

    // 层级
    this.zIndex = config.zIndex !== undefined ? config.zIndex : 0

    // 缓存
    this._paperItem = null
    this._initialized = false
    this._paper = null
  }

  /**
   * 初始化元素（创建 Paper.js 项目）
   * @param {paper.PaperScope} paper - Paper.js 作用域
   */
  initialize(paper) {
    if (this._initialized) return
    this._paper = paper
    this._paperItem = this._createPaperItem(paper)
    this._initialized = true
  }

  /**
   * 创建 Paper.js 项目（子类重写）
   * @param {paper.PaperScope} paper
   */
  _createPaperItem(paper) {
    return null
  }

  /**
   * 渲染元素
   * @param {paper.PaperScope} paper
   * @param {Object} context - 渲染上下文
   */
  render(paper, context = {}) {
    if (!this.visible) return
    if (!this._initialized) this.initialize(paper)
    if (!this._paperItem) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 更新位置（支持百分比、vw、vh、rpx 等）
    const absoluteX = toPixels(this.x, context2d, 'x')
    const absoluteY = toPixels(this.y, context2d, 'y')

    // 应用锚点偏移
    const { x: posX, y: posY } = calculatePosition(
      absoluteX,
      absoluteY,
      this.width || 0,
      this.height || 0,
      this.anchor
    )

    this._paperItem.position = new paper.Point(posX, posY)
    this._paperItem.opacity = this.opacity
    this._paperItem.rotation = this.rotation
    this._paperItem.visible = this.visible
    this._paperItem.zIndex = this.zIndex || 0
  }

  /**
   * 解析值（兼容旧接口）
   * @param {string|number} value - 值
   * @param {number} reference - 参考值
   */
  _resolvePercent(value, reference) {
    return toPixels(value, { width: reference, height: reference })
  }

  /**
   * 测量文本尺寸
   * @returns {{width: number, height: number}}
   */
  _measureText() {
    if (!this._paperItem) return { width: 0, height: this.fontSize || 16 }
    const bounds = this._paperItem.bounds
    return {
      width: bounds.width,
      height: bounds.height
    }
  }

  /**
   * 获取元素的绝对位置
   */
  getAbsolutePosition(context) {
    const context2d = { width: context.width || 1920, height: context.height || 1080 }
    return {
      x: toPixels(this.x, context2d, 'x'),
      y: toPixels(this.y, context2d, 'y')
    }
  }

  /**
   * 销毁元素
   */
  destroy() {
    if (this._paperItem) {
      this._paperItem.remove()
      this._paperItem = null
    }
    this._initialized = false
  }
}

module.exports = { BaseElement }
