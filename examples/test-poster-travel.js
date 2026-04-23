/**
 * 旅游明信片
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  ImageFrame,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 480,
    height: 320,
    backgroundColor: '#fef3e2'
  })

  const padding = 20
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰元素
  const circle1 = new CircleElement({
    x: 420, y: -20, radius: 80,
    fillColor: '#22c55e', opacity: 0.2
  })
  layer.addElement(circle1)

  const circle2 = new CircleElement({
    x: -30, y: 260, radius: 60,
    fillColor: '#22c55e', opacity: 0.15
  })
  layer.addElement(circle2)

  // 邮戳装饰
  const stamp = new CircleElement({
    x: 430, y: 40, radius: 30,
    fillColor: '#e94560', opacity: 0.8
  })
  layer.addElement(stamp)

  const stampText = new TextElement({
    x: 400, y: 38, width: 60,
    text: 'PAID',
    fontSize: 10, color: '#ffffff', fontWeight: 'bold', textAlign: 'center'
  })
  layer.addElement(stampText)

  // 明信片文字
  const greeting = new TextElement({
    x: padding, y: padding + 5, width: 200,
    text: '来自云南的问候',
    fontSize: 22, color: '#5c3317', fontWeight: 'bold'
  })
  layer.addElement(greeting)

  const dateText = new TextElement({
    x: padding, y: padding + 35, width: 200,
    text: '2024年12月20日',
    fontSize: 11, color: '#8b7355'
  })
  layer.addElement(dateText)

  // 分隔线
  const divider = new Divider({ x: padding, y: padding + 60, width: 150, color: '#d4a574', thickness: 1 })
  layer.addElement(divider)

  // 内容
  const content = new TextElement({
    x: padding, y: padding + 80, width: 180,
    text: '亲爱的朋友：\n\n希望你一切顺利！\n\n这里的天空湛蓝，\n空气清新，\n每天都让人心情愉悦。\n\n期待与你分享这里的美好！',
    fontSize: 13, color: '#5c3317', lineHeight: 1.8
  })
  layer.addElement(content)

  // 落款
  const signature = new TextElement({
    x: padding, y: 260, width: 180,
    text: '小明 · 于大理',
    fontSize: 12, color: '#8b7355'
  })
  layer.addElement(signature)

  // 图片区域
  const photoFrame = new ImageFrame({
    x: 250, y: 20, width: 210, height: 280,
    src: 'https://picsum.photos/400/500',
    borderColor: '#d4a574',
    borderWidth: 3,
    radius: 4,
    fit: 'cover'
  })
  layer.addElement(photoFrame)

  // 邮票标记
  const stampMark = new TextElement({
    x: 220, y: 10, width: 30,
    text: '📮',
    fontSize: 24
  })
  layer.addElement(stampMark)

  await poster.exportPNG('travel-postcard', './output')
  console.log('Travel postcard saved to output/travel-postcard.png')
  poster.destroy()
}

main().catch(console.error)
