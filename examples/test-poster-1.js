/**
 * 测试海报 - 商业宣传
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Quote,
  Badge,
  Button,
  StatCard,
  ImageFrame,
  Icon,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 900,
    backgroundColor: '#0f172a'
  })

  const padding = 30
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部装饰圆
  const circle1 = new CircleElement({
    x: 450, y: -50, radius: 150,
    fillColor: '#3b82f6', opacity: 0.3
  })
  layer.addElement(circle1)

  const circle2 = new CircleElement({
    x: -30, y: 700, radius: 100,
    fillColor: '#8b5cf6', opacity: 0.2
  })
  layer.addElement(circle2)

  // Logo 区域
  const logo = new TextElement({
    x: padding, y: padding, width: 200,
    text: '✨ 智创科技',
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold'
  })
  layer.addElement(logo)

  // 标题
  const title = new TextElement({
    x: padding, y: 120, width: 540,
    text: '让创新触手可及',
    fontSize: 42,
    color: '#ffffff',
    fontWeight: 'bold'
  })
  layer.addElement(title)

  // 副标题
  const subtitle = new TextElement({
    x: padding, y: 175, width: 540,
    text: '一站式智能创作平台，助力企业数字化转型',
    fontSize: 18,
    color: '#94a3b8'
  })
  layer.addElement(subtitle)

  // 图片框
  const imgFrame = new ImageFrame({
    x: padding, y: 220, width: 540, height: 300,
    radius: 16, borderColor: '#3b82f6', borderWidth: 4,
    overlayColor: 'rgba(0,0,0,0.3)',
    src: 'file:///D:/code/FKPoster/output/columns-example.png'
  })
  layer.addElement(imgFrame)

  // 统计数据
  const stat1 = new StatCard({
    x: padding, y: 550, width: 165, height: 90,
    value: '10K+', label: '活跃用户', change: '+25%', positive: true,
    backgroundColor: '#1e293b', textColor: '#ffffff'
  })
  layer.addElement(stat1)

  const stat2 = new StatCard({
    x: padding + 180, y: 550, width: 165, height: 90,
    value: '99.9%', label: '服务可用', change: '+0.5%', positive: true,
    backgroundColor: '#1e293b', textColor: '#ffffff'
  })
  layer.addElement(stat2)

  const stat3 = new StatCard({
    x: padding + 360, y: 550, width: 165, height: 90,
    value: '50ms', label: '平均延迟', change: '-30%', positive: true,
    backgroundColor: '#1e293b', textColor: '#ffffff'
  })
  layer.addElement(stat3)

  // 引用
  const quote = new Quote({
    x: padding, y: 670, width: 540,
    text: '这个平台极大地提升了我们的工作效率，让创意变成现实。',
    author: '— 张明，产品总监',
    padding: 16, backgroundColor: '#1e293b',
    textColor: '#e2e8f0', authorColor: '#94a3b8'
  })
  layer.addElement(quote)

  // CTA 按钮
  const cta = new Button({
    x: padding, y: 800, width: 540, height: 56,
    text: '立即免费试用 →', backgroundColor: '#3b82f6', textColor: '#ffffff',
    radius: 12
  })
  layer.addElement(cta)

  await poster.exportPNG('poster-business', './output')
  console.log('Business poster saved to output/poster-business.png')
  poster.destroy()
}

main().catch(console.error)
