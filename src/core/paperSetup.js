/**
 * Paper.js Node.js 环境初始化
 */

const paper = require('@chnak/paper')

// 解决 jsdom 与 @napi-rs/canvas 的冲突
// 在 paper.document 上 hook createElement，这样 paper.js 内部也会使用这个 hook
if (paper.document && paper.document.createElement) {
  const { Canvas } = require('canvas')
  const originalCreateElement = paper.document.createElement.bind(paper.document)
  paper.document.createElement = function(tagName) {
    if (tagName === 'canvas') {
      // 创建 jsdom wrapper，有 DOM 方法
      var wrapper = originalCreateElement('canvas')
      // 创建 @napi-rs/canvas 作为 backend
      var nativeCanvas = new Canvas(1, 1)
      // 保存 native canvas 的引用
      wrapper._canvas = nativeCanvas
      // Override getContext 使用 @napi-rs/canvas
      var originalGetContext = wrapper.getContext.bind(wrapper)
      wrapper.getContext = function(contextType) {
        if (contextType === '2d') {
          return nativeCanvas.getContext(contextType)
        }
        return originalGetContext(contextType)
      }
      return wrapper
    }
    return originalCreateElement(tagName)
  }
}

let initialized = false
let paperScope = null

function setupPaper(width, height) {
  if (initialized && paperScope) {
    return paperScope
  }

  // 让 paper.js 自己创建 canvas（会使用 hook 过的 createElement）
  paper.setup()
  paperScope = paper
  initialized = true

  return paper
}

function getPaper() {
  if (!initialized) {
    throw new Error('Paper.js 未初始化，请先调用 setupPaper(width, height)')
  }
  return paperScope
}

module.exports = { setupPaper, getPaper }
