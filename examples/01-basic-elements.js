/**
 * 基础元素测试
 * TextElement, RectElement, CircleElement, DividerElement, ImageElement
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  DividerElement,
  ImageElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  layer.addElement(new TextElement({
    x: 400, y: 50, text: '基础元素测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // RectElement - 默认 anchor [0.5, 0.5] 居中
  layer.addElement(new RectElement({
    x: 150, y: 150, width: 100, height: 60,
    fillColor: '#e94560', radius: 8, anchor: [0.5, 0.5]
  }))

  // CircleElement - 默认 anchor [0.5, 0.5] 居中
  layer.addElement(new CircleElement({
    x: 400, y: 150, radius: 40,
    fillColor: '#0f3460', strokeColor: '#e94560', strokeWidth: 3, anchor: [0.5, 0.5]
  }))

  // DividerElement - 默认 anchor [0.5, 0.5] 居中
  layer.addElement(new DividerElement({
    x: 400, y: 230, width: 300, thickness: 2,
    color: '#533483', anchor: [0.5, 0.5]
  }))

  // TextElement 示例
  layer.addElement(new TextElement({
    x: 400, y: 300, text: '居中文本', fontSize: 24,
    color: '#00d9ff', textAlign: 'center', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 650, y: 150, width: 120, height: 60,
    text: '带尺寸的文本框', fontSize: 16,
    color: '#ffffff', backgroundColor: '#16213e',
    textAlign: 'center', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('01-basic-elements', '../output')
  poster.destroy()
  console.log('Basic elements test saved to output/01-basic-elements.png')
}

main().catch(console.error)