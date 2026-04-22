/**
 * 海报示例 - 产品展示
 */
const { PosterBuilder, Card, Button, Badge, Rating, Progress, StatCard, ProgressCircle, Icon, TagCloud, Quote, FeatureGrid, Divider, CTA, Chip, Avatar, TextElement, Arrow, Bubble, Ribbon, Seal, Frame, HighlightText, Chart, ListItem, Notification, Watermark, ImageFrame, Grid, Columns } = require('../src/index')

async function main() {
  console.log('=== 创建产品展示海报 ===\n')

  const poster = new PosterBuilder({
    width: 1080,
    height: 1920,
    backgroundColor: '#0f172a'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // ========== 顶部区域 ==========
  // 标题
  layer.addElement(new TextElement({
    x: 50, y: 60, text: '✨ 新品上市', fontSize: 48, color: '#ffffff', fontWeight: 'bold'
  }))

  // 副标题
  layer.addElement(new TextElement({
    x: 50, y: 120, text: 'iPhone 15 Pro Max', fontSize: 36, color: '#94a3b8'
  }))

  // 评分
  layer.addElement(new Rating({
    x: 50, y: 170, value: 4.8, size: 28, filledColor: '#fbbf24', emptyColor: '#334155'
  }))
  layer.addElement(new TextElement({
    x: 200, y: 185, text: '4.8 (2,847 评价)', fontSize: 16, color: '#64748b'
  }))

  // ========== 主图区域 ==========
  // 图片框（使用渐变色占位）
  layer.addElement(new Frame({
    x: 50, y: 240, width: 980, height: 500,
    style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 20
  }))
  layer.addElement(new Icon({
    x: 465, y: 390, size: 120, icon: '📱', backgroundColor: '#1e293b', radius: 60
  }))
  layer.addElement(new TextElement({
    x: 465, y: 550, text: '产品图片', fontSize: 32, color: '#64748b'
  }))

  // ========== 价格区域 ==========
  layer.addElement(new Ribbon({
    x: 750, y: 340, width: 200,
    text: '热卖中', fontSize: 20,
    backgroundColor: '#ef4444', style: 'fold'
  }))

  // 价格卡片
  layer.addElement(new Card({
    x: 50, y: 780, width: 300, height: 120,
    backgroundColor: '#1e293b', radius: 16,
    padding: 20
  }))
  layer.addElement(new TextElement({
    x: 70, y: 810, text: '限时优惠', fontSize: 14, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 70, y: 850, text: '¥9,999', fontSize: 36, color: '#ef4444', fontWeight: 'bold'
  }))

  // ========== 统计卡片 ==========
  let statX = 400
  layer.addElement(new StatCard({
    x: statX, y: 780, width: 200, height: 100,
    label: '月销量', value: '12,847',
    change: '+23%', positive: true,
    icon: '📦', iconColor: '#22c55e',
    backgroundColor: '#1e293b'
  }))

  statX += 220
  layer.addElement(new StatCard({
    x: statX, y: 780, width: 200, height: 100,
    label: '好评率', value: '98.5%',
    change: '+2%', positive: true,
    icon: '👍', iconColor: '#3b82f6',
    backgroundColor: '#1e293b'
  }))

  statX += 220
  layer.addElement(new StatCard({
    x: statX, y: 780, width: 200, height: 100,
    label: '库存', value: '2,431',
    change: '-5%', positive: false,
    icon: '🏭', iconColor: '#f59e0b',
    backgroundColor: '#1e293b'
  }))

  // ========== 进度区域 ==========
  layer.addElement(new TextElement({
    x: 50, y: 920, text: '配置对比', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))

  // 圆形进度
  layer.addElement(new ProgressCircle({
    x: 120, y: 980, radius: 60, value: 95, strokeWidth: 10,
    fillColor: '#3b82f6', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 80, y: 1075, text: '性能', fontSize: 14, color: '#94a3b8'
  }))

  layer.addElement(new ProgressCircle({
    x: 280, y: 980, radius: 60, value: 88, strokeWidth: 10,
    fillColor: '#22c55e', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 240, y: 1075, text: '续航', fontSize: 14, color: '#94a3b8'
  }))

  layer.addElement(new ProgressCircle({
    x: 440, y: 980, radius: 60, value: 92, strokeWidth: 10,
    fillColor: '#f59e0b', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 400, y: 1075, text: '屏幕', fontSize: 14, color: '#94a3b8'
  }))

  // ========== 特性网格 ==========
  layer.addElement(new TextElement({
    x: 600, y: 920, text: '核心特性', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new FeatureGrid({
    x: 600, y: 960,
    columns: 2, itemWidth: 200, itemHeight: 80, gap: 12,
    items: [
      { icon: '🚀', title: 'A17 Pro芯片', description: '极速处理', iconColor: '#3b82f6' },
      { icon: '📸', title: '4800万像素', description: '专业影像', iconColor: '#22c55e' },
      { icon: '🔋', title: '4422mAh', description: '超长续航', iconColor: '#f59e0b' },
      { icon: '💾', title: '256GB起', description: '大容量存储', iconColor: '#8b5cf6' },
    ],
    backgroundColor: '#1e293b', borderColor: '#334155', radius: 12
  }))

  // ========== 图表区域 ==========
  layer.addElement(new TextElement({
    x: 50, y: 1150, text: '价格趋势', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new Frame({
    x: 50, y: 1190, width: 400, height: 200,
    style: 'corner', color: '#334155', borderWidth: 2
  }))

  layer.addElement(new Chart({
    x: 60, y: 1200, width: 380, height: 180,
    chartType: 'bar',
    data: [
      { label: '1月', value: 8999 },
      { label: '2月', value: 9299 },
      { label: '3月', value: 9499 },
      { label: '4月', value: 9999 },
      { label: '5月', value: 9999 },
    ],
    barColor: '#3b82f6'
  }))

  // 饼图
  layer.addElement(new TextElement({
    x: 500, y: 1150, text: '用户分布', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new Frame({
    x: 500, y: 1190, width: 200, height: 200,
    style: 'double', color: '#334155', borderWidth: 2
  }))

  layer.addElement(new Chart({
    x: 510, y: 1200, width: 180, height: 180,
    chartType: 'pie',
    data: [
      { label: '一二线城市', value: 55 },
      { label: '三四线城市', value: 30 },
      { label: '其他', value: 15 },
    ]
  }))

  // ========== 标签云 ==========
  layer.addElement(new TextElement({
    x: 750, y: 1150, text: '标签', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new TagCloud({
    x: 750, y: 1190, maxWidth: 280,
    tags: [
      { text: '5G', bgColor: '#3b82f6', color: '#ffffff' },
      { text: '旗舰', bgColor: '#ef4444', color: '#ffffff' },
      { text: '拍照强', bgColor: '#22c55e', color: '#ffffff' },
      { text: '续航好', bgColor: '#f59e0b', color: '#000000' },
      { text: 'iOS', bgColor: '#64748b', color: '#ffffff' },
      { text: '钛金属', bgColor: '#8b5cf6', color: '#ffffff' },
      { text: '灵动岛', bgColor: '#ec4899', color: '#ffffff' },
    ],
    fontSize: 14
  }))

  // ========== 通知提示 ==========
  layer.addElement(new Notification({
    x: 50, y: 1430, width: 320,
    type: 'success', title: '正品保障', message: '官方授权 · 全国联保'
  }))

  layer.addElement(new Notification({
    x: 400, y: 1430, width: 320,
    type: 'info', title: '急速发货', message: '下单后24小时内发货'
  }))

  // ========== 列表项 ==========
  layer.addElement(new TextElement({
    x: 50, y: 1550, text: '配置详情', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new ListItem({
    x: 50, y: 1590, width: 480,
    icon: '📱', title: '屏幕尺寸', description: '6.7 英寸 Super Retina XDR 显示屏', badge: 'OLED', badgeColor: '#3b82f6'
  }))

  layer.addElement(new ListItem({
    x: 50, y: 1660, width: 480,
    icon: '⚡', title: '处理器', description: 'A17 Pro 芯片，6 核 GPU'
  }))

  layer.addElement(new ListItem({
    x: 50, y: 1730, width: 480,
    icon: '📷', title: '摄像头', description: '4800万主摄 + 1200万超广角 + 1200万长焦'
  }))

  // ========== 底部CTA ==========
  layer.addElement(new Divider({
    x: 50, y: 1820, width: 980, thickness: 1, color: '#334155'
  }))

  layer.addElement(new CTA({
    x: 50, y: 1850, width: 980, height: 70,
    text: '立即购买', fontSize: 24,
    backgroundColor: '#3b82f6', color: '#ffffff', radius: 12
  }))

  // ========== 印章 ==========
  layer.addElement(new Seal({
    x: 800, y: 1650, size: 80,
    text: '官方', fontSize: 16, color: '#ef4444', style: 'circle'
  }))

  // ========== 水印 ==========
  layer.addElement(new Watermark({
    x: 540, y: 960, text: 'FOLIKO', fontSize: 120, color: 'rgba(255,255,255,0.03)', rotation: -30
  }))

  // ========== 渲染 ==========
  console.log('开始渲染...')
  const output = await poster.exportPNG('poster-product', './output')
  console.log(`\n✅ 海报已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
