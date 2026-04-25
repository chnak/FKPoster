/**
 * Quote 组件测试
 */
const { PosterBuilder, Quote } = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 400,
    backgroundColor: '#f0f0f0'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 短文本引用
  layer.addElement(new Quote({
    x: 200, y: 80,
    width: 300,
    text: '短引用文本',
    author: '作者A',
    backgroundColor: '#2d2d3a',
    borderColor: '#00d9ff',
    fontSize: 16,
    anchor: [0.5, 0.5]
  }))

  // 长文本引用（多行）
  layer.addElement(new Quote({
    x: 200, y: 200,
    width: 300,
    text: '这是一段比较长的引用文本，用于测试自动换行功能是否正常工作，文本应该能够自动适配组件宽度并分成多行显示',
    author: '作者B',
    backgroundColor: '#2d2d3a',
    borderColor: '#00d9ff',
    fontSize: 16,
    anchor: [0.5, 0.5]
  }))

  // 无作者引用
  layer.addElement(new Quote({
    x: 200, y: 320,
    width: 300,
    text: '没有作者的引用文本',
    backgroundColor: '#2d2d3a',
    borderColor: '#00d9ff',
    fontSize: 16,
    anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('quote-test', './output')
  poster.destroy()
  console.log('Quote test saved to output/quote-test.png')
}

main().catch(console.error)