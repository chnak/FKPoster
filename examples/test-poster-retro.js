/**
 * 测试海报 - 复古风格
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Badge,
  Button,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 450,
    height: 650,
    backgroundColor: '#f4e4c1'
  })

  const padding = 30
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 复古纹理条纹
  for (let i = 0; i < 8; i++) {
    const stripe = new RectElement({
      x: i * 60 - 30, y: 0, width: 30, height: 650,
      fillColor: i % 2 === 0 ? '#f4e4c1' : '#e8d4a8'
    })
    layer.addElement(stripe)
  }

  // 顶部标签
  const badge = new Badge({
    x: 180, y: 30, text: 'EST. 1998',
    backgroundColor: '#8b4513', textColor: '#f4e4c1', padding: 6
  })
  layer.addElement(badge)

  // 装饰圆
  const circle1 = new CircleElement({
    x: 350, y: 80, radius: 50,
    fillColor: '#d4a574', opacity: 0.6
  })
  layer.addElement(circle1)

  // 主标题
  const title = new TextElement({
    x: padding + 10, y: 140, width: 380,
    text: '老北京',
    fontSize: 56, color: '#5c3317', fontWeight: 'bold'
  })
  layer.addElement(title)

  const subtitle = new TextElement({
    x: padding + 10, y: 210, width: 380,
    text: '传统美食文化节',
    fontSize: 28, color: '#8b4513'
  })
  layer.addElement(subtitle)

  // 分隔装饰
  const divider = new Divider({
    x: padding + 10, y: 260, width: 200, color: '#8b4513', thickness: 3
  })
  layer.addElement(divider)

  // 活动信息
  const info = [
    { text: '📅 2024年12月20日-25日', color: '#5c3317' },
    { text: '📍 北京前门大街', color: '#5c3317' },
    { text: '🎫 免费入场', color: '#c41e3a' },
  ]

  let y = 300
  for (const item of info) {
    const text = new TextElement({
      x: padding + 10, y: y, width: 380,
      text: item.text, fontSize: 16, color: item.color
    })
    layer.addElement(text)
    y += 45
  }

  // 介绍文字
  const desc = new TextElement({
    x: padding + 10, y: 420, width: 370,
    text: '品尝地道北京小吃，\n感受老北京传统文化。\n\n烤鸭、炸酱面、豆汁儿...\n应有尽有！',
    fontSize: 14, color: '#5c3317', lineHeight: 1.6
  })
  layer.addElement(desc)

  // 按钮
  const btn = new Button({
    x: padding + 10, y: 560, width: 370, height: 50,
    text: '查看详情 →', backgroundColor: '#c41e3a', textColor: '#f4e4c1',
    radius: 8
  })
  layer.addElement(btn)

  await poster.exportPNG('poster-retro', './output')
  console.log('Retro poster saved to output/poster-retro.png')
  poster.destroy()
}

main().catch(console.error)
