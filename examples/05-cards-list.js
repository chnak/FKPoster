/**
 * 卡片和列表测试
 * Card, ListItem, StatCard
 */
const {
  PosterBuilder,
  TextElement,
  Card,
  ListItem,
  StatCard,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 800,
    backgroundColor: '#16213e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 40, text: '卡片与列表测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Card
  layer.addElement(new Card({
    x: 200, y: 130, width: 240, height: 150,
    title: '产品特性特性介绍',
    subtitle: '快速、简单、易用，让开发更高效，而且功能丰富全面',
    backgroundColor: '#1f4068', radius: 12, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Card({
    x: 550, y: 130, width: 240, height: 150,
    title: '为什么选择我们选择我们的理由',
    subtitle: '专业团队，品质保障，值得信赖，服务周到贴心',
    backgroundColor: '#e94560', radius: 12, anchor: [0.5, 0.5]
  }))

  // StatCard
  layer.addElement(new StatCard({
    x: 200, y: 340, width: 160, height: 100,
    label: '总用户', value: '10,000+', color: '#00d9ff', anchor: [0.5, 0.5]
  }))

  layer.addElement(new StatCard({
    x: 400, y: 340, width: 160, height: 100,
    label: '月活用户', value: '5,000+', color: '#e94560', anchor: [0.5, 0.5]
  }))

  layer.addElement(new StatCard({
    x: 600, y: 340, width: 160, height: 100,
    label: '总收入', value: '¥100万', color: '#533483', anchor: [0.5, 0.5]
  }))

  // ListItem
  layer.addElement(new ListItem({
    x: 400, y: 500, width: 500, height: 60,
    title: '列表项标题', subtitle: '这是描述文本',
    backgroundColor: '#0f3460', anchor: [0.5, 0.5]
  }))

  layer.addElement(new ListItem({
    x: 400, y: 580, width: 500, height: 60,
    title: '另一个列表项', subtitle: '更多描述信息',
    backgroundColor: '#1f4068', anchor: [0.5, 0.5]
  }))

  layer.addElement(new ListItem({
    x: 400, y: 660, width: 500, height: 60,
    title: '最后一个', subtitle: '结束',
    backgroundColor: '#e94560', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('05-cards-list', '../output')
  poster.destroy()
  console.log('Cards and list test saved to output/05-cards-list.png')
}

main().catch(console.error)