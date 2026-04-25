/**
 * 图片元素
 */
const { BaseElement } = require('../core/BaseElement')
const { toPixels } = require('../utils/unit-converter')

class ImageElement extends BaseElement {
  constructor(config = {}) {
    super({ ...config, type: 'image' })

    this.src = config.src || ''
    this.width = config.width || 200
    this.height = config.height || 200
    this.fit = config.fit || 'contain' // contain, cover, fill

    this._raster = null
  }

  async initialize(paper) {
    if (this._initialized) return

    if (this.src) {
      try {
        this._raster = new paper.Raster(this.src)
        await new Promise((resolve, reject) => {
          this._raster.onLoad = resolve
          this._raster.onError = reject
        })
      } catch (err) {
        console.warn(`[ImageElement] 加载图片失败: ${this.src}`, err)
      }
    }

    this._initialized = true
  }

  _createPaperItem(paper) {
    // 创建一个占位符
    const rect = new paper.Path.Rectangle({
      point: [0, 0],
      size: [this.width, this.height],
      fillColor: '#cccccc'
    })
    return rect
  }

  render(paper, context = {}) {
    if (!this.visible) return

    const context2d = { width: context.width || 1920, height: context.height || 1080 }

    // 处理百分比位置
    const x = toPixels(this.x, context2d, 'x')
    const y = toPixels(this.y, context2d, 'y')

    // 处理百分比尺寸
    const width = toPixels(this.width, context2d, 'width')
    const height = toPixels(this.height, context2d, 'height')

    // 支持 anchor 定位
    const anchorX = this.anchor ? this.anchor[0] : 0.5
    const anchorY = this.anchor ? this.anchor[1] : 0.5
    const posX = x - width * anchorX
    const posY = y - height * anchorY

    // 如果图片已加载
    if (this._raster && this._raster.loaded) {
      // 替换旧的占位符
      if (this._paperItem && !(this._paperItem instanceof paper.Raster)) {
        const oldItem = this._paperItem
        this._paperItem = this._raster
        // 彻底移除旧 item
        if (oldItem && oldItem.parent) {
          oldItem.remove()
        }
      }

      // 设置尺寸
      this._raster.bounds.width = width
      this._raster.bounds.height = height

      // 使用 bounds 定位
      this._raster.bounds.x = posX
      this._raster.bounds.y = posY

      // 应用样式
      this._raster.opacity = this.opacity
      this._raster.rotation = this.rotation
      this._raster.visible = this.visible
    } else if (this._paperItem) {
      // 更新占位符
      this._paperItem.bounds.width = width
      this._paperItem.bounds.height = height
      this._paperItem.bounds.x = posX
      this._paperItem.bounds.y = posY
      this._paperItem.opacity = this.opacity
      this._paperItem.rotation = this.rotation
      this._paperItem.visible = this.visible
    }
  }

  destroy() {
    if (this._raster) {
      this._raster.remove()
      this._raster = null
    }
    super.destroy()
  }
}

module.exports = { ImageElement }
