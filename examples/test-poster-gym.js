/**
 * 健身房会员卡
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
    width: 420,
    height: 260,
    backgroundColor: '#1e293b'
  })

  const padding = 20
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰光效
  const glow = new CircleElement({
    x: 350, y: 130, radius: 180,
    fillColor: '#3b82f6', opacity: 0.15
  })
  layer.addElement(glow)

  // 顶部标签
  const vipBadge = new Badge({
    x: padding, y: padding, text: '⚡ VIP会员',
    backgroundColor: '#fbbf24', color: '#1e293b', padding: 6, radius: 4
  })
  layer.addElement(vipBadge)

  // 健身房名称
  const brand = new TextElement({
    x: padding, y: 65, width: 200,
    text: 'FITORIA',
    fontSize: 28, color: '#ffffff', fontWeight: 'bold', letterSpacing: 4
  })
  layer.addElement(brand)

  const brandSub = new TextElement({
    x: padding, y: 95, width: 200,
    text: 'FITNESS CLUB',
    fontSize: 10, color: '#64748b', letterSpacing: 6
  })
  layer.addElement(brandSub)

  // 会员信息
  const memberName = new TextElement({
    x: padding, y: 130, width: 200,
    text: '张伟',
    fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(memberName)

  const memberId = new TextElement({
    x: padding, y: 160, width: 200,
    text: '会员号：VIP-2024-8856',
    fontSize: 11, color: '#64748b'
  })
  layer.addElement(memberId)

  // 有效期
  const validText = new TextElement({
    x: padding, y: 185, width: 200,
    text: '有效期至：2025.12.31',
    fontSize: 11, color: '#64748b'
  })
  layer.addElement(validText)

  // 右侧信息卡
  const infoBox = new RectElement({
    x: 260, y: 40, width: 140, height: 180,
    fillColor: '#334155', radius: 12
  })
  layer.addElement(infoBox)

  // 剩余次数
  const timesTitle = new TextElement({
    x: 275, y: 60, width: 110, textAlign: 'center',
    text: '剩余次数',
    fontSize: 10, color: '#94a3b8'
  })
  layer.addElement(timesTitle)

  const timesValue = new TextElement({
    x: 275, y: 80, width: 110, textAlign: 'center',
    text: '∞',
    fontSize: 48, color: '#22c55e', fontWeight: 'bold'
  })
  layer.addElement(timesValue)

  const timesUnit = new TextElement({
    x: 275, y: 130, width: 110, textAlign: 'center',
    text: '不限次数',
    fontSize: 12, color: '#22c55e'
  })
  layer.addElement(timesUnit)

  // 分隔线
  const line = new RectElement({
    x: 280, y: 150, width: 100, height: 1,
    fillColor: '#475569'
  })
  layer.addElement(line)

  // 场馆
  const venueTitle = new TextElement({
    x: 275, y: 165, width: 110, textAlign: 'center',
    text: '适用场馆',
    fontSize: 10, color: '#94a3b8'
  })
  layer.addElement(venueTitle)

  const venueValue = new TextElement({
    x: 275, y: 185, width: 110, textAlign: 'center',
    text: '全城通用',
    fontSize: 14, color: '#ffffff'
  })
  layer.addElement(venueValue)

  // 二维码占位
  const qrPlaceholder = new RectElement({
    x: 25, y: 215, width: 30, height: 30,
    fillColor: '#ffffff', radius: 4
  })
  layer.addElement(qrPlaceholder)

  const qrText = new TextElement({
    x: 60, y: 220, width: 100,
    text: '扫描二维码\n查看会员详情',
    fontSize: 9, color: '#64748b', lineHeight: 1.4
  })
  layer.addElement(qrText)

  await poster.exportPNG('gym-member-card', './output')
  console.log('Gym member card saved to output/gym-member-card.png')
  poster.destroy()
}

main().catch(console.error)
