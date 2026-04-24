/**
 * 测试基础元素
 * RectElement, CircleElement, TextElement, ImageElement
 */
const {
  PosterBuilder,
  RectElement,
  CircleElement,
  TextElement,
  ImageElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 500,
    backgroundColor: '#f8fafc'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })
  const cx = 400
  let y = 40

  // TextElement 文本元素
  const text1 = new TextElement({
    x: cx, y: y, text: '标题文字', fontSize: 32, fontFamily: 'Microsoft YaHei',
    color: '#1e293b', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(text1)
  y += 60

  const text2 = new TextElement({
    x: cx, y: y, text: '这是一段较长的描述文字，用于测试文本元素的换行功能。',
    fontSize: 18, fontFamily: 'Microsoft YaHei',
    color: '#64748b', textAlign: 'left', maxWidth: 350,
    anchor: [0.5, 0.5]
  })
  layer.addElement(text2)
  y += 80

  // RectElement 矩形元素
  const rect = new RectElement({
    x: cx, y: y, width: 200, height: 80,
    fillColor: '#3b82f6', borderColor: '#2563eb', borderWidth: 2, borderRadius: 12,
    anchor: [0.5, 0.5]
  })
  layer.addElement(rect)
  y += 120

  // CircleElement 圆形元素
  const circle1 = new CircleElement({
    x: 200, y: y, radius: 40,
    fillColor: '#ef4444', strokeColor: '#dc2626', strokeWidth: 3,
    anchor: [0.5, 0.5]
  })
  layer.addElement(circle1)

  const circle2 = new CircleElement({
    x: cx, y: y, radius: 40,
    fillColor: '#22c55e', strokeColor: '#16a34a', strokeWidth: 3,
    anchor: [0.5, 0.5]
  })
  layer.addElement(circle2)

  const circle3 = new CircleElement({
    x: 600, y: y, radius: 40,
    fillColor: '#f59e0b', strokeColor: '#d97706', strokeWidth: 3,
    anchor: [0.5, 0.5]
  })
  layer.addElement(circle3)
  y += 100

  // 带文字的圆形
  const textCircle = new CircleElement({
    x: cx, y: y, radius: 50,
    fillColor: '#8b5cf6', strokeColor: '#7c3aed', strokeWidth: 2,
    anchor: [0.5, 0.5]
  })
  layer.addElement(textCircle)

  const circleText = new TextElement({
    x: cx, y: y, text: 'A', fontSize: 36, fontFamily: 'Arial',
    color: '#ffffff', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(circleText)

  await poster.exportPNG('test-elements', './output')
  console.log('Elements test saved to output/test-elements.png')
  poster.destroy()
}

main().catch(console.error)
