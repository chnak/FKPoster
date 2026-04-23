/**
 * 测试海报 - 赛博朋克风格
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Divider,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 450,
    height: 700,
    backgroundColor: '#0a0a0f'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 霓虹光效背景
  const glow1 = new CircleElement({
    x: -50, y: 300, radius: 200,
    fillColor: '#ff006e', opacity: 0.15
  })
  layer.addElement(glow1)

  const glow2 = new CircleElement({
    x: 400, y: 100, radius: 150,
    fillColor: '#00f5ff', opacity: 0.12
  })
  layer.addElement(glow2)

  const glow3 = new CircleElement({
    x: 350, y: 600, radius: 180,
    fillColor: '#ffbe0b', opacity: 0.1
  })
  layer.addElement(glow3)

  // 网格线背景
  for (let i = 0; i < 20; i++) {
    const hLine = new RectElement({
      x: 0, y: i * 40, width: 450, height: 1,
      fillColor: '#1a1a2e', opacity: 0.5
    })
    layer.addElement(hLine)
  }

  // 顶部标签
  const badge = new Badge({
    x: padding, y: padding, text: '⚡ CYBER 2077',
    backgroundColor: '#ff006e', textColor: '#ffffff', padding: 6
  })
  layer.addElement(badge)

  // 主标题 - 霓虹效果
  const title = new TextElement({
    x: padding, y: 130, width: 400,
    text: '数字觉醒',
    fontSize: 52, color: '#00f5ff', fontWeight: 'bold'
  })
  layer.addElement(title)

  // 副标题
  const subtitle = new TextElement({
    x: padding, y: 200, width: 400,
    text: 'THE DIGITAL AWAKENING',
    fontSize: 14, color: '#ff006e', letterSpacing: 4
  })
  layer.addElement(subtitle)

  // 分隔线
  const divider = new Divider({
    x: padding, y: 250, width: 150, color: '#00f5ff', thickness: 2
  })
  layer.addElement(divider)

  // 信息面板
  const infoPanel = new RectElement({
    x: padding, y: 290, width: 400, height: 140,
    fillColor: '#1a1a2e', borderColor: '#00f5ff', borderWidth: 1, radius: 4
  })
  layer.addElement(infoPanel)

  // 活动信息
  const infoItems = [
    { label: 'DATE', value: '2024.12.31' },
    { label: 'LOCATION', value: 'Shanghai, China' },
    { label: 'STATUS', value: 'REGISTRATION OPEN' },
  ]

  let iy = 310
  for (const item of infoItems) {
    const label = new TextElement({
      x: padding + 15, y: iy, width: 120,
      text: item.label, fontSize: 10, color: '#666666'
    })
    layer.addElement(label)

    const value = new TextElement({
      x: padding + 140, y: iy, width: 250,
      text: item.value, fontSize: 14, color: '#00f5ff'
    })
    layer.addElement(value)
    iy += 38
  }

  // 描述
  const desc = new TextElement({
    x: padding, y: 470, width: 400,
    text: '探索元宇宙的无限可能\n在数字与现实的交界处\n一场前所未有的盛宴即将开启',
    fontSize: 15, color: '#e0e0e0', lineHeight: 1.8
  })
  layer.addElement(desc)

  // 底部装饰文字
  const footer = new TextElement({
    x: padding, y: 620, width: 400,
    text: '// LIMITED CAPACITY //',
    fontSize: 12, color: '#ff006e', letterSpacing: 2
  })
  layer.addElement(footer)

  // 装饰线
  const line1 = new RectElement({
    x: padding, y: 650, width: 400, height: 2,
    fillColor: '#ff006e'
  })
  layer.addElement(line1)

  const line2 = new RectElement({
    x: padding, y: 655, width: 300, height: 1,
    fillColor: '#00f5ff'
  })
  layer.addElement(line2)

  await poster.exportPNG('poster-cyberpunk', './output')
  console.log('Cyberpunk poster saved to output/poster-cyberpunk.png')
  poster.destroy()
}

main().catch(console.error)
