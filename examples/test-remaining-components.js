/**
 * 测试剩余的组件: Icon, FeatureGrid, ListItem, QRCode, Quote
 */
const {
  PosterBuilder,
  Icon,
  FeatureGrid,
  ListItem,
  QRCode,
  Quote,
  TextElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#f8fafc'
  })

  const padding = 20
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  let y = padding

  // Icon 图标
  const icon = new Icon({
    x: padding, y: y, name: 'star', size: 40, color: '#f59e0b'
  })
  layer.addElement(icon)
  y += 60

  const icon2 = new Icon({
    x: padding + 60, y: y - 50, name: 'heart', size: 40, color: '#ef4444'
  })
  layer.addElement(icon2)
  y += 60

  // FeatureGrid 特性网格
  const featureGrid = new FeatureGrid({
    x: padding, y: y, width: 400,
    items: [
      { title: '快速', description: '高性能处理', icon: '⚡' },
      { title: '安全', description: '数据加密保护', icon: '🔒' },
      { title: '稳定', description: '99.9% 可用性', icon: '✅' },
    ]
  })
  layer.addElement(featureGrid)
  y += 150

  // ListItem 列表项
  const listItem1 = new ListItem({
    x: padding, y: y, width: 300,
    title: '第一项', description: '这是描述文本'
  })
  layer.addElement(listItem1)
  y += 60

  const listItem2 = new ListItem({
    x: padding, y: y, width: 300,
    title: '第二项', description: '带有图标的列表项',
    icon: '✓', iconColor: '#10b981'
  })
  layer.addElement(listItem2)
  y += 80

  // QRCode 二维码
  const qrcode = new QRCode({
    x: padding, y: y, size: 120,
    value: 'https://example.com'
  })
  layer.addElement(qrcode)
  y += 150

  // Quote 引用块
  const quote = new Quote({
    x: padding, y: y, width: 350,
    text: '这是一段引用文字，用于测试引用组件是否正常工作。',
    author: '张三，产品经理',
    padding: 16,
    backgroundColor: '#f1f5f9',
    textColor: '#475569',
    authorColor: '#64748b'
  })
  layer.addElement(quote)

  await poster.exportPNG('remaining-components', './output')
  console.log('Remaining components test saved to output/remaining-components.png')
  poster.destroy()
}

main().catch(console.error)
