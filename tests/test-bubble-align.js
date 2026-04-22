/**
 * 测试 Bubble 组件 - 文字对齐
 */
const { PosterBuilder, Bubble } = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 400,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'test' })

  // 左对齐气泡 (带尾巴)
  layer.addElement(new Bubble({
    x: 50, y: 50,
    width: 200, height: 80,
    text: '左对齐气泡',
    fontSize: 18,
    backgroundColor: '#3b82f6', color: '#ffffff',
    tailDirection: 'bottom', tailPosition: 'left'
  }))

  // 居中对齐气泡
  layer.addElement(new Bubble({
    x: 250, y: 50,
    width: 200, height: 80,
    text: '居中对齐气泡内容',
    fontSize: 18,
    backgroundColor: '#22c55e', color: '#ffffff',
    tailDirection: 'top', tailPosition: 'center'
  }))

  // 右对齐气泡
  layer.addElement(new Bubble({
    x: 50, y: 160,
    width: 200, height: 80,
    text: '右对齐气泡内容',
    fontSize: 18,
    backgroundColor: '#f59e0b', color: '#000000',
    tailDirection: 'bottom', tailPosition: 'right'
  }))

  // 错误用法示例 - 缺少参数
  layer.addElement(new Bubble({
    x: 250, y: 160,
    width: 200, height: 80,
    text: '错误用法：缺少 tailDirection/tailPosition',
    fontSize: 18,
    backgroundColor: '#ef4444', color: '#ffffff'
  }))

  // 正确用法
  layer.addElement(new Bubble({
    x: 50, y: 270,
    width: 400, height: 80,
    text: '✅ 正确：带尾巴方向和对齐参数',
    fontSize: 18,
    backgroundColor: '#8b5cf6', color: '#ffffff',
    tailDirection: 'bottom', tailPosition: 'left'
  }))

  await poster.exportPNG('test-bubble-align', './output')
  poster.destroy()
}

main().catch(console.error)
