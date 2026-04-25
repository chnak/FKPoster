---
name: fkposter
description: FKPoster 海报构建技能。适用于多种视觉内容创建场景：名片(01-business-card.js)、宣传海报(02-promotion-poster.js)、邀请函(03-invitation.js)、证书(04-certificate.js)、优惠券(05-coupon.js)、菜单(06-menu.js)、订单小票(07-receipt.js)、社交媒体图片(08-wechat.js)、广告横幅(09-banner.js)、产品图片(10-product.js)、天气卡片(11-weather.js)、音乐播放列表封面(12-playlist.js)、书籍封面(13-book.js)、电影海报(14-movie.js)、旅游明信片(15-postcard.js)、餐厅菜单(16-restaurant.js)、活动海报(17-event.js)、个人头像卡片(18-profile-card.js)、统计图表(19-statistics.js)等视觉设计。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
---

# FKPoster API 使用指南

## 安装

```bash
npm install @chnak/poster
```

## 快速开始

```javascript
const { PosterBuilder, Button, Card, TextElement } = require('@chnak/poster')

async function main() {
  // 创建海报构建器
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#f8fafc'
  })

  // 创建图层
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 添加元素
  const button = new Button({
    x: 400, y: 300, width: 160, height: 50,
    text: '按钮', backgroundColor: '#3b82f6', textColor: '#ffffff',
    anchor: [0.5, 0.5]
  })
  layer.addElement(button)

  // 导出
  await poster.exportPNG('my-poster', './output')
  poster.destroy()
}

main().catch(console.error)
```

## 核心概念

### PosterBuilder - 海报构建器
主入口类，管理图层、组件和渲染。会自动初始化，无需手动调用 initialize()。

```javascript
const poster = new PosterBuilder({
  width: 1080,        // 海报宽度 (默认: 1080)
  height: 1920,       // 海报高度 (默认: 1920)
  backgroundColor: '#ffffff'  // 背景色 (默认: #ffffff)
})

// 创建图层（会自动初始化）
const layer = poster.createLayer({ name: 'main', zIndex: 0 })

// 导出 PNG（自动渲染）
await poster.exportPNG('filename', './output')

// 销毁
poster.destroy()
```

### Layer - 图层
管理一组元素，类似 Track。

```javascript
const layer = poster.createLayer({
  name: 'main',        // 图层名称
  zIndex: 0            // 层级 (默认: 0)
})

// 添加元素
layer.addElement(element)

// 移除元素
layer.removeElement(element)
```

### Anchor 定位系统
所有组件都使用 anchor 定位，默认 `[0.5, 0.5]` 表示居中定位。

```
anchor: [0, 0]     → 左上角对齐 (x, y 是元素左上角)
anchor: [0.5, 0.5] → 居中定位 (x, y 是元素中心点) ← 默认
anchor: [1, 1]     → 右下角对齐 (x, y 是元素右下角)
```

## 基础元素

### TextElement - 文本元素
```javascript
const text = new TextElement({
  x: 400, y: 300,
  text: 'Hello World',
  fontSize: 32,
  fontFamily: 'Microsoft YaHei',
  color: '#1e293b',
  textAlign: 'left',      // 'left' | 'center' | 'right'
  maxWidth: 300,          // 最大宽度，用于换行
  lineHeight: 1.5,       // 行高
  anchor: [0.5, 0.5]
})
```

### RectElement - 矩形元素
```javascript
const rect = new RectElement({
  x: 400, y: 300,
  width: 200, height: 80,
  fillColor: '#3b82f6',
  borderColor: '#2563eb',
  borderWidth: 2,
  borderRadius: 12,
  anchor: [0.5, 0.5]
})
```

### CircleElement - 圆形元素
```javascript
const circle = new CircleElement({
  x: 400, y: 300,
  radius: 40,
  fillColor: '#ef4444',
  strokeColor: '#dc2626',
  strokeWidth: 3,
  anchor: [0.5, 0.5]
})
```

