// FKPoster 测试海报生成脚本
const { PosterBuilder, TextElement, RectElement, Card, Button, Badge, Avatar, StatCard, Rating, Progress, Chip, Divider, Icon } = require('../src/index');
const path = require('path');

async function createTestPoster() {
  // 创建海报构建器 (16:9 比例)
  const poster = new PosterBuilder({
    width: 1080,
    height: 607,
    backgroundColor: '#f8fafc'
  });

  // 创建主图层
  const layer = poster.createLayer({ name: 'main', zIndex: 0 });

  // 顶部渐变背景条
  const topBar = new RectElement({
    x: 540, y: 60,
    width: 1080, height: 120,
    fillColor: '#3b82f6',
    anchor: [0.5, 0.5]
  });
  layer.addElement(topBar);

  // 标题
  const title = new TextElement({
    x: 540, y: 60,
    text: 'FKPoster 测试海报',
    fontSize: 48,
    fontFamily: 'Microsoft YaHei',
    color: '#ffffff',
    fontWeight: 'bold',
    anchor: [0.5, 0.5]
  });
  layer.addElement(title);

  // 副标题
  const subtitle = new TextElement({
    x: 540, y: 115,
    text: '海报构建技能演示 - 展示多种组件效果',
    fontSize: 20,
    fontFamily: 'Microsoft YaHei',
    color: '#bfdbfe',
    anchor: [0.5, 0.5]
  });
  layer.addElement(subtitle);

  // 左侧区域：用户卡片
  const userCard = new Card({
    x: 180, y: 280,
    width: 300,
    title: '用户信息卡片',
    titleSize: 22,
    titleColor: '#1e293b',
    subtitle: '这是一张功能丰富的卡片组件，支持标题、副标题、自动换行和自定义样式。',
    subtitleSize: 14,
    subtitleColor: '#64748b',
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    radius: 16,
    padding: 24,
    fontFamily: 'Microsoft YaHei',
    anchor: [0.5, 0.5]
  });
  layer.addElement(userCard);

  // 头像
  const avatar = new Avatar({
    x: 100, y: 400,
    name: '测试用户',
    size: 70,
    backgroundColor: '#6366f1',
    color: '#ffffff',
    borderColor: '#ffffff',
    borderWidth: 3,
    anchor: [0.5, 0.5]
  });
  layer.addElement(avatar);

  // 用户名
  const username = new TextElement({
    x: 180, y: 400,
    text: '测试用户',
    fontSize: 18,
    fontFamily: 'Microsoft YaHei',
    color: '#1e293b',
    fontWeight: 'bold',
    anchor: [0, 0.5]
  });
  layer.addElement(username);

  // 星级评分
  const rating = new Rating({
    x: 100, y: 435,
    value: 4.5,
    max: 5,
    size: 24,
    filledColor: '#fbbf24',
    emptyColor: '#e5e7eb',
    gap: 2,
    anchor: [0.5, 0.5]
  });
  layer.addElement(rating);

  // 中间区域：统计卡片
  const statCard1 = new StatCard({
    x: 540, y: 230,
    width: 260, height: 90,
    value: '12,345',
    label: '总访问量',
    change: '+8.2%',
    positive: true,
    icon: '👁',
    iconColor: '#6366f1',
    backgroundColor: '#6366f1',
    radius: 12,
    anchor: [0.5, 0.5]
  });
  layer.addElement(statCard1);

  const statCard2 = new StatCard({
    x: 810, y: 230,
    width: 260, height: 90,
    value: '5,678',
    label: '活跃用户',
    change: '+12.5%',
    positive: true,
    icon: '👥',
    iconColor: '#10b981',
    backgroundColor: '#10b981',
    radius: 12,
    anchor: [0.5, 0.5]
  });
  layer.addElement(statCard2);

  // 进度条
  const progress = new Progress({
    x: 540, y: 330,
    width: 530, height: 24,
    value: 75,
    trackColor: '#e2e8f0',
    fillColor: '#3b82f6',
    radius: 12,
    showLabel: true,
    label: '项目进度 75%',
    anchor: [0.5, 0.5]
  });
  layer.addElement(progress);

  // 标签组
  const chip1 = new Chip({
    x: 540, y: 390,
    text: 'JavaScript',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: 14,
    padding: 12,
    radius: 16,
    icon: '📜',
    anchor: [0.5, 0.5]
  });
  layer.addElement(chip1);

  const chip2 = new Chip({
    x: 690, y: 390,
    text: 'TypeScript',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: 14,
    padding: 12,
    radius: 16,
    icon: '🔷',
    anchor: [0.5, 0.5]
  });
  layer.addElement(chip2);

  const chip3 = new Chip({
    x: 840, y: 390,
    text: 'React',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    fontSize: 14,
    padding: 12,
    radius: 16,
    icon: '⚛️',
    anchor: [0.5, 0.5]
  });
  layer.addElement(chip3);

  // 底部区域：功能按钮
  const button1 = new Button({
    x: 300, y: 490,
    text: '了解更多',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    fontSize: 18,
    radius: 10,
    padding: 30,
    icon: '🚀',
    iconPosition: 'left',
    anchor: [0.5, 0.5]
  });
  layer.addElement(button1);

  const button2 = new Button({
    x: 540, y: 490,
    text: '立即试用',
    backgroundColor: '#10b981',
    textColor: '#ffffff',
    fontSize: 18,
    radius: 10,
    padding: 30,
    icon: '✨',
    iconPosition: 'left',
    anchor: [0.5, 0.5]
  });
  layer.addElement(button2);

  const button3 = new Button({
    x: 780, y: 490,
    text: '联系我们',
    backgroundColor: '#6366f1',
    textColor: '#ffffff',
    fontSize: 18,
    radius: 10,
    padding: 30,
    icon: '📧',
    iconPosition: 'left',
    anchor: [0.5, 0.5]
  });
  layer.addElement(button3);

  // 分割线
  const divider = new Divider({
    x: 540, y: 570,
    width: 1000,
    color: '#e2e8f0',
    thickness: 1,
    style: 'solid',
    anchor: [0.5, 0.5]
  });
  layer.addElement(divider);

  // 底部信息
  const footer = new TextElement({
    x: 540, y: 585,
    text: 'FKPoster 海报构建技能 - 2026年4月25日',
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    color: '#94a3b8',
    anchor: [0.5, 0.5]
  });
  layer.addElement(footer);

  // 导出 PNG
  const outputPath = path.join(__dirname, 'output', 'test-poster.png');
  await poster.exportPNG('test-poster', './output');
  poster.destroy();

  console.log('✅ 测试海报已生成: ./output/test-poster.png');
  return outputPath;
}

createTestPoster().catch(console.error);
