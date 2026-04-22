/**
 * 组件示例 V2 - 测试新移植的组件
 */
const { PosterBuilder, Button, Badge, Card, CTA, Chip, Avatar, Divider, Progress, Rating, Quote, Timeline, Star, Feature, FeatureGrid, StatCard, ListItem, ProgressCircle, Notification, ImageFrame, Arrow, Bubble, Ribbon, Seal, Watermark, Icon, TagCloud, Stepper, Table, HighlightText, Grid, Columns, Barcode, QRCode, Frame, TextElement } = require('../src/index')

async function main() {
  console.log('=== Poster Plugin V2 组件示例 V2 ===\n')

  const poster = new PosterBuilder({
    width: 1400,
    height: 1200,
    backgroundColor: '#0f0f1a'
  })

  const layer = poster.createLayer({ name: '组件测试', zIndex: 0 })

  // ========== 第1行 ==========
  let y = 50

  // StatCard 统计卡片
  layer.addElement(new TextElement({
    x: 50, y: y, text: '1. StatCard 统计卡片', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  y += 35

  layer.addElement(new StatCard({
    x: 50, y: y, width: 180, height: 100,
    label: '总收入', value: '¥12,580',
    change: '+23.5%', positive: true,
    icon: '💰', iconColor: '#22c55e',
    backgroundColor: '#1a1a2e'
  }))

  layer.addElement(new StatCard({
    x: 250, y: y, width: 180, height: 100,
    label: '用户数', value: '8,420',
    change: '+12.3%', positive: true,
    icon: '👥', iconColor: '#3b82f6',
    backgroundColor: '#1a1a2e'
  }))

  layer.addElement(new StatCard({
    x: 450, y: y, width: 180, height: 100,
    label: '订单数', value: '1,284',
    change: '-5.2%', positive: false,
    icon: '📦', iconColor: '#ef4444',
    backgroundColor: '#1a1a2e'
  }))

  // ========== 第2行 ==========
  y += 130

  layer.addElement(new TextElement({
    x: 50, y: y, text: '2. Notification 通知提示', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  y += 35

  layer.addElement(new Notification({
    x: 50, y: y, width: 280,
    type: 'success', title: '操作成功', message: '您的文件已保存到云端'
  }))

  layer.addElement(new Notification({
    x: 350, y: y, width: 280,
    type: 'warning', title: '注意', message: '您的订阅即将到期'
  }))

  // ========== 第3行 ==========
  y += 100

  layer.addElement(new TextElement({
    x: 50, y: y, text: '3. ListItem 列表项', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  y += 35

  layer.addElement(new ListItem({
    x: 50, y: y, width: 300,
    icon: '📱', title: 'iPhone 15 Pro', description: '最新款苹果手机', badge: '热卖', badgeColor: '#ef4444'
  }))

  y += 70

  layer.addElement(new ListItem({
    x: 50, y: y, width: 300,
    icon: '💻', title: 'MacBook Pro', description: '专业级笔记本电脑', badge: '新品'
  }))

  // ========== 第4行 ==========
  y += 120

  layer.addElement(new TextElement({
    x: 50, y: y, text: '4. ProgressCircle 圆形进度条', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  y += 35

  layer.addElement(new ProgressCircle({
    x: 100, y: y, radius: 50, value: 75, strokeWidth: 8,
    fillColor: '#22c55e', trackColor: '#2d2d3a', showLabel: true
  }))

  layer.addElement(new ProgressCircle({
    x: 250, y: y, radius: 50, value: 45, strokeWidth: 8,
    fillColor: '#f59e0b', trackColor: '#2d2d3a', showLabel: true
  }))

  layer.addElement(new ProgressCircle({
    x: 400, y: y, radius: 50, value: 90, strokeWidth: 8,
    fillColor: '#3b82f6', trackColor: '#2d2d3a', showLabel: true
  }))

  // ========== 右侧列 ==========
  let rightY = 50

  // FeatureGrid
  layer.addElement(new TextElement({
    x: 700, y: rightY, text: '5. FeatureGrid 特性网格', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  rightY += 35

  layer.addElement(new FeatureGrid({
    x: 700, y: rightY,
    columns: 2, itemWidth: 180, itemHeight: 100, gap: 15,
    items: [
      { icon: '🚀', title: '高性能', description: '秒级响应', iconColor: '#22c55e' },
      { icon: '🔒', title: '安全可靠', description: '数据加密', iconColor: '#3b82f6' },
      { icon: '☁️', title: '云同步', description: '跨设备同步', iconColor: '#8b5cf6' },
      { icon: '🎨', title: '精美UI', description: '现代化设计', iconColor: '#f59e0b' },
    ],
    backgroundColor: '#1a1a2e', borderColor: '#2d2d3a', radius: 12
  }))

  // Progress
  rightY += 260

  layer.addElement(new TextElement({
    x: 700, y: rightY, text: '6. Progress 进度条', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  rightY += 35

  layer.addElement(new Progress({
    x: 700, y: rightY, width: 280, height: 16,
    value: 68, trackColor: '#2d2d3a', fillColor: '#22c55e', radius: 8
  }))

  rightY += 30

  layer.addElement(new Progress({
    x: 700, y: rightY, width: 280, height: 16,
    value: 45, trackColor: '#2d2d3a', fillColor: '#f59e0b', radius: 8
  }))

  rightY += 30

  layer.addElement(new Progress({
    x: 700, y: rightY, width: 280, height: 16,
    value: 82, trackColor: '#2d2d3a', fillColor: '#3b82f6', radius: 8
  }))

  // Rating
  rightY += 60

  layer.addElement(new TextElement({
    x: 700, y: rightY, text: '7. Rating 星级评分', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  rightY += 35

  layer.addElement(new Rating({
    x: 700, y: rightY, value: 4.5, size: 32, filledColor: '#fbbf24', emptyColor: '#3a3a4a'
  }))

  // ========== 新组件 ==========
  let newY = 720

  // Arrow 箭头
  layer.addElement(new TextElement({
    x: 50, y: newY, text: '8. Arrow 箭头', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  newY += 35

  layer.addElement(new Arrow({
    x1: 50, y1: newY, x2: 200, y2: newY,
    color: '#3b82f6', strokeWidth: 3, headSize: 15, direction: 'end'
  }))

  // Bubble 对话气泡
  layer.addElement(new TextElement({
    x: 250, y: newY - 35, text: '9. Bubble 对话气泡', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new Bubble({
    x: 250, y: newY, width: 250, height: 80,
    text: '你好，这是一个气泡！', fontSize: 16,
    backgroundColor: '#ffffff', color: '#333333',
    tailDirection: 'bottom', tailPosition: 'left'
  }))

  // Ribbon 丝带
  newY += 120
  layer.addElement(new TextElement({
    x: 50, y: newY, text: '10. Ribbon 丝带', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  newY += 35

  layer.addElement(new Ribbon({
    x: 50, y: newY, width: 200,
    text: '热卖', fontSize: 24,
    backgroundColor: '#e74c3c', style: 'fold'
  }))

  layer.addElement(new Ribbon({
    x: 270, y: newY, width: 200,
    text: '新品', fontSize: 24,
    backgroundColor: '#22c55e', style: 'corner'
  }))

  // Seal 印章
  layer.addElement(new TextElement({
    x: 500, y: newY - 35, text: '11. Seal 印章', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new Seal({
    x: 500, y: newY, size: 80,
    text: '官方', fontSize: 18, color: '#e74c3c', style: 'circle'
  }))

  // Icon 图标
  layer.addElement(new TextElement({
    x: 620, y: newY - 35, text: '12. Icon 图标', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new Icon({
    x: 620, y: newY, size: 50, icon: '🚀', backgroundColor: '#1a1a2e', radius: 8
  }))

  layer.addElement(new Icon({
    x: 680, y: newY, size: 50, icon: '💖', backgroundColor: '#1a1a2e', radius: 25
  }))

  // TagCloud 标签云
  newY += 120
  layer.addElement(new TextElement({
    x: 50, y: newY, text: '13. TagCloud 标签云', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  newY += 35

  layer.addElement(new TagCloud({
    x: 50, y: newY, maxWidth: 500,
    tags: [
      { text: 'JavaScript', bgColor: '#fbbf24', color: '#000000' },
      { text: 'TypeScript', bgColor: '#3b82f6', color: '#ffffff' },
      { text: 'React', bgColor: '#22c55e', color: '#ffffff' },
      { text: 'Vue', bgColor: '#10b981', color: '#ffffff' },
      { text: 'Node.js', bgColor: '#6366f1', color: '#ffffff' },
      { text: 'Python', bgColor: '#f59e0b', color: '#000000' },
    ],
    fontSize: 14
  }))

  // Stepper 步骤指示器
  newY += 100
  layer.addElement(new TextElement({
    x: 50, y: newY, text: '14. Stepper 步骤指示器', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  newY += 35

  layer.addElement(new Stepper({
    x: 50, y: newY, width: 500,
    currentStep: 1,
    steps: [
      { title: '下单', description: '选择商品' },
      { title: '支付', description: '完成付款' },
      { title: '发货', description: '等待收货' },
      { title: '完成', description: '确认收货' },
    ]
  }))

  // HighlightText 高亮文字
  newY += 120
  layer.addElement(new TextElement({
    x: 50, y: newY, text: '15. HighlightText 高亮文字', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  newY += 35

  layer.addElement(new HighlightText({
    x: 50, y: newY, text: '重要消息', fontSize: 32,
    highlightColor: '#fbbf24', highlightStyle: 'marker'
  }))

  layer.addElement(new HighlightText({
    x: 250, y: newY, text: '重点关注', fontSize: 32,
    highlightColor: '#22c55e', highlightStyle: 'underline', highlightWidth: 4
  }))

  layer.addElement(new HighlightText({
    x: 470, y: newY, text: '背景高亮', fontSize: 32,
    highlightColor: '#ef4444', highlightStyle: 'background'
  }))

  // Table 表格
  newY += 80
  layer.addElement(new TextElement({
    x: 50, y: newY, text: '16. Table 表格', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))
  newY += 35

  layer.addElement(new Table({
    x: 50, y: newY,
    width: 400,
    columns: [
      { title: '姓名', width: 100 },
      { title: '年龄', width: 80 },
      { title: '城市', width: 120 },
      { title: '职业', width: 100 },
    ],
    rows: [
      ['张三', '28', '北京', '工程师'],
      ['李四', '32', '上海', '设计师'],
      ['王五', '25', '深圳', '产品经理'],
    ],
    fontSize: 12
  }))

  // ========== 渲染 ==========
  console.log('开始渲染...')
  const output = await poster.exportPNG('poster-components-v2', './output')
  console.log(`\n✅ 海报已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)