### ImageElement - 图片元素
```javascript
const image = new ImageElement({
  x: 400, y: 300,
  width: 200, height: 200,
  src: 'https://example.com/image.png',  // URL 或本地路径
  anchor: [0.5, 0.5]
})
```

### DividerElement - 分割线元素
```javascript
const divider = new DividerElement({
  x: 400, y: 300,
  width: 300,
  height: 2,
  color: '#e2e8f0',
  anchor: [0.5, 0.5]
})
```

## 组件 (Components)

### Button - 按钮
```javascript
const button = new Button({
  x: 400, y: 300,
  width: 160,           // 或 'auto' 自适应
  height: 50,
  text: '点击我',
  textColor: '#ffffff',    // 或 color
  fontSize: 24,
  fontFamily: 'Microsoft YaHei',
  backgroundColor: '#3b82f6',
  borderColor: '#2563eb',
  borderWidth: 0,
  radius: 8,
  shadow: { blur: 10, color: 'rgba(0,0,0,0.2)' },
  gradient: { colors: ['#3b82f6', '#2563eb'], angle: 0 },
  icon: '←',             // 图标文字或图片URL
  iconPosition: 'left',   // 'left' | 'right'
  padding: 30,
  anchor: [0.5, 0.5]
})
```

### Card - 卡片
```javascript
const card = new Card({
  x: 400, y: 300,
  width: 350,
  height: 120,
  title: '卡片标题',
  titleSize: 24,         // 或 fontSize
  titleColor: '#000000',
  subtitle: '卡片副标题内容',
  subtitleSize: 16,
  subtitleColor: '#666666',
  backgroundColor: '#ffffff',
  borderColor: '#e5e7eb',
  borderWidth: 1,
  radius: 12,
  padding: 20,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Badge - 徽章
```javascript
const badge = new Badge({
  x: 400, y: 300,
  text: '新功能',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  fontSize: 12,
  fontFamily: 'Microsoft YaHei',
  padding: 12,
  radius: 12,
  anchor: [0.5, 0.5]
})
```

### Chip - 标签
```javascript
const chip = new Chip({
  x: 400, y: 300,
  text: '热门标签',
  backgroundColor: '#e2e8f0',
  color: '#333333',
  fontSize: 12,
  padding: 12,
  radius: 16,
  icon: '★',           // 可选图标
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Avatar - 头像
```javascript
const avatar = new Avatar({
  x: 400, y: 300,
  name: '张三',          // 显示首字母，或使用 initials
  size: 60,              // 头像大小
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  borderColor: '#ffffff',
  borderWidth: 2,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Divider - 分割线
```javascript
const divider = new Divider({
  x: 400, y: 300,
  width: 350,
  color: '#e2e8f0',
  thickness: 2,
  anchor: [0.5, 0.5]
})
```

### CTA - 调用按钮
```javascript
const cta = new CTA({
  x: 400, y: 300,
  width: 200, height: 55,
  text: '立即购买',
  backgroundColor: '#3b82f6',
  textColor: '#ffffff',
  anchor: [0.5, 0.5]
})
```

### Progress - 进度条
```javascript
const progress = new Progress({
  x: 400, y: 300,
  width: 300, height: 20,
  value: 75,             // 0-100 百分比
  trackColor: '#e2e8f0',
  fillColor: '#3b82f6',
  radius: 10,
  showLabel: false,
  label: '75%',
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### ProgressCircle - 环形进度
```javascript
const progressCircle = new ProgressCircle({
  x: 400, y: 300,
  radius: 60,
  value: 65,             // 0-100 百分比
  strokeWidth: 10,
  fillColor: '#3b82f6',
  trackColor: '#e5e7eb',
  showLabel: true,
  anchor: [0.5, 0.5]
})
```

### Rating - 星级评分
```javascript
const rating = new Rating({
  x: 400, y: 300,
  value: 4.5,            // 评分值
  max: 5,                // 最大星数
  size: 36,              // 星星大小
  filledColor: '#fbbf24',
  emptyColor: '#e5e7eb',
  gap: 4,                // 星星间距
  anchor: [0.5, 0.5]
})
```

### StatCard - 统计卡片
```javascript
const statCard = new StatCard({
  x: 400, y: 300,
  width: 280, height: 100,
  value: '12,345',
  label: '总用户',
  change: '+8.2%',       // 变化值
  positive: true,         // 是否正向增长
  icon: '👥',
  iconColor: '#6366f1',
  anchor: [0.5, 0.5]
})
```

### Quote - 引用
```javascript
const quote = new Quote({
  x: 400, y: 300,
  width: 350,
  text: '这是引用内容的文本',
  author: '引用作者',
  backgroundColor: '#2d2d3a',
  borderColor: '#00d9ff',
  fontSize: 16,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Timeline - 时间线
```javascript
const timeline = new Timeline({
  x: 400, y: 300,
  width: 280,
  items: [
    { title: '步骤一', date: '2024-01', active: true },
    { title: '步骤二', date: '2024-02', active: true },
    { title: '步骤三', date: '2024-03', active: false }
  ],
  anchor: [0.5, 0.5]
})
```

### Feature - 特性展示
```javascript
const feature = new Feature({
  x: 400, y: 300,
  width: 200,
  title: '快速',
  description: '高性能处理能力',
  icon: '⚡',
  iconColor: '#f59e0b',
  anchor: [0.5, 0.5]
})
```

### FeatureGrid - 特性网格
```javascript
const featureGrid = new FeatureGrid({
  x: 400, y: 300,
  columns: 2,
  rows: 2,
  itemWidth: 150,
  itemHeight: 100,
  gap: 10,
  padding: 10,
  items: [
    { title: '特性1', icon: '★', description: '描述1' },
    { title: '特性2', icon: '◆', description: '描述2' },
    { title: '特性3', icon: '●', description: '描述3' },
    { title: '特性4', icon: '▲', description: '描述4' }
  ],
  anchor: [0.5, 0.5]
})
```

### ListItem - 列表项
```javascript
const listItem = new ListItem({
  x: 400, y: 300,
  width: 350, height: 60,
  title: '列表项标题',
  description: '列表项描述内容',
  icon: '→',
  iconColor: '#3b82f6',
  anchor: [0.5, 0.5]
})
```

### Notification - 通知
```javascript
const notification = new Notification({
  x: 400, y: 300,
  width: 320,
  title: '提示',
  message: '操作已成功完成',
  anchor: [0.5, 0.5]
})
```

### Table - 表格
```javascript
const table = new Table({
  x: 400, y: 300,
  width: 350,
  headers: ['姓名', '年龄', '城市'],
  rows: [
    ['张三', '25', '北京'],
    ['李四', '30', '上海'],
    ['王五', '28', '广州']
  ],
  anchor: [0.5, 0.5]
})
```

### Stepper - 步骤器
```javascript
const stepper = new Stepper({
  x: 400, y: 300,
  width: 400,
  steps: ['下单', '支付', '发货', '完成'],
  currentStep: 1,         // 当前步骤 (0-indexed)
  anchor: [0.5, 0.5]
})
```

### TagCloud - 标签云
```javascript
const tagCloud = new TagCloud({
  x: 400, y: 300,
  width: 400,
  tags: ['JavaScript', 'Python', 'React', 'Vue', 'Node.js', 'TypeScript'],
  anchor: [0.5, 0.5]
})
```

### HighlightText - 高亮文字
```javascript
const highlightText = new HighlightText({
  x: 400, y: 300,
  width: 300,
  text: '重要公告',
  highlightColor: '#fef08a',
  textColor: '#1e293b',
  highlightStyle: 'background',  // 'background' | 'underline'
  fontSize: 24,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Watermark - 水印
```javascript
const watermark = new Watermark({
  x: 400, y: 300,
  width: 300, height: 60,
  text: '机密文档',
  color: 'rgba(0,0,0,0.08)',
  fontSize: 24,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Bubble - 气泡提示
```javascript
const bubble = new Bubble({
  x: 400, y: 300,
  width: 250, height: 70,
  text: '这是一条气泡提示消息',
  backgroundColor: '#1e293b',
  textColor: '#ffffff',
  fontSize: 14,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Icon - 图标
```javascript
const icon = new Icon({
  x: 400, y: 300,
  icon: '★',             // 图标字符或 emoji
  size: 50,
  color: '#fbbf24',
  anchor: [0.5, 0.5]
})
```

### Arrow - 箭头
```javascript
const arrow = new Arrow({
  x: 400, y: 300,
  width: 150, height: 40,
  direction: 'right',      // 'left' | 'right' | 'up' | 'down'
  color: '#64748b',
  thickness: 3,
  anchor: [0.5, 0.5]
})
```

### ImageFrame - 图片框架
```javascript
const imageFrame = new ImageFrame({
  x: 400, y: 300,
  width: 120, height: 120,
  radius: 12,
  borderColor: '#3b82f6',
  borderWidth: 3,
  fillColor: '#f1f5f9',    // 内部填充色
  anchor: [0.5, 0.5]
})
```

### Ribbon - 丝带
```javascript
const ribbon = new Ribbon({
  x: 400, y: 300,
  width: 180,
  text: '热销商品',
  backgroundColor: '#ef4444',
  color: '#ffffff',
  fontSize: 14,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Seal - 印章
```javascript
const seal = new Seal({
  x: 400, y: 300,
  size: 60,
  text: '认证',
  color: '#ef4444',
  fontSize: 12,
  fontFamily: 'Microsoft YaHei',
  anchor: [0.5, 0.5]
})
```

### Grid - 网格
```javascript
const grid = new Grid({
  x: 400, y: 300,
  columns: 4,
  rows: 2,
  columnWidth: 50,
  rowHeight: 50,
  gap: 8,
  backgroundColor: '#f1f5f9',
  borderColor: '#cbd5e1',
  borderWidth: 1,
  radius: 8,
  anchor: [0.5, 0.5]
})
```

### Columns - 列布局
```javascript
const columns = new Columns({
  x: 400, y: 300,
  widths: [120, 120, 120],
  gap: 15,
  anchor: [0.5, 0.5]
})
```

### Frame - 框架
```javascript
const frame = new Frame({
  x: 400, y: 300,
  width: 200, height: 80,
  borderColor: '#3b82f6',
  borderWidth: 3,
  radius: 12,
  anchor: [0.5, 0.5]
})
```

### Barcode - 条形码
```javascript
const barcode = new Barcode({
  x: 400, y: 300,
  width: 200, height: 60,
  value: '123456789012',
  format: 'CODE128',      // CODE128 | CODE39 | EAN13 | EAN8 | UPC
  color: '#000000',
  textSize: 12,
  showText: true,
  anchor: [0.5, 0.5]
})
```

### QRCode - 二维码
```javascript
const qrcode = new QRCode({
  x: 400, y: 300,
  value: 'https://example.com',
  size: 100,
  color: '#000000',
  backgroundColor: '#ffffff',
  errorCorrectionLevel: 'M',  // L | M | Q | H
  anchor: [0.5, 0.5]
})
```

### Chart - 图表
```javascript
const chart = new Chart({
  x: 400, y: 300,
  width: 280, height: 120,
  data: [65, 45, 80, 55, 90, 70],
  labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
  barColor: '#3b82f6',
  showLabels: true,
  showGrid: true,
  anchor: [0.5, 0.5]
})
```

### Star - 星星
```javascript
const star = new Star({
  x: 400, y: 300,
  size: 40,
  fillColor: '#eab308',
  strokeColor: '#ca8a04',
  strokeWidth: 2,
  anchor: [0.5, 0.5]
})
```

## 导出格式

### PNG
```javascript
await poster.exportPNG('my-poster', './output')
// 输出到: ./output/my-poster.png
```

### SVG
```javascript
await poster.exportSVG('my-poster', './output')
// 输出到: ./output/my-poster.svg
```

### Base64
```javascript
const base64 = poster.toBase64('png')
// 返回: data:image/png;base64,xxxxx...
```

### Buffer
```javascript
const buffer = poster.toBuffer('png')  // 'png' | 'jpg'
// 返回: Buffer 对象
```

## 单位系统

支持多种单位：
- 数字: `100` → 100像素
- 百分比: `'50%'` → 基于容器尺寸的50%
- vw/vh: `'10vw'` → 视口宽度的10%
- rpx: `'200rpx'` → 响应式像素

```javascript
const element = new RectElement({
  x: '50%',           // 居中
  y: '10vw',
  width: '80%',
  height: 200,
  anchor: [0.5, 0.5]
})
```

## 预设尺寸

```javascript
const poster = new PosterBuilder()
poster.usePreset('poster_square')    // 1080x1080
poster.usePreset('poster_a4')       // 2480x3508
poster.usePreset('poster_16_9')      // 1920x1080
poster.usePreset('poster_9_16')      // 1080x1920
poster.usePreset('banner_1920x500')  // 1920x500
poster.usePreset('social_instagram') // 1080x1080
poster.usePreset('social_story')     // 1080x1920
poster.usePreset('social_facebook')  // 1200x630
```

## 完整示例

```javascript
const {
  PosterBuilder,
  Button,
  Card,
  TextElement,
  CircleElement,
  Avatar,
  Badge
} = require('@chnak/poster')

async function createProfileCard() {
  const poster = new PosterBuilder({
    width: 600,
    height: 800,
    backgroundColor: '#f8fafc'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 头像
  const avatar = new Avatar({
    x: 300, y: 100,
    name: '张三',
    size: 80,
    backgroundColor: '#6366f1',
    anchor: [0.5, 0.5]
  })
  layer.addElement(avatar)

  // 名字
  const name = new TextElement({
    x: 300, y: 200,
    text: '张三',
    fontSize: 32,
    fontFamily: 'Microsoft YaHei',
    color: '#1e293b',
    textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(name)

  // 简介
  const bio = new TextElement({
    x: 300, y: 250,
    text: '产品设计师 · 北京',
    fontSize: 18,
    fontFamily: 'Microsoft YaHei',
    color: '#64748b',
    textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(bio)

  // 卡片
  const card = new Card({
    x: 300, y: 350,
    width: 400,
    title: '关于我',
    subtitle: '热爱设计，关注用户体验，喜欢探索新事物。',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    radius: 12,
    padding: 20,
    anchor: [0.5, 0.5]
  })
  layer.addElement(card)

  // 标签
  const chip1 = new Chip({
    x: 200, y: 480,
    text: '设计',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    anchor: [0.5, 0.5]
  })
  layer.addElement(chip1)

  const chip2 = new Chip({
    x: 300, y: 480,
    text: '产品',
    backgroundColor: '#dcfce7',
    color: '#15803d',
    anchor: [0.5, 0.5]
  })
  layer.addElement(chip2)

  const chip3 = new Chip({
    x: 400, y: 480,
    text: '前端',
    backgroundColor: '#fef3c7',
    color: '#b45309',
    anchor: [0.5, 0.5]
  })
  layer.addElement(chip3)

  // 联系方式按钮
  const cta = new Button({
    x: 300, y: 580,
    width: 200, height: 50,
    text: '联系我',
    backgroundColor: '#6366f1',
    textColor: '#ffffff',
    radius: 25,
    anchor: [0.5, 0.5]
  })
  layer.addElement(cta)

  await poster.exportPNG('profile-card', './output')
  poster.destroy()
  console.log('Profile card created!')
}

createProfileCard().catch(console.error)
```