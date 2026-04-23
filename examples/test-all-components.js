/**
 * 测试所有组件
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CTA,
  Chart,
  Arrow,
  Barcode,
  Bubble,
  Card,
  Columns,
  Divider,
  Feature,
  FeatureGrid,
  Frame,
  Grid,
  HighlightText,
  Icon,
  ImageFrame,
  ListItem,
  Notification,
  ProgressCircle,
  QRCode,
  Ribbon,
  Seal,
  Star,
  Stepper,
  Table,
  TagCloud,
  Timeline,
  Watermark,
  Badge,
  Rating,
  Progress,
  Chip,
  Avatar,
  StatCard,
  Quote,
  Button,
  CircleElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 1200,
    backgroundColor: '#f8fafc'
  })

  const padding = 20
  const centerX = 400  // 画布中心 x 坐标
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  let y = padding

  // CTA 按钮
  const cta = new CTA({
    x: centerX, y: y, width: 200, height: 50,
    text: '立即购买', backgroundColor: '#3b82f6', textColor: '#ffffff'
  })
  layer.addElement(cta)
  y += 70

  // Chart 图表
  const chart = new Chart({
    x: centerX, y: y, width: 200, height: 120,
    data: [30, 50, 70, 40, 90], labels: ['A', 'B', 'C', 'D', 'E'],
    barColor: '#3b82f6'
  })
  layer.addElement(chart)
  y += 140

  // Arrow 箭头
  const arrow = new Arrow({
    x: centerX, y: y, width: 100, height: 40,
    direction: 'right', color: '#64748b'
  })
  layer.addElement(arrow)
  y += 60

  // Barcode 条形码
  const barcode = new Barcode({
    x: centerX, y: y, width: 200, height: 60,
    value: '123456789012', format: 'CODE128'
  })
  layer.addElement(barcode)
  y += 80

  // Badge 徽章
  const badge = new Badge({
    x: centerX, y: y, text: '新功能', backgroundColor: '#ef4444'
  })
  layer.addElement(badge)
  y += 50

  // Rating 评分
  const rating = new Rating({
    x: centerX, y: y, value: 4.5, maxValue: 5, size: 20
  })
  layer.addElement(rating)
  y += 50

  // Chip 标签
  const chip = new Chip({
    x: centerX, y: y, text: '热门', backgroundColor: '#e2e8f0'
  })
  layer.addElement(chip)
  y += 50

  // Avatar 头像
  const avatar = new Avatar({
    x: centerX, y: y, name: '张三', size: 60, backgroundColor: '#3b82f6'
  })
  layer.addElement(avatar)
  y += 80

  // StatCard 统计卡片
  const statCard = new StatCard({
    x: centerX, y: y, width: 200, height: 80,
    value: '1,234', label: '总用户', change: '+12%', positive: true
  })
  layer.addElement(statCard)
  y += 100

  // Progress 进度条
  const progress = new Progress({
    x: centerX, y: y, width: 200, height: 12,
    value: 75, trackColor: '#e2e8f0', fillColor: '#3b82f6'
  })
  layer.addElement(progress)
  y += 40

  // ProgressCircle 环形进度
  const progressCircle = new ProgressCircle({
    x: centerX, y: y, size: 80,
    value: 65, strokeWidth: 8, strokeColor: '#3b82f6'
  })
  layer.addElement(progressCircle)
  y += 100

  // Button 按钮
  const button = new Button({
    x: centerX, y: y, width: 120, height: 40,
    text: '点击', backgroundColor: '#10b981', textColor: '#ffffff'
  })
  layer.addElement(button)
  y += 60

  // CircleElement 圆形
  const circle = new CircleElement({
    x: centerX, y: y, radius: 30,
    fillColor: '#f59e0b'
  })
  layer.addElement(circle)
  y += 80

  // Star 星星
  const star = new Star({
    x: centerX, y: y, size: 40,
    fillColor: '#eab308', strokeColor: '#ca8a04'
  })
  layer.addElement(star)
  y += 60

  // Seal 印章
  const seal = new Seal({
    x: centerX, y: y, size: 60,
    text: '认证', color: '#ef4444'
  })
  layer.addElement(seal)
  y += 80

  // Ribbon 彩带
  const ribbon = new Ribbon({
    x: centerX, y: y, width: 150, text: '热销商品',
    backgroundColor: '#ef4444'
  })
  layer.addElement(ribbon)
  y += 60

  // Divider 分割线
  const divider = new Divider({
    x: centerX, y: y, width: 300,
    color: '#e2e8f0', thickness: 2
  })
  layer.addElement(divider)
  y += 30

  // Notification 通知
  const notification = new Notification({
    x: centerX, y: y, width: 250, title: '提示', message: '操作成功'
  })
  layer.addElement(notification)
  y += 80

  // Timeline 时间线
  const timeline = new Timeline({
    x: centerX, y: y, width: 300, height: 100,
    items: ['步骤1', '步骤2', '步骤3']
  })
  layer.addElement(timeline)
  y += 120

  // Table 表格
  const table = new Table({
    x: centerX, y: y, width: 300,
    headers: ['姓名', '年龄'],
    rows: [['张三', '25'], ['李四', '30']]
  })
  layer.addElement(table)
  y += 100

  // Feature 特性
  const feature = new Feature({
    x: centerX, y: y, width: 200,
    title: '快速', description: '高性能处理',
    icon: '⚡', iconColor: '#f59e0b'
  })
  layer.addElement(feature)
  y += 100

  // Stepper 步骤器
  const stepper = new Stepper({
    x: centerX, y: y, width: 300,
    steps: ['下单', '支付', '发货', '完成'], currentStep: 1
  })
  layer.addElement(stepper)
  y += 80

  // Bubble 气泡
  const bubble = new Bubble({
    x: centerX, y: y, width: 200, height: 60,
    text: '你好，这是气泡提示', backgroundColor: '#1e293b', textColor: '#ffffff'
  })
  layer.addElement(bubble)
  y += 80

  // ImageFrame 图片框架
  const imageFrame = new ImageFrame({
    x: centerX, y: y, width: 120, height: 120,
    radius: 12, borderColor: '#3b82f6', borderWidth: 3
  })
  layer.addElement(imageFrame)
  y += 140

  // Grid 网格
  const grid = new Grid({
    x: centerX, y: y, columns: 3, rows: 2,
    columnWidth: 60, rowHeight: 60, gap: 10
  })
  layer.addElement(grid)
  y += 150

  // Columns 列布局
  const columns = new Columns({
    x: centerX, y: y, widths: [100, 100], gap: 10
  })
  layer.addElement(columns)
  y += 100

  // HighlightText 高亮文字
  const highlightText = new HighlightText({
    x: centerX, y: y, width: 300,
    text: '重要文本', highlightColor: '#fef08a', textColor: '#1e293b'
  })
  layer.addElement(highlightText)
  y += 50

  // TagCloud 标签云
  const tagCloud = new TagCloud({
    x: centerX, y: y, width: 300,
    tags: ['JavaScript', 'Python', 'React', 'Vue', 'Node.js']
  })
  layer.addElement(tagCloud)
  y += 80

  // Watermark 水印
  const watermark = new Watermark({
    x: centerX, y: y, width: 300, height: 100,
    text: '机密', color: 'rgba(0,0,0,0.1)'
  })
  layer.addElement(watermark)
  y += 120

  // Frame 框架
  const frame = new Frame({
    x: centerX, y: y, width: 200, height: 100,
    borderColor: '#3b82f6', borderWidth: 2, radius: 8
  })
  layer.addElement(frame)
  y += 120

  // Card 卡片
  const card = new Card({
    x: centerX, y: y, width: 300, height: 150,
    title: '卡片标题', description: '这是卡片描述内容',
    backgroundColor: '#ffffff', borderRadius: 12
  })
  layer.addElement(card)

  await poster.exportPNG('all-components', './output')
  console.log('All components test saved to output/all-components.png')
  poster.destroy()
}

main().catch(console.error)
