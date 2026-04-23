/**
 * 测试海报 - 自然清新风格
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
    width: 480,
    height: 720,
    backgroundColor: '#f0f7f4'
  })

  const padding = 32
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰圆形 - 代表自然元素
  const leaf1 = new CircleElement({
    x: 380, y: -30, radius: 120,
    fillColor: '#86efac', opacity: 0.4
  })
  layer.addElement(leaf1)

  const leaf2 = new CircleElement({
    x: -40, y: 550, radius: 150,
    fillColor: '#67e8f9', opacity: 0.3
  })
  layer.addElement(leaf2)

  const leaf3 = new CircleElement({
    x: 400, y: 600, radius: 100,
    fillColor: '#a7f3d0', opacity: 0.4
  })
  layer.addElement(leaf3)

  // 顶部标签
  const tag = new TextElement({
    x: padding, y: padding, width: 100,
    text: '🌿 有机生活',
    fontSize: 14, color: '#166534'
  })
  layer.addElement(tag)

  // 主标题
  const title = new TextElement({
    x: padding, y: 160, width: 416,
    text: '回归自然',
    fontSize: 52, color: '#166534', fontWeight: 'bold'
  })
  layer.addElement(title)

  const subtitle = new TextElement({
    x: padding, y: 225, width: 416,
    text: 'Embrace Nature',
    fontSize: 20, color: '#22c55e', fontStyle: 'italic'
  })
  layer.addElement(subtitle)

  // 装饰线
  const divider = new Divider({
    x: padding, y: 280, width: 80, color: '#22c55e', thickness: 3
  })
  layer.addElement(divider)

  // 内容
  const content = new TextElement({
    x: padding, y: 320, width: 416,
    text: '在繁忙的都市生活中，\n给自己一片宁静的自然空间。\n\n感受阳光、清风、花草的馈赠，\n让心灵去旅行。',
    fontSize: 16, color: '#374151', lineHeight: 2
  })
  layer.addElement(content)

  // 特点列表
  const features = [
    '🌱 100% 天然有机',
    '☀️ 阳光充沛的农场',
    '💧 纯净山泉水灌溉',
    '🌸 四季花香环绕',
  ]

  let fy = 460
  for (const f of features) {
    const feature = new TextElement({
      x: padding, y: fy, width: 416,
      text: f, fontSize: 14, color: '#166534'
    })
    layer.addElement(feature)
    fy += 40
  }

  // 底部信息
  const footer = new TextElement({
    x: padding, y: 640, width: 416,
    text: 'nature-farm.com',
    fontSize: 12, color: '#86efac', letterSpacing: 2
  })
  layer.addElement(footer)

  await poster.exportPNG('poster-nature', './output')
  console.log('Nature poster saved to output/poster-nature.png')
  poster.destroy()
}

main().catch(console.error)
