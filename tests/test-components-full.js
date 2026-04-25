/**
 * FKPoster 全量组件测试
 * 测试所有组件的核心功能
 */
const { PosterBuilder, Layer, Component, BaseElement, RectElement, CircleElement, TextElement, ImageElement, DividerElement, Button, Badge, Card, CTA, Chip, Avatar, Divider, Progress, Rating, Quote, Timeline, Star, Feature, FeatureGrid, StatCard, ListItem, ProgressCircle, Notification, ImageFrame, Arrow, Bubble, Ribbon, Seal, Watermark, Icon, TagCloud, Stepper, Table, HighlightText, Grid, Columns, Barcode, QRCode, Frame, Chart } = require('../src/index')

async function test() {
  const tests = [
    // ========== 基础组件 ==========
    { name: '基础按钮', fn: t => testButton },
    { name: '徽章标签', fn: t => testBadge },
    { name: '卡片', fn: t => testCard },
    { name: 'CTA按钮', fn: t => testCTA },
    { name: '圆形按钮', fn: t => testChip },
    { name: '头像', fn: t => testAvatar },
    { name: '分割线', fn: t => testDivider },
    { name: '进度条', fn: t => testProgress },
    { name: '星级评分', fn: t => testRating },
    { name: '引用块', fn: t => testQuote },
    { name: '时间线', fn: t => testTimeline },
    { name: '星级', fn: t => testStar },
    { name: '特性卡片', fn: t => testFeature },
    { name: '特性网格', fn: t => testFeatureGrid },
    { name: '统计卡片', fn: t => testStatCard },
    { name: '列表项', fn: t => testListItem },
    { name: '圆形进度', fn: t => testProgressCircle },
    { name: '通知', fn: t => testNotification },
    { name: '图片框架', fn: t => testImageFrame },
    { name: '箭头', fn: t => testArrow },
    { name: '气泡-左对齐', fn: t => testBubbleLeft },
    { name: '气泡-居中', fn: t => testBubbleCenter },
    { name: '气泡-右对齐', fn: t => testBubbleRight },
    { name: '丝带', fn: t => testRibbon },
    { name: '印章', fn: t => testSeal },
    { name: '水印', fn: t => testWatermark },
    { name: '图标', fn: t => testIcon },
    { name: '标签云', fn: t => testTagCloud },
    { name: '步骤条', fn: t => testStepper },
    { name: '表格', fn: t => testTable },
    { name: '高亮文本', fn: t => testHighlightText },
    { name: '网格', fn: t => testGrid },
    { name: '多列', fn: t => testColumns },
    { name: '条形码', fn: t => testBarcode },
    { name: '二维码', fn: t => testQRCode },
    { name: '框架', fn: t => testFrame },
    { name: '图表', fn: t => testChart },
    { name: '基础元素-矩形', fn: t => testRectElement },
    { name: '基础元素-圆形', fn: t => testCircleElement },
    { name: '基础元素-文本', fn: t => testTextElement },
    { name: '基础元素-分割线', fn: t => testDividerElement },
  ]

  console.log('=== FKPoster 全量组件测试 ===\n')
  
  const outputDir = './output/components-full'
  require('fs').mkdirSync(outputDir, { recursive: true })
  
  let passed = 0, failed = 0
  
  for (const t of tests) {
    try {
      await t.fn(outputDir)
      console.log('✅', t.name)
      passed++
    } catch (e) {
      console.log('❌', t.name, '-', e.message)
      failed++
    }
  }
  
  console.log('\n通过:', passed, '/', tests.length)
  console.log('失败:', failed)
}

// ========== 组件测试函数 ==========

