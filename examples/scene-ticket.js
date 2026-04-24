/**
 * 活动门票
 */
const {
  PosterBuilder,
  Card,
  QRCode,
  Divider,
  Badge,
  TextElement,
  CircleElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 900,
    backgroundColor: '#1e1e2e'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部装饰线
  const topLine = new CircleElement({
    x: 100, y: 60, radius: 8, fillColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(topLine)

  const topLine2 = new CircleElement({
    x: 500, y: 60, radius: 8, fillColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(topLine2)

  // 活动标签
  const eventBadge = new Badge({
    x: 300, y: 100, text: 'VIP 专场', backgroundColor: '#f59e0b',
    anchor: [0.5, 0.5]
  })
  layer.addElement(eventBadge)

  // 活动名称
  const eventName = new TextElement({
    x: 300, y: 170, text: '2024 开发者大会', fontSize: 36, fontFamily: 'Microsoft YaHei',
    color: '#ffffff', textAlign: 'center', fontWeight: 'bold',
    anchor: [0.5, 0.5]
  })
  layer.addElement(eventName)

  // 副标题
  const subtitle = new TextElement({
    x: 300, y: 220, text: '技术创新 · 趋势分享 · 实战交流', fontSize: 16, fontFamily: 'Microsoft YaHei',
    color: '#888888', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(subtitle)

  // 分隔线 - 左侧
  const divider1 = new Divider({
    x: 100, y: 280, width: 180, color: '#333344', thickness: 1,
    anchor: [0.5, 0.5]
  })
  layer.addElement(divider1)

  // 时间信息
  const timeCard = new Card({
    x: 170, y: 340, width: 240, height: 120,
    title: '活动时间', subtitle: '2024年6月15日 9:00-18:00',
    backgroundColor: '#2a2a3e', borderColor: '#333344', borderWidth: 1, radius: 12,
    padding: 16,
    anchor: [0.5, 0.5]
  })
  layer.addElement(timeCard)

  // 地点信息
  const locationCard = new Card({
    x: 430, y: 340, width: 240, height: 120,
    title: '活动地点', subtitle: '国际会议中心 A座',
    backgroundColor: '#2a2a3e', borderColor: '#333344', borderWidth: 1, radius: 12,
    padding: 16,
    anchor: [0.5, 0.5]
  })
  layer.addElement(locationCard)

  // 分隔线 - 右侧
  const divider2 = new Divider({
    x: 500, y: 280, width: 180, color: '#333344', thickness: 1,
    anchor: [0.5, 0.5]
  })
  layer.addElement(divider2)

  // 票务信息
  const ticketCard = new Card({
    x: 300, y: 520, width: 500, height: 100,
    title: '门票类型', subtitle: 'VIP 早鸟票（含午餐）',
    backgroundColor: '#2a2a3e', borderColor: '#3b82f6', borderWidth: 2, radius: 12,
    padding: 16,
    anchor: [0.5, 0.5]
  })
  layer.addElement(ticketCard)

  // 二维码
  const qrcode = new QRCode({
    x: 300, y: 680, value: 'TICKET-2024-0615-VIP-12345', size: 120,
    anchor: [0.5, 0.5]
  })
  layer.addElement(qrcode)

  // 票号
  const ticketNo = new TextElement({
    x: 300, y: 830, text: '票号: T20240615001', fontSize: 12, fontFamily: 'Arial',
    color: '#666666', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(ticketNo)

  // 底部虚线
  const bottomLine = new Divider({
    x: 300, y: 860, width: 400, color: '#333344', thickness: 2,
    anchor: [0.5, 0.5]
  })
  layer.addElement(bottomLine)

  await poster.exportPNG('event-ticket', './output')
  console.log('Event ticket saved to output/event-ticket.png')
  poster.destroy()
}

main().catch(console.error)
