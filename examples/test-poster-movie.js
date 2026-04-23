/**
 * 电影票
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Divider,
  QRCode,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 380,
    height: 620,
    backgroundColor: '#1a1a2e'
  })

  const padding = 20
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰光效
  const glow1 = new CircleElement({
    x: -30, y: 100, radius: 150,
    fillColor: '#e94560', opacity: 0.15
  })
  layer.addElement(glow1)

  const glow2 = new CircleElement({
    x: 350, y: 500, radius: 120,
    fillColor: '#0f3460', opacity: 0.2
  })
  layer.addElement(glow2)

  // 电影名称
  const title = new TextElement({
    x: padding, y: padding + 10, width: 340,
    text: '星际穿越',
    fontSize: 42, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(title)

  const titleEn = new TextElement({
    x: padding, y: padding + 60, width: 340,
    text: 'INTERSTELLAR',
    fontSize: 12, color: '#e94560', letterSpacing: 4
  })
  layer.addElement(titleEn)

  // 分隔线
  const line = new RectElement({
    x: padding, y: padding + 95, width: 80, height: 3,
    fillColor: '#e94560'
  })
  layer.addElement(line)

  // 电影信息
  const info1 = new TextElement({
    x: padding, y: 140, width: 170,
    text: 'IMAX 3D',
    fontSize: 18, color: '#e94560'
  })
  layer.addElement(info1)

  const info2 = new TextElement({
    x: padding + 190, y: 140, width: 170,
    text: '英语原声',
    fontSize: 14, color: '#888888'
  })
  layer.addElement(info2)

  // 影院信息
  const cinema = new TextElement({
    x: padding, y: 180, width: 340,
    text: '万达影城 · 海上世界店',
    fontSize: 14, color: '#666666'
  })
  layer.addElement(cinema)

  // 日期时间框
  const dateBox = new RectElement({
    x: padding, y: 220, width: 340, height: 100,
    fillColor: '#16213e', radius: 8
  })
  layer.addElement(dateBox)

  const dateText = new TextElement({
    x: padding + 20, y: 250, width: 300,
    text: '2024年12月25日 周三',
    fontSize: 20, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(dateText)

  const timeText = new TextElement({
    x: padding + 20, y: 290, width: 300,
    text: '14:30 - 16:52',
    fontSize: 28, color: '#e94560', fontWeight: 'bold'
  })
  layer.addElement(timeText)

  // 座位信息
  const seatBox = new RectElement({
    x: padding, y: 340, width: 160, height: 60,
    fillColor: '#16213e', radius: 6
  })
  layer.addElement(seatBox)

  const seatText = new TextElement({
    x: padding + 15, y: 358, width: 130,
    text: '座位',
    fontSize: 11, color: '#666666'
  })
  layer.addElement(seatText)

  const seatNum = new TextElement({
    x: padding + 15, y: 380, width: 130,
    text: '5排12座 · 5排13座',
    fontSize: 16, color: '#ffffff'
  })
  layer.addElement(seatNum)

  // 票号
  const ticketBox = new RectElement({
    x: padding + 180, y: 340, width: 160, height: 60,
    fillColor: '#16213e', radius: 6
  })
  layer.addElement(ticketBox)

  const ticketText = new TextElement({
    x: padding + 195, y: 358, width: 130,
    text: '票号',
    fontSize: 11, color: '#666666'
  })
  layer.addElement(ticketText)

  const ticketNum = new TextElement({
    x: padding + 195, y: 380, width: 130,
    text: '88235678901',
    fontSize: 14, color: '#ffffff'
  })
  layer.addElement(ticketNum)

  // 分隔线（锯齿效果）
  for (let i = 0; i < 38; i++) {
    const tooth = new CircleElement({
      x: padding + i * 10, y: 420, radius: 5,
      fillColor: '#1a1a2e'
    })
    layer.addElement(tooth)
  }

  // 底部信息
  const footer = new TextElement({
    x: padding, y: 450, width: 340,
    text: '请提前15分钟入场 | 副券撕下无效',
    fontSize: 11, color: '#666666', textAlign: 'center'
  })
  layer.addElement(footer)

  // 二维码
  const qr = new QRCode({
    x: padding + 90, y: 490, size: 120,
    value: 'https://ticket.example.com/t/88235678901',
    backgroundColor: '#ffffff'
  })
  layer.addElement(qr)

  const scanTip = new TextElement({
    x: padding, y: 620, width: 340, textAlign: 'center',
    text: '扫码取票 · 不支持退换',
    fontSize: 10, color: '#444444'
  })
  layer.addElement(scanTip)

  await poster.exportPNG('movie-ticket', './output')
  console.log('Movie ticket saved to output/movie-ticket.png')
  poster.destroy()
}

main().catch(console.error)