async function testButton(dir) {
  const p = new PosterBuilder({ width: 300, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Button({
    x: 50, y: 45,
    width: 200, height: 60,
    text: '基础按钮', fontSize: 20,
    backgroundColor: '#3b82f6', color: '#fff', radius: 8
  }))
  await p.exportPNG('01-Button', dir)
  p.destroy()
}

async function testBadge(dir) {
  const p = new PosterBuilder({ width: 300, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Badge({
    x: 50, y: 45,
    text: '徽章', fontSize: 18,
    backgroundColor: '#ef4444', color: '#fff', radius: 6
  }))
  await p.exportPNG('02-Badge', dir)
  p.destroy()
}

async function testCard(dir) {
  const p = new PosterBuilder({ width: 350, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Card({
    x: 50, y: 50,
    width: 250, height: 150,
    title: '卡片标题', titleSize: 24,
    subtitle: '副标题内容',
    backgroundColor: '#fff', radius: 12, padding: 20
  }))
  await p.exportPNG('03-Card', dir)
  p.destroy()
}

async function testCTA(dir) {
  const p = new PosterBuilder({ width: 300, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new CTA({
    x: 50, y: 45,
    width: 200, height: 60,
    text: '行动号召', fontSize: 20,
    backgroundColor: '#10b981', color: '#fff', radius: 8
  }))
  await p.exportPNG('04-CTA', dir)
  p.destroy()
}

async function testChip(dir) {
  const p = new PosterBuilder({ width: 300, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Chip({
    x: 50, y: 55,
    text: '标签', fontSize: 16,
    backgroundColor: '#e0e7ff', color: '#4338ca', radius: 20
  }))
  await p.exportPNG('05-Chip', dir)
  p.destroy()
}

async function testAvatar(dir) {
  const p = new PosterBuilder({ width: 200, height: 200, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Avatar({
    x: 60, y: 60, size: 80,
    initials: 'AB', backgroundColor: '#6366f1', fontSize: 32
  }))
  await p.exportPNG('06-Avatar', dir)
  p.destroy()
}

async function testDivider(dir) {
  const p = new PosterBuilder({ width: 400, height: 100, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Divider({
    x: 50, y: 50, width: 300, thickness: 2, color: '#e2e8f0'
  }))
  await p.exportPNG('07-Divider', dir)
  p.destroy()
}

async function testProgress(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Progress({
    x: 50, y: 65, width: 300, height: 20,
    value: 0.7, fillColor: '#3b82f6', trackColor: '#e2e8f0'
  }))
  await p.exportPNG('08-Progress', dir)
  p.destroy()
}

async function testRating(dir) {
  const p = new PosterBuilder({ width: 350, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Rating({
    x: 50, y: 65,
    value: 4.5, size: 28,
    filledColor: '#fbbf24', emptyColor: '#e2e8f0'
  }))
  await p.exportPNG('09-Rating', dir)
  p.destroy()
}

async function testQuote(dir) {
  const p = new PosterBuilder({ width: 400, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Quote({
    x: 50, y: 50,
    width: 300, height: 150,
    quote: '引用文本内容',
    fontSize: 18, backgroundColor: '#fff', padding: 25, radius: 12
  }))
  await p.exportPNG('10-Quote', dir)
  p.destroy()
}

async function testTimeline(dir) {
  const p = new PosterBuilder({ width: 400, height: 350, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Timeline({
    x: 50, y: 50, width: 300,
    items: [
      { text: '步骤一', time: '2024-01' },
      { text: '步骤二', time: '2024-02' },
      { text: '步骤三', time: '2024-03' }
    ],
    dotColor: '#3b82f6'
  }))
  await p.exportPNG('11-Timeline', dir)
  p.destroy()
}

async function testStar(dir) {
  const p = new PosterBuilder({ width: 300, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Star({
    x: 100, y: 45, size: 50,
    color: '#fbbf24', count: 5, filled: 3
  }))
  await p.exportPNG('12-Star', dir)
  p.destroy()
}

async function testFeature(dir) {
  const p = new PosterBuilder({ width: 350, height: 180, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Feature({
    x: 50, y: 40, width: 250, height: 100,
    icon: '🚀', title: '特性标题',
    description: '特性描述文本',
    backgroundColor: '#fff', radius: 10
  }))
  await p.exportPNG('13-Feature', dir)
  p.destroy()
}

async function testFeatureGrid(dir) {
  const p = new PosterBuilder({ width: 500, height: 280, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new FeatureGrid({
    x: 50, y: 40,
    columns: 2, itemWidth: 180, itemHeight: 80,
    items: [
      { icon: '🚀', title: '特性1', description: '描述1' },
      { icon: '💡', title: '特性2', description: '描述2' },
      { icon: '⚡', title: '特性3', description: '描述3' },
      { icon: '🎯', title: '特性4', description: '描述4' }
    ],
    backgroundColor: '#fff', radius: 10
  }))
  await p.exportPNG('14-FeatureGrid', dir)
  p.destroy()
}

async function testStatCard(dir) {
  const p = new PosterBuilder({ width: 350, height: 180, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new StatCard({
    x: 75, y: 40,
    width: 200, height: 100,
    label: '用户数', value: '1,234',
    change: '+23%', positive: true,
    icon: '👥', iconColor: '#3b82f6',
    backgroundColor: '#fff', radius: 10
  }))
  await p.exportPNG('15-StatCard', dir)
  p.destroy()
}

async function testListItem(dir) {
  const p = new PosterBuilder({ width: 400, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new ListItem({
    x: 50, y: 50, width: 300,
    icon: '📱', title: '列表项标题', description: '描述内容',
    badge: 'NEW', badgeColor: '#ef4444',
    backgroundColor: '#fff', radius: 8
  }))
  await p.exportPNG('16-ListItem', dir)
  p.destroy()
}

async function testProgressCircle(dir) {
  const p = new PosterBuilder({ width: 250, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new ProgressCircle({
    x: 75, y: 75, radius: 50,
    value: 0.75,
    strokeWidth: 10, fillColor: '#3b82f6', trackColor: '#e2e8f0',
    showLabel: true, labelColor: '#1e293b'
  }))
  await p.exportPNG('17-ProgressCircle', dir)
  p.destroy()
}

async function testNotification(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Notification({
    x: 50, y: 35, width: 300,
    type: 'success', title: '通知标题', message: '通知内容'
  }))
  await p.exportPNG('18-Notification', dir)
  p.destroy()
}

async function testImageFrame(dir) {
  const p = new PosterBuilder({ width: 350, height: 350, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new ImageFrame({
    x: 75, y: 75, width: 200, height: 200,
    style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 15
  }))
  await p.exportPNG('19-ImageFrame', dir)
  p.destroy()
}

async function testArrow(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Arrow({
    x: 100, y: 45, width: 200, height: 60,
    direction: 'right', color: '#3b82f6', strokeWidth: 3
  }))
  await p.exportPNG('20-Arrow', dir)
  p.destroy()
}

async function testBubbleLeft(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Bubble({
    x: 50, y: 35, width: 300, height: 80,
    text: '左对齐气泡', fontSize: 18,
    backgroundColor: '#3b82f6', color: '#fff',
    tailDirection: 'bottom', tailPosition: 'left'
  }))
  await p.exportPNG('21-Bubble-left', dir)
  p.destroy()
}

async function testBubbleCenter(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Bubble({
    x: 50, y: 35, width: 300, height: 80,
    text: '居中气泡', fontSize: 18,
    backgroundColor: '#22c55e', color: '#fff',
    tailDirection: 'top', tailPosition: 'center'
  }))
  await p.exportPNG('22-Bubble-center', dir)
  p.destroy()
}

async function testBubbleRight(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Bubble({
    x: 50, y: 35, width: 300, height: 80,
    text: '右对齐气泡', fontSize: 18,
    backgroundColor: '#f59e0b', color: '#000',
    tailDirection: 'bottom', tailPosition: 'right'
  }))
  await p.exportPNG('23-Bubble-right', dir)
  p.destroy()
}

async function testRibbon(dir) {
  const p = new PosterBuilder({ width: 400, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Ribbon({
    x: 100, y: 100, width: 200,
    text: '热卖标签', fontSize: 20,
    backgroundColor: '#ef4444', style: 'fold', color: '#fff'
  }))
  await p.exportPNG('24-Ribbon', dir)
  p.destroy()
}

async function testSeal(dir) {
  const p = new PosterBuilder({ width: 300, height: 300, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Seal({
    x: 100, y: 100, size: 100,
    text: '官方', fontSize: 18,
    color: '#ef4444', style: 'circle'
  }))
  await p.exportPNG('25-Seal', dir)
  p.destroy()
}

async function testWatermark(dir) {
  const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Watermark({
    x: 200, y: 150, text: '水印', fontSize: 48,
    color: 'rgba(0,0,0,0.1)', rotation: -30
  }))
  await p.exportPNG('26-Watermark', dir)
  p.destroy()
}

async function testIcon(dir) {
  const p = new PosterBuilder({ width: 200, height: 200, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Icon({
    x: 60, y: 60, size: 80,
    icon: '🚀', backgroundColor: '#fff', radius: 40
  }))
  await p.exportPNG('27-Icon', dir)
  p.destroy()
}

async function testTagCloud(dir) {
  const p = new PosterBuilder({ width: 400, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new TagCloud({
    x: 50, y: 50, maxWidth: 300,
    tags: [
      { text: '标签1', bgColor: '#3b82f6', color: '#fff' },
      { text: '标签2', bgColor: '#22c55e', color: '#fff' },
      { text: '标签3', bgColor: '#f59e0b', color: '#000' }
    ],
    fontSize: 16
  }))
  await p.exportPNG('28-TagCloud', dir)
  p.destroy()
}

async function testStepper(dir) {
  const p = new PosterBuilder({ width: 450, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Stepper({
    x: 50, y: 75, width: 350,
    steps: ['步骤1', '步骤2', '步骤3'],
    currentStep: 1, activeColor: '#3b82f6'
  }))
  await p.exportPNG('29-Stepper', dir)
  p.destroy()
}

async function testTable(dir) {
  const p = new PosterBuilder({ width: 500, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Table({
    x: 50, y: 50, width: 400,
    headers: ['列1', '列2', '列3'],
    rows: [
      ['数据1', '数据2', '数据3'],
      ['数据4', '数据5', '数据6']
    ],
    backgroundColor: '#fff', radius: 8
  }))
  await p.exportPNG('30-Table', dir)
  p.destroy()
}

async function testHighlightText(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new HighlightText({
    x: 50, y: 55, text: '高亮文本组件',
    highlightWords: ['高亮'],
    fontSize: 24, color: '#1e293b'
  }))
  await p.exportPNG('31-HighlightText', dir)
  p.destroy()
}

async function testGrid(dir) {
  const p = new PosterBuilder({ width: 400, height: 400, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Grid({
    x: 50, y: 50,
    columns: 3, rows: 3,
    itemWidth: 90, itemHeight: 90, gap: 10,
    backgroundColor: '#fff'
  }))
  await p.exportPNG('32-Grid', dir)
  p.destroy()
}

async function testColumns(dir) {
  const p = new PosterBuilder({ width: 400, height: 250, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Columns({
    x: 50, y: 75, width: 300,
    columns: 3, columnWidth: 90, gap: 10,
    items: ['列1', '列2', '列3'],
    backgroundColor: '#fff', radius: 8
  }))
  await p.exportPNG('33-Columns', dir)
  p.destroy()
}

async function testBarcode(dir) {
  const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Barcode({
    x: 100, y: 60,
    data: '123456789012', format: 'CODE128'
  }))
  await p.exportPNG('34-Barcode', dir)
  p.destroy()
}

async function testQRCode(dir) {
  const p = new PosterBuilder({ width: 400, height: 400, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new QRCode({
    x: 125, y: 125, size: 150,
    content: 'https://example.com'
  }))
  await p.exportPNG('35-QRCode', dir)
  p.destroy()
}

async function testFrame(dir) {
  const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Frame({
    x: 50, y: 50, width: 300, height: 200,
    style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 15
  }))
  await p.exportPNG('36-Frame', dir)
  p.destroy()
}

async function testChart(dir) {
  const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new Chart({
    x: 50, y: 50, width: 300, height: 200,
    chartType: 'bar',
    data: [
      { label: '一月', value: 100 },
      { label: '二月', value: 150 },
      { label: '三月', value: 120 }
    ],
    barColor: '#3b82f6'
  }))
  await p.exportPNG('37-Chart', dir)
  p.destroy()
}

async function testRectElement(dir) {
  const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new RectElement({
    x: 100, y: 50, width: 200, height: 100,
    fillColor: '#3b82f6', borderRadius: 10
  }))
  await p.exportPNG('38-RectElement', dir)
  p.destroy()
}

async function testCircleElement(dir) {
  const p = new PosterBuilder({ width: 300, height: 300, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new CircleElement({
    x: 100, y: 100, radius: 50,
    fillColor: '#22c55e'
  }))
  await p.exportPNG('39-CircleElement', dir)
  p.destroy()
}

async function testTextElement(dir) {
  const p = new PosterBuilder({ width: 400, height: 150, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new TextElement({
    x: 50, y: 55, text: '基础文本元素',
    fontSize: 28, color: '#1e293b', fontWeight: 'bold'
  }))
  await p.exportPNG('40-TextElement', dir)
  p.destroy()
}

async function testDividerElement(dir) {
  const p = new PosterBuilder({ width: 400, height: 100, backgroundColor: '#f5f5f5' })
  p.createLayer().addElement(new DividerElement({
    x: 50, y: 50, width: 300, thickness: 3, color: '#e2e8f0'
  }))
  await p.exportPNG('41-DividerElement', dir)
  p.destroy()
}

test().catch(console.error)
