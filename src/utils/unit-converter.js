/**
 * 单位转换工具
 * 支持百分比、vw、vh、rpx、px 等单位
 */

/**
 * 解析单位值
 * @param {string|number} value - 带单位的值或数字
 * @returns {{ value: number, unit: string }}
 */
function parseUnit(value) {
  if (typeof value === 'number') {
    return { value, unit: 'px' }
  }
  if (typeof value !== 'string') {
    return { value: 0, unit: 'px' }
  }

  // 匹配数值和单位
  const match = value.match(/^(-?\d+(?:\.\d+)?)\s*(%|vw|vh|vm|vmin|vmax|rpx|px)?$/)
  if (!match) {
    return { value: parseFloat(value) || 0, unit: 'px' }
  }
  return {
    value: parseFloat(match[1]),
    unit: match[2] || 'px'
  }
}

/**
 * 将值转换为像素
 * @param {string|number} value - 值
 * @param {Object} context - 上下文，包含 width 和 height
 * @param {string} dimension - 维度 'width' 或 'height'
 * @returns {number}
 */
function toPixels(value, context = {}, dimension = 'width') {
  const { width = 1920, height = 1080 } = context
  const { value: numValue, unit } = parseUnit(value)

  switch (unit) {
    case '%':
      // 百分比：x、width 基于宽度；y、height 基于高度
      if (dimension === 'y' || dimension === 'height') {
        return (numValue / 100) * height
      }
      return (numValue / 100) * width

    case 'vw':
      // 视口宽度百分比
      return (numValue / 100) * width

    case 'vh':
      // 视口高度百分比
      return (numValue / 100) * height

    case 'vm':
      // 视口最小边百分比
      return (numValue / 100) * Math.min(width, height)

    case 'vmin':
      // 视口最小边百分比
      return (numValue / 100) * Math.min(width, height)

    case 'vmax':
      // 视口最大边百分比
      return (numValue / 100) * Math.max(width, height)

    case 'rpx':
      // 响应式像素（基于 750 宽度）
      return (numValue / 750) * width

    case 'px':
    default:
      // 像素值
      return numValue
  }
}

/**
 * 将字体大小转换为像素
 * @param {string|number} fontSize - 字体大小
 * @param {Object} context - 上下文
 * @param {number} baseFontSize - 基准字体大小，默认 16
 * @returns {number}
 */
function toFontSizePixels(fontSize, context = {}, baseFontSize = 16) {
  const { width = 1920, height = 1080 } = context
  const { value: numValue, unit } = parseUnit(fontSize)

  switch (unit) {
    case '%':
      // 百分比相对于画布高度
      return (numValue / 100) * height

    case 'rpx':
      // 响应式像素
      return (numValue / 750) * width

    case 'vw':
      return (numValue / 100) * width

    case 'vh':
      return (numValue / 100) * height

    case 'vm':
    case 'vmin':
      return (numValue / 100) * Math.min(width, height)

    case 'vmax':
      return (numValue / 100) * Math.max(width, height)

    case 'px':
    default:
      return numValue
  }
}

/**
 * 根据锚点计算实际位置
 * @param {number} x - x 坐标
 * @param {number} y - y 坐标
 * @param {number} width - 元素宽度
 * @param {number} height - 元素高度
 * @param {Array} anchor - 锚点 [x, y]，默认 [0, 0]
 * @returns {{ x: number, y: number }}
 */
function calculatePosition(x, y, width, height, anchor = [0, 0]) {
  const anchorX = anchor[0] || 0
  const anchorY = anchor[1] || 0
  return {
    x: x - width * anchorX,
    y: y - height * anchorY
  }
}

module.exports = {
  parseUnit,
  toPixels,
  toFontSizePixels,
  calculatePosition
}
