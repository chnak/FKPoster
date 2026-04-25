/**
 * 根据 SKILL.md 制作的综合测试海报
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Card,
  Badge,
  Button,
  Quote,
  Divider,
  Avatar,
  Chip,
  Progress,
  Rating,
  StatCard,
  Notification,
  ListItem,
  Icon
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 1000,
    backgroundColor: '#f8fafc'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  layer.addElement(new TextElement({
    x: 400, y: 50,
    text: 'FKPoster 组件测试',
    fontSize: 36,
    color: '#1e293b',
    fontWeight: 'bold',
    anchor: [0.5, 0.5]
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 400, y: 90,
    width: 700,
    color: '#e2e8f0',
    thickness: 2,
    anchor: [0.5, 0.5]
  }))

  // 统计卡片
  layer.addElement(new StatCard({
    x: 180, y: 160,
    width: 160, height: 90,
    value: '2,847',
    label: '总用户',
    change: '+12.5%',
    positive: true,
    icon: '👥',
    iconColor: '#6366f1',
    backgroundColor: '#6366f1',
    radius: 12,
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new StatCard({
    x: 400, y: 160,
    width: 160, height: 90,
    value: '98.2%',
    label: '满意度',
    change: '+2.1%',
    positive: true,
    icon: '⭐',
    iconColor: '#f59e0b',
    backgroundColor: '#f59e0b',
    radius: 12,
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new StatCard({
    x: 620, y: 160,
    width: 160, height: 90,
    value: '1,234',
    label: '订单数',
    change: '-5.3%',
    positive: false,
    icon: '📦',
    iconColor: '#10b981',
    backgroundColor: '#10b981',
    radius: 12,
    anchor: [0.5, 0.5]
  }))

  // 徽章
  layer.addElement(new Badge({
    x: 700, y: 50,
    text: 'NEW',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: 12,
    padding: 10,
    radius: 10,
    anchor: [0.5, 0.5]
  }))

  // 头像
  layer.addElement(new Avatar({
    x: 100, y: 290,
    name: '张三',
    size: 60,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 3,
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 100, y: 360,
    text: '张三',
    fontSize: 16,
    color: '#1e293b',
    anchor: [0.5, 0.5]
  }))

  // 标签
  layer.addElement(new Chip({
    x: 200, y: 270,
    text: '设计师',
    backgroundColor: '#e2e8f0',
    color: '#333333',
    fontSize: 12,
    padding: 10,
    radius: 14,
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new Chip({
    x: 280, y: 270,
    text: '开发者',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: 12,
    padding: 10,
    radius: 14,
    icon: '★',
    anchor: [0.5, 0.5]
  }))

  // 评分
  layer.addElement(new Rating({
    x: 200, y: 310,
    value: 4.5,
    max: 5,
    size: 24,
    filledColor: '#fbbf24',
    emptyColor: '#e5e7eb',
    anchor: [0.5, 0.5]
  }))

  // 进度条
  layer.addElement(new Progress({
    x: 400, y: 290,
    width: 300, height: 16,
    value: 75,
    trackColor: '#e2e8f0',
    fillColor: '#3b82f6',
    radius: 8,
    showLabel: true,
    label: '75%',
    anchor: [0.5, 0.5]
  }))

  // 卡片组件
  layer.addElement(new Card({
    x: 100, y: 430,
    width: 280,
    height: 140,
    title: '产品特点',
    titleSize: 20,
    titleColor: '#000000',
    subtitle: '高性能、易用、灵活可扩展，支持多种布局方式',
    subtitleSize: 14,
    subtitleColor: '#666666',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    radius: 12,
    padding: 16,
    anchor: [0.5, 0.5]
  }))

  // 引用组件
  layer.addElement(new Quote({
    x: 420, y: 430,
    width: 280,
    text: '这是一段引用文本，用于测试引用组件的自动换行功能是否正常',
    author: '鲁迅',
    backgroundColor: '#2d2d3a',
    borderColor: '#00d9ff',
    fontSize: 14,
    anchor: [0.5, 0.5]
  }))

  // 按钮
  layer.addElement(new Button({
    x: 150, y: 620,
    width: 140, height: 48,
    text: '立即购买',
    textColor: '#ffffff',
    fontSize: 16,
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
    borderWidth: 0,
    radius: 8,
    shadow: { blur: 8, color: 'rgba(59,130,246,0.3)' },
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new Button({
    x: 320, y: 620,
    width: 140, height: 48,
    text: '了解更多',
    textColor: '#3b82f6',
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderColor: '#3b82f6',
    borderWidth: 2,
    radius: 8,
    anchor: [0.5, 0.5]
  }))

  // 列表项
  layer.addElement(new ListItem({
    x: 500, y: 610,
    width: 200,
    height: 60,
    title: '功能特性',
    description: '丰富的组件库',
    icon: '→',
    iconColor: '#3b82f6',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    radius: 8,
    anchor: [0.5, 0.5]
  }))

  // 通知组件
  layer.addElement(new Notification({
    x: 400, y: 720,
    width: 600,
    title: '更新提示',
    message: '系统将于今晚22:00进行升级维护，请提前保存重要数据',
    backgroundColor: '#10b981',
    anchor: [0.5, 0.5]
  }))

  // 图标
  layer.addElement(new Icon({
    x: 150, y: 800,
    icon: '⚡',
    size: 40,
    color: '#fbbf24',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 220, y: 800,
    icon: '🎯',
    size: 40,
    color: '#ef4444',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 290, y: 800,
    icon: '🚀',
    size: 40,
    color: '#6366f1',
    anchor: [0.5, 0.5]
  }))

  // 底部信息
  layer.addElement(new TextElement({
    x: 400, y: 900,
    text: 'FKPoster - 专业的海报构建工具',
    fontSize: 14,
    color: '#94a3b8',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 400, y: 930,
    text: '支持 PNG / SVG / Base64 多种导出格式',
    fontSize: 12,
    color: '#cbd5e1',
    anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('skill-full-test', './output')
  poster.destroy()
  console.log('综合测试海报已保存到 output/skill-full-test.png')
}

main().catch(console.error)
