/**
 * 测试海报 - 活动宣传
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Badge,
  Button,
  Quote,
  Divider,
  Icon,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 700,
    backgroundColor: '#fef3c7'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰 - 右上角圆形
  const circle1 = new CircleElement({
    x: 400, y: -80, radius: 180,
    fillColor: '#f59e0b', opacity: 0.15
  })
  layer.addElement(circle1)

  // 左侧装饰条
  const sideBar = new RectElement({
    x: 0, y: 0, width: 8, height: 700,
    fillColor: '#f59e0b'
  })
  layer.addElement(sideBar)

  // 标签
  const badge = new Badge({
    x: padding, y: padding, text: '🔥 限时活动',
    backgroundColor: '#ef4444', textColor: '#ffffff', padding: 8
  })
  layer.addElement(badge)

  // 活动名称
  const title = new TextElement({
    x: padding, y: 100, width: 450,
    text: '2024 创新设计大会',
    fontSize: 38, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(title)

  // 副标题
  const subtitle = new TextElement({
    x: padding, y: 150, width: 450,
    text: '探索设计的无限可能',
    fontSize: 20, color: '#64748b'
  })
  layer.addElement(subtitle)

  // 分隔线
  const divider = new Divider({
    x: padding, y: 200, width: 100, color: '#f59e0b', thickness: 3
  })
  layer.addElement(divider)

  // 时间信息
  const timeInfo = new TextElement({
    x: padding, y: 230, width: 450,
    text: '📅 2024年12月15日 9:00 - 18:00',
    fontSize: 16, color: '#475569'
  })
  layer.addElement(timeInfo)

  const locationInfo = new TextElement({
    x: padding, y: 260, width: 450,
    text: '📍 北京·798艺术中心',
    fontSize: 16, color: '#475569'
  })
  layer.addElement(locationInfo)

  // 活动亮点
  const highlights = [
    '🎨 20+ 设计大咖分享',
    '🚀 创新工作坊实战',
    '🤝 1000+ 设计师Networking',
    '🎁 现场抽取 MacBook Pro',
  ]

  let hy = 320
  for (const h of highlights) {
    const highlight = new TextElement({
      x: padding, y: hy, width: 450,
      text: h, fontSize: 15, color: '#1e293b'
    })
    layer.addElement(highlight)
    hy += 40
  }

  // 引用
  const quote = new Quote({
    x: padding, y: 490, width: 452,
    text: '这是一次难得的学习和交流机会，不要错过！',
    author: '往届参会者评价',
    padding: 12, backgroundColor: '#fef9c3',
    textColor: '#854d0e', authorColor: '#a16207',
    borderColor: '#f59e0b'
  })
  layer.addElement(quote)

  // CTA 按钮
  const cta = new Button({
    x: padding, y: 620, width: 452, height: 50,
    text: '立即报名 →', backgroundColor: '#f59e0b', textColor: '#ffffff',
    radius: 25
  })
  layer.addElement(cta)

  await poster.exportPNG('poster-event', './output')
  console.log('Event poster saved to output/poster-event.png')
  poster.destroy()
}

main().catch(console.error)
