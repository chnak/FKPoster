/**
 * 个人资料卡 / 名片
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Avatar,
  Divider,
  Chip,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 380,
    height: 560,
    backgroundColor: '#f8fafc'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部背景
  const topBg = new RectElement({
    x: 0, y: 0, width: 380, height: 200,
    fillColor: '#6366f1'
  })
  layer.addElement(topBg)

  // 装饰圆
  const decor1 = new CircleElement({
    x: 320, y: -40, radius: 100,
    fillColor: '#818cf8', opacity: 0.5
  })
  layer.addElement(decor1)

  const decor2 = new CircleElement({
    x: -50, y: 150, radius: 80,
    fillColor: '#818cf8', opacity: 0.3
  })
  layer.addElement(decor2)

  // 头像
  const avatar = new Avatar({
    x: 190, y: 140, size: 100,
    initials: '李',
    backgroundColor: '#a5b4fc',
    color: '#4338ca',
    borderColor: '#6366f1',
    borderWidth: 4
  })
  layer.addElement(avatar)

  // 姓名
  const name = new TextElement({
    x: 0, y: 260, width: 380, textAlign: 'center',
    text: '李明辉',
    fontSize: 28, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(name)

  // 职位
  const title = new TextElement({
    x: 0, y: 300, width: 380, textAlign: 'center',
    text: '高级前端开发工程师',
    fontSize: 14, color: '#64748b'
  })
  layer.addElement(title)

  // 公司
  const company = new TextElement({
    x: 0, y: 325, width: 380, textAlign: 'center',
    text: '深圳市科技有限公司',
    fontSize: 12, color: '#94a3b8'
  })
  layer.addElement(company)

  // 分隔线
  const divider = new Divider({ x: padding + 40, y: 365, width: 260, color: '#e2e8f0', thickness: 1 })
  layer.addElement(divider)

  // 联系信息
  const contacts = [
    { icon: '📱', label: '手机', value: '138-0013-8000' },
    { icon: '📧', label: '邮箱', value: 'liminghui@example.com' },
    { icon: '📍', label: '地址', value: '深圳市南山区科技园' },
  ]

  let cy = 380
  for (const c of contacts) {
    const icon = new TextElement({
      x: padding, y: cy, width: 30,
      text: c.icon, fontSize: 16
    })
    layer.addElement(icon)

    const label = new TextElement({
      x: padding + 40, y: cy, width: 60,
      text: c.label, fontSize: 12, color: '#94a3b8'
    })
    layer.addElement(label)

    const value = new TextElement({
      x: padding + 100, y: cy, width: 220,
      text: c.value, fontSize: 13, color: '#334155'
    })
    layer.addElement(value)

    cy += 30
  }

  // 底部技能标签 - 使用 Badge 组件（支持自动适配宽高）
  const skills = ['React', 'Vue', 'TypeScript', 'Node.js']
  const tagGap = 12
  const tagsPerRow = 2
  const tagH = 28
  const startY = 475

  // 计算每行标签的位置
  const tagPositions = [
    { x: 50, y: startY },
    { x: 50 + 76 + tagGap, y: startY },
    { x: 50, y: startY + tagH + 8 },
    { x: 50 + 76 + tagGap, y: startY + tagH + 8 },
  ]

  for (let i = 0; i < skills.length; i++) {
    const badge = new Badge({
      x: tagPositions[i].x,
      y: tagPositions[i].y,
      text: skills[i],
      fontSize: 12,
      color: '#4338ca',
      backgroundColor: '#e0e7ff',
      radius: 14,
      padding: 10
    })
    layer.addElement(badge)
  }

  await poster.exportPNG('profile-card', './output')
  console.log('Profile card saved to output/profile-card.png')
  poster.destroy()
}

main().catch(console.error)
