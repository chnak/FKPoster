/**
 * 测试海报 - 极简风格
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 700,
    backgroundColor: '#fafafa'
  })

  const padding = 40
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 大圆装饰
  const circle = new CircleElement({
    x: 350, y: 450, radius: 200,
    fillColor: '#f5f5f5'
  })
  layer.addElement(circle)

  // 小圆点装饰
  const dot1 = new CircleElement({
    x: 80, y: 150, radius: 8,
    fillColor: '#000000'
  })
  layer.addElement(dot1)

  const dot2 = new CircleElement({
    x: 100, y: 150, radius: 8,
    fillColor: '#000000'
  })
  layer.addElement(dot2)

  const dot3 = new CircleElement({
    x: 120, y: 150, radius: 8,
    fillColor: '#000000'
  })
  layer.addElement(dot3)

  // 标题
  const title = new TextElement({
    x: padding, y: 200, width: 420,
    text: 'LESS IS MORE',
    fontSize: 48, color: '#000000', fontWeight: 'bold'
  })
  layer.addElement(title)

  // 副标题
  const subtitle = new TextElement({
    x: padding, y: 260, width: 420,
    text: '简单，是终极的 sophistication',
    fontSize: 18, color: '#666666', fontStyle: 'italic'
  })
  layer.addElement(subtitle)

  // 分隔线
  const divider = new Divider({
    x: padding, y: 320, width: 60, color: '#000000', thickness: 2
  })
  layer.addElement(divider)

  // 内容
  const content = new TextElement({
    x: padding, y: 360, width: 380,
    text: '在这个信息爆炸的时代，我们追求的是简约而不简单。\n\n每一处留白，都是为了让重要的事物更加突出。\n\n每一个细节，都经过精心的打磨。',
    fontSize: 14, color: '#333333', lineHeight: 1.8
  })
  layer.addElement(content)

  // 底部信息
  const footer = new TextElement({
    x: padding, y: 600, width: 420,
    text: '© 2024 MINIMAL STUDIO',
    fontSize: 10, color: '#999999', letterSpacing: 3
  })
  layer.addElement(footer)

  await poster.exportPNG('poster-minimal', './output')
  console.log('Minimal poster saved to output/poster-minimal.png')
  poster.destroy()
}

main().catch(console.error)
