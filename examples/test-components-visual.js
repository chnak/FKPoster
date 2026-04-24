/**
 * 测试视觉和图标组件
 * Feature, FeatureGrid, Timeline, Icon, ImageFrame, Barcode, QRCode, Seal, Ribbon, Divider, CTA, Arrow, Chart
 */
const {
  PosterBuilder,
  Feature,
  FeatureGrid,
  Timeline,
  Icon,
  ImageFrame,
  Barcode,
  QRCode,
  Seal,
  Ribbon,
  Divider,
  CTA,
  Arrow,
  Chart,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 1200,
    backgroundColor: '#f8fafc'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })
  const cx = 400
  let y = 40

  // CTA 按钮
  const cta = new CTA({
    x: cx, y: y, width: 200, height: 55,
    text: '立即购买', backgroundColor: '#3b82f6', textColor: '#ffffff',
    anchor: [0.5, 0.5]
  })
  layer.addElement(cta)
  y += 90

  // Chart 图表
  const chart = new Chart({
    x: cx, y: y, width: 280, height: 120,
    data: [65, 45, 80, 55, 90, 70],
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    barColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(chart)
  y += 160

  // Arrow 箭头
  const arrow = new Arrow({
    x: cx, y: y, width: 150, height: 40,
    direction: 'right', color: '#64748b',
    anchor: [0.5, 0.5]
  })
  layer.addElement(arrow)
  y += 70

  // Barcode 条形码
  const barcode = new Barcode({
    x: cx, y: y, width: 200, height: 60,
    value: '123456789012', format: 'CODE128',
    anchor: [0.5, 0.5]
  })
  layer.addElement(barcode)
  y += 100

  // QRCode 二维码
  const qrcode = new QRCode({
    x: cx, y: y, value: 'https://example.com', size: 100,
    anchor: [0.5, 0.5]
  })
  layer.addElement(qrcode)
  y += 130

  // ImageFrame 图片框架
  const imageFrame = new ImageFrame({
    x: cx, y: y, width: 120, height: 120,
    radius: 12, borderColor: '#3b82f6', borderWidth: 3,
    anchor: [0.5, 0.5]
  })
  layer.addElement(imageFrame)
  y += 150

  // Icon 图标
  const icon = new Icon({
    x: cx, y: y, icon: '★', size: 50, color: '#fbbf24',
    anchor: [0.5, 0.5]
  })
  layer.addElement(icon)
  y += 80

  // Seal 印章
  const seal = new Seal({
    x: cx, y: y, size: 60, text: '认证', color: '#ef4444',
    anchor: [0.5, 0.5]
  })
  layer.addElement(seal)
  y += 100

  // Ribbon 丝带
  const ribbon = new Ribbon({
    x: cx, y: y, width: 180, text: '热销商品',
    backgroundColor: '#ef4444',
    anchor: [0.5, 0.5]
  })
  layer.addElement(ribbon)
  y += 80

  // Divider 分割线
  const divider = new Divider({
    x: cx, y: y, width: 350, color: '#e2e8f0', thickness: 2,
    anchor: [0.5, 0.5]
  })
  layer.addElement(divider)
  y += 50

  // Timeline 时间线
  const timeline = new Timeline({
    x: cx, y: y, width: 280,
    items: [
      { title: '步骤一', date: '2024-01', active: true },
      { title: '步骤二', date: '2024-02', active: true },
      { title: '步骤三', date: '2024-03', active: false }
    ],
    anchor: [0.5, 0.5]
  })
  layer.addElement(timeline)
  y += 160

  // Feature 特性
  const feature = new Feature({
    x: cx, y: y, width: 200,
    title: '快速', description: '高性能处理能力',
    icon: '⚡', iconColor: '#f59e0b',
    anchor: [0.5, 0.5]
  })
  layer.addElement(feature)
  y += 150

  // FeatureGrid 特性网格
  const featureGrid = new FeatureGrid({
    x: cx, y: y, columns: 2, rows: 2,
    itemWidth: 150, itemHeight: 100, gap: 10, padding: 10,
    items: [
      { title: '特性1', icon: '★', description: '描述1' },
      { title: '特性2', icon: '◆', description: '描述2' },
      { title: '特性3', icon: '●', description: '描述3' },
      { title: '特性4', icon: '▲', description: '描述4' }
    ],
    anchor: [0.5, 0.5]
  })
  layer.addElement(featureGrid)

  await poster.exportPNG('test-visual-components', './output')
  console.log('Visual components test saved to output/test-visual-components.png')
  poster.destroy()
}

main().catch(console.error)
