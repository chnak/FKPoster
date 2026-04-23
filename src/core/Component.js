/**
 * 组件类
 * 可复用的元素组合，支持相对坐标
 */
const { toPixels } = require('../utils/unit-converter')

class Component {
  constructor(config = {}) {
    this.id = config.id || `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    this.type = 'component'
    this.name = config.name || 'Component'

    // 组件尺寸
    this.width = config.width || 200
    this.height = config.height || 200

    // 位置
    this.x = config.x !== undefined ? config.x : '50%'
    this.y = config.y !== undefined ? config.y : '50%'

    // 样式
    this.opacity = config.opacity !== undefined ? config.opacity : 1
    this.visible = config.visible !== undefined ? config.visible : true
    this.zIndex = config.zIndex || 0

    // 元素列表
    this.elements = []

    // 背景
    this.backgroundColor = config.backgroundColor || config.background || null
    this._bgElement = null
  }

  addElement(element) {
    this.elements.push(element)
    return this
  }

  addText(config) {
    const { TextElement } = require('../elements/TextElement')
    return this.addElement(new TextElement(config))
  }

  addRect(config) {
    const { RectElement } = require('../elements/RectElement')
    return this.addElement(new RectElement(config))
  }

  addCircle(config) {
    const { CircleElement } = require('../elements/CircleElement')
    return this.addElement(new CircleElement(config))
  }

  addImage(config) {
    const { ImageElement } = require('../elements/ImageElement')
    return this.addElement(new ImageElement(config))
  }

  /**
   * 解析值（兼容旧接口）
   * @param {string|number} value - 值
   * @param {number} reference - 参考值
   */
  _resolvePercent(value, reference) {
    return toPixels(value, { width: reference, height: reference })
  }

  initialize(paper) {
    // 初始化子元素 - 设置正确的 zIndex
    for (const element of this.elements) {
      if (element.initialize) {
        // 子元素的 zIndex 应该基于组件的 zIndex
        if (element.zIndex !== undefined) {
          element.zIndex = (this.zIndex - 1) + element.zIndex
        } else {
          element.zIndex = (this.zIndex - 1)
        }
        element.initialize(paper)
      }
    }
    this._initialized = true
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 计算组件的绝对位置（支持百分比、vw、vh、rpx 等）
    const absX = toPixels(this.x, context2d, 'x')
    const absY = toPixels(this.y, context2d, 'y')

    // 计算组件的绝对尺寸
    const absWidth = toPixels(this.width, context2d, 'width')
    const absHeight = toPixels(this.height, context2d, 'height')

    // 渲染子元素 - 按 zIndex 从低到高排序
    const sortedElements = [...this.elements].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))

    for (const element of sortedElements) {
      if (!element.render) continue

      // 子元素位置是相对于组件的，转为绝对坐标
      // 注意：使用 _originalX/_originalY 保存原始相对坐标，避免被后续渲染修改
      if (element._originalX === undefined) {
        element._originalX = element.x
        element._originalY = element.y
      }

      const relX = element._originalX
      const relY = element._originalY

      // 子元素在自己的组件空间内计算
      const childContext = { width: absWidth, height: absHeight }
      const childX = toPixels(relX, childContext, 'x')
      const childY = toPixels(relY, childContext, 'y')
      const absoluteX = absX + childX
      const absoluteY = absY + childY

      // 临时修改子元素的坐标为绝对坐标进行渲染
      element.x = absoluteX
      element.y = absoluteY

      if (element._initialized) {
        element.render(paper, context)
        // 确保子元素的 zIndex 正确（在组件内部，子元素比背景层级高）
        if (element._paperItem) {
          element._paperItem.zIndex = element.zIndex
        }
      }

      // 恢复子元素的坐标为原始相对值
      element.x = relX
      element.y = relY
    }
  }

  getElements() {
    return this.elements
  }

  destroy() {
    for (const element of this.elements) {
      if (element.destroy) {
        element.destroy()
      }
    }
    this.elements = []
  }
}

module.exports = { Component }
