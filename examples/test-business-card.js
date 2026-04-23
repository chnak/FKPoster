/**
 * 测试海报 - 个人名片
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Avatar,
  Divider,
  Icon,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 600,
    backgroundColor: '#1e293b'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰圆
  const circle1 = new CircleElement({
    x: 320, y: -40, radius: 120,
    fillColor: '#3b82f6', opacity: 0.2
  })
  layer.addElement(circle1)

  // 头像
  const avatar = new Avatar({
    x: 400 / 2 - 50, y: padding + 20, size: 100,
    name: '李华', backgroundColor: '#3b82f6'
  })
  layer.addElement(avatar)

  // 姓名
  const name = new TextElement({
    x: 0, y: 190, width: 400, textAlign: 'center',
    text: '李华', fontSize: 32, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(name)

  // 职位
  const title = new TextElement({
    x: 0, y: 225, width: 400, textAlign: 'center',
    text: '高级产品设计师', fontSize: 16, color: '#94a3b8'
  })
  layer.addElement(title)

  // 分隔线
  const divider = new Divider({
    x: padding + 40, y: 270, width: 320, color: '#334155', thickness: 1
  })
  layer.addElement(divider)

  // 联系信息
  const info = [
    { icon: '📧', text: 'lihua@company.com' },
    { icon: '📱', text: '138-8888-8888' },
    { icon: '📍', text: '北京市朝阳区' },
    { icon: '🌐', text: 'www.lihua.design' },
  ]

  let y = 300
  for (const item of info) {
    const icon = new TextElement({
      x: padding + 40, y: y, width: 40,
      text: item.icon, fontSize: 18, color: '#64748b'
    })
    layer.addElement(icon)

    const text = new TextElement({
      x: padding + 80, y: y + 2, width: 260,
      text: item.text, fontSize: 14, color: '#e2e8f0'
    })
    layer.addElement(text)
    y += 45
  }

  // 分隔线
  const divider2 = new Divider({
    x: padding + 40, y: 490, width: 320, color: '#334155', thickness: 1
  })
  layer.addElement(divider2)

  // 社交媒体
  const socials = [
    { icon: '💼', text: 'LinkedIn' },
    { icon: '🐦', text: 'Twitter' },
    { icon: '📷', text: 'Instagram' },
  ]

  let sx = padding + 40
  for (const social of socials) {
    const sicon = new TextElement({
      x: sx, y: 515, width: 80,
      text: social.icon, fontSize: 16, color: '#64748b'
    })
    layer.addElement(sicon)

    const stext = new TextElement({
      x: sx, y: 535, width: 80,
      text: social.text, fontSize: 10, color: '#64748b', textAlign: 'center'
    })
    layer.addElement(stext)
    sx += 105
  }

  await poster.exportPNG('poster-business-card', './output')
  console.log('Business card saved to output/poster-business-card.png')
  poster.destroy()
}

main().catch(console.error)
