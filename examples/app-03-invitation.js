/**
 * 应用示例 - 邀请函
 * Invitation Card
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Divider,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 700,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰边框
  layer.addElement(new RectElement({
    x: 250, y: 350, width: 420, height: 620,
    fillColor: 'transparent',
    borderColor: '#d4af37',
    borderWidth: 2,
    anchor: [0.5, 0.5]
  }))

  // 顶部装饰
  layer.addElement(new RectElement({
    x: 250, y: 100, width: 200, height: 80,
    fillColor: '#d4af37',
    anchor: [0.5, 0.5]
  }))

  // 邀请函标题
  layer.addElement(new TextElement({
    x: 250, y: 100, text: '邀请函', fontSize: 32,
    color: '#1a1a2e', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 250, y: 220, width: 300, thickness: 1,
    color: '#d4af37', anchor: [0.5, 0.5]
  }))

  // 活动名称
  layer.addElement(new TextElement({
    x: 250, y: 280, text: '2026年度产品发布会', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 邀请语
  layer.addElement(new TextElement({
    x: 250, y: 350, text: '诚挚邀请您参加', fontSize: 16,
    color: '#a0a0a0', anchor: [0.5, 0.5]
  }))

  // 时间
  layer.addElement(new Badge({
    x: 250, y: 420, text: '2026年5月20日 14:00',
    backgroundColor: '#2a2a4e', color: '#d4af37',
    fontSize: 16, radius: 8, padding: 15
  }))

  // 地点
  layer.addElement(new TextElement({
    x: 250, y: 500, text: '北京国际会议中心', fontSize: 18,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 535, text: '北京市朝阳区天辰东路7号', fontSize: 14,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  // RSVP
  layer.addElement(new Divider({
    x: 250, y: 590, width: 200, thickness: 1,
    color: '#3a3a5e', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 620, text: '请回复: confirm@company.com', fontSize: 12,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-03-invitation', '../output')
  poster.destroy()
  console.log('Invitation saved to output/app-03-invitation.png')
}

main().catch(console.error)