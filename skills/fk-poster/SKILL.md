---
name: fkposter
description: FKPoster 海报构建技能。适用于多种视觉内容创建场景：名片、宣传海报、邀请函、证书、优惠券、菜单、订单小票、社交媒体图片（微博、微信、小红书）、广告横幅、产品图片、天气卡片、音乐播放列表封面、书籍封面、电影海报、旅游明信片、餐厅菜单、活动海报、个人头像卡片、统计图表等视觉设计。
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
license: MIT
---

# FKPoster V2 使用指南

## 简介

FKPoster 是一个基于 Paper.js 的海报制作插件，支持图层管理、组件复用、元素布局等功能。

## 安装

```bash
npm install
```

## 快速开始

```javascript
const { PosterBuilder, TextElement, Button, Badge } = require('./src/index')

async function main() {
  // 1. 创建海报构建器
  const poster = new PosterBuilder({
    width: 1080,
    height: 1920,
    backgroundColor: '#ffffff'
  })

  // 2. 初始化并创建图层
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 3. 添加元素
  layer.addElement(new TextElement({
    x: 100,
    y: 200,
    text: 'Hello World',
    fontSize: 48,
    color: '#000000'
  }))

  // 4. 导出
  await poster.exportPNG('my-poster', './output')
  poster.destroy()
}

main().catch(console.error)
```

---

## 核心概念

### 层级结构

```
PosterBuilder (海报构建器)
  └── Layer (图层)
        └── Element/Component (元素/组件)
```

- **PosterBuilder**: 主入口类，负责创建画布、管理图层、导出图片
- **Layer**: 图层类，管理一组元素，支持 zIndex 排序
- **Component**: 组件类，可复用的元素组合
- **BaseElement**: 基础元素类，所有元素的基类

### 元素类型

1. **基础元素 (BaseElement)**
   - RectElement - 矩形
   - CircleElement - 圆形
   - TextElement - 文本
   - ImageElement - 图片
   - DividerElement - 分隔线

2. **高级组件 (Component)**
   - Button - 按钮
   - Badge - 徽章/标签（支持自动适配宽高、垂直居中）
   - Card - 卡片
   - Avatar - 头像
   - Progress - 进度条
   - Rating - 星级评分
   - Quote - 引用块（支持自动换行）
   - ImageFrame - 图片框（支持网络/本地图片、cover/contain 裁剪）
   - 等等...

---

## PosterBuilder

海报构建器主类

### 构造函数参数

```javascript
new PosterBuilder({
  width: 1080,        // 海报宽度 (默认: 1080)
  height: 1920,       // 海报高度 (默认: 1920)
  backgroundColor: '#ffffff'  // 背景色 (默认: #ffffff)
})
```

### 方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `initialize()` | 初始化画布 | - |
| `createLayer(config)` | 创建图层 | `Layer` |
| `getLayer(id)` | 获取图层 | `Layer` |
| `exportPNG(filename, outputDir)` | 导出 PNG | `string` (文件路径) |
| `exportSVG(filename, outputDir)` | 导出 SVG | `string` (文件路径) |
| `toBuffer(format)` | 获取图片 Buffer | `Buffer` |
| `toBase64(format)` | 获取 Base64 字符串 | `string` |
| `destroy()` | 销毁实例 | - |

---

## Layer

图层类，管理一组元素。

### 方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `addElement(element)` | 添加元素 | `this` (链式调用) |
| `removeElement(element)` | 移除元素 | - |
| `getElement(id)` | 获取元素 | `Element` |
| `destroy()` | 销毁图层 | - |

---

## 基础元素

### TextElement

文本元素

```javascript
new TextElement({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  text: 'Hello World',       // 文本内容
  fontSize: 32,              // 字体大小 (默认: 32)
  fontFamily: 'Arial',       // 字体系列 (默认: Microsoft YaHei)
  fontWeight: 'bold',        // 字体粗细 (默认: normal)
  color: '#000000',          // 文字颜色 (默认: #000000)
  textAlign: 'left',         // 对齐方式: left/center/right (默认: left)
  maxWidth: 500,             // 最大宽度 (可选)
  lineHeight: 1.5,           // 行高 (可选)
  letterSpacing: 0,          // 字间距 (可选)
  opacity: 1,                // 透明度
  rotation: 0,               // 旋转角度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### RectElement

矩形元素

```javascript
new RectElement({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度
  height: 200,               // 高度
  fillColor: '#3b82f6',      // 填充颜色
  borderColor: '#1d4ed8',    // 边框颜色 (可选)
  borderWidth: 2,            // 边框宽度 (可选)
  borderRadius: 8,           // 圆角 (默认: 0)
  opacity: 1,                // 透明度
  rotation: 0,               // 旋转角度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### CircleElement

圆形元素

```javascript
new CircleElement({
  x: 100,                    // 圆心 x 坐标
  y: 200,                    // 圆心 y 坐标
  radius: 50,                // 半径
  fillColor: '#ef4444',      // 填充颜色
  strokeColor: '#dc2626',     // 边框颜色 (可选)
  strokeWidth: 2,            // 边框宽度 (可选)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### ImageElement

图片元素

```javascript
new ImageElement({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度
  height: 200,               // 高度
  src: 'https://example.com/image.png',  // 图片地址 (支持 URL 和 file:// 本地路径)
  opacity: 1,                // 透明度
  rotation: 0,               // 旋转角度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Divider

分隔线组件

```javascript
new Divider({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度
  color: '#e5e7eb',          // 颜色 (默认: #e5e7eb)
  thickness: 1,              // 粗细 (默认: 1)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

---

## 高级组件

### Button

按钮组件，支持文字、图标、渐变、阴影。

```javascript
new Button({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 200,                // 宽度 (默认: auto)
  height: 60,                // 高度 (默认: 60)
  text: '点击按钮',          // 按钮文字
  fontSize: 24,              // 字体大小 (默认: 24)
  fontFamily: 'Arial',       // 字体系列
  color: '#ffffff',           // 文字颜色 (默认: #ffffff)
  backgroundColor: '#3b82f6', // 背景颜色 (默认: #3b82f6)
  borderColor: '#1d4ed8',    // 边框颜色 (可选)
  borderWidth: 0,            // 边框宽度 (默认: 0)
  radius: 8,                 // 圆角 (默认: 8)
  padding: 30,               // 内边距 (默认: 30)
  shadow: {                  // 阴影 (可选)
    color: 'rgba(0,0,0,0.3)',
    blur: 10,
    offset: [0, 4]
  },
  gradient: {                // 渐变 (可选)
    colors: ['#3b82f6', '#8b5cf6'],
    direction: 'horizontal'  // horizontal/vertical
  },
  icon: '👍',               // 图标 (emoji 或 URL)
  iconPosition: 'left',      // 图标位置: left/right (默认: left)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Badge

徽章/标签组件，**支持根据文字内容自动适配宽高、垂直居中**。

```javascript
new Badge({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  text: 'NEW',               // 徽章文字
  fontSize: 18,              // 字体大小 (默认: 18)
  fontFamily: 'Arial',       // 字体系列
  color: '#ffffff',           // 文字颜色 (默认: #ffffff)
  backgroundColor: '#3b82f6', // 背景颜色 (默认: #007bff)
  borderColor: '#1d4ed8',    // 边框颜色 (可选)
  padding: 15,               // 内边距 (默认: 15)
  radius: 4,                 // 圆角 (默认: 4)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

**特性：**
- 宽度自动适配文字内容（padding * 2 + 文字宽度）
- 文字垂直居中于背景
- 使用 Paper.js bounds 精确测量文字尺寸

### ImageFrame

图片框组件，**支持网络图片、本地图片、cover/contain 裁剪**。

```javascript
new ImageFrame({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度
  height: 300,              // 高度
  src: 'https://example.com/image.png',  // 图片地址 (支持 URL 和 file:// 本地路径)
  borderColor: '#ffffff',    // 边框颜色 (默认: #ffffff)
  borderWidth: 3,            // 边框宽度 (默认: 3)
  outerColor: '#1a1a2e',     // 外边框颜色 (默认: #1a1a2e)
  outerWidth: 6,             // 外边框宽度 (默认: 6)
  radius: 8,                 // 圆角 (默认: 0)
  fit: 'cover',              // 适配模式: cover/contain (默认: cover)
  overlayColor: '#000000',   // 叠加色 (可选)
  overlayOpacity: 0,         // 叠加透明度 (默认: 0)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

**特性：**
- 支持网络图片 URL
- 支持本地图片 `file://` 协议
- cover 模式：填充整个区域，可能裁剪部分内容
- contain 模式：完整显示图片，可能留白
- 圆角裁剪正确应用
- 支持叠加色覆盖

### Quote

引用块组件，**支持自动换行**。

```javascript
new Quote({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度 (默认: 400)
  text: '引用内容文字',       // 引用文字
  author: '鲁迅',            // 作者 (可选)
  backgroundColor: '#2d2d3a', // 背景颜色 (默认: #2d2d3a)
  borderColor: '#00d9ff',    // 左边框颜色 (默认: #00d9ff)
  borderWidth: 4,            // 左边框宽度 (默认: 4)
  padding: 20,               // 内边距 (默认: 20)
  radius: 8,                 // 圆角 (默认: 8)
  textColor: '#ffffff',      // 文字颜色 (默认: #ffffff)
  authorColor: '#aaaaaa',    // 作者颜色 (默认: #aaaaaa)
  fontSize: 18,             // 字体大小 (默认: 18)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

**特性：**
- 自动换行，文本不超出边框
- 引号位置低于文字 baseline
- 作者位置在文字下方，距离更远

### Card

卡片组件，支持标题和副标题自动换行。

```javascript
new Card({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  height: 200,               // 高度
  backgroundColor: '#ffffff', // 背景颜色 (默认: #ffffff)
  borderColor: '#e5e7eb',    // 边框颜色 (可选)
  borderWidth: 1,            // 边框宽度 (可选)
  radius: 8,                 // 圆角 (默认: 0)
  padding: 20,               // 内边距 (默认: 20)
  title: '卡片标题',          // 标题文字
  titleSize: 24,            // 标题字体大小 (默认: 24)
  titleColor: '#000000',    // 标题颜色 (默认: #000000)
  subtitle: '副标题内容',     // 副标题文字 (可选)
  subtitleSize: 16,          // 副标题字体大小 (默认: 16)
  subtitleColor: '#666666', // 副标题颜色 (默认: #666666)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Avatar

头像组件

```javascript
new Avatar({
  x: 100,                    // x 坐标 (圆心)
  y: 200,                    // y 坐标 (圆心)
  size: 80,                  // 头像尺寸 (默认: 80)
  src: 'https://example.com/avatar.png',  // 图片地址 (可选)
  initials: 'JD',            // 首字母 (当无 src 时显示)
  backgroundColor: '#6366f1', // 背景颜色 (默认: #6366f1)
  borderColor: '#4f46e5',    // 边框颜色 (可选)
  borderWidth: 2,            // 边框宽度 (默认: 0)
  color: '#ffffff',           // 文字颜色 (默认: #ffffff)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Progress

进度条组件

```javascript
new Progress({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度 (默认: 300)
  height: 20,                // 高度 (默认: 20)
  value: 75,                 // 进度值 0-100 (默认: 50)
  trackColor: '#e5e7eb',     // 轨道颜色 (默认: #e0e0e0)
  fillColor: '#6366f1',      // 填充颜色 (默认: #6366f1)
  radius: 10,                // 圆角 (默认: 10)
  showLabel: false,          // 是否显示标签 (默认: false)
  label: '75%',             // 自定义标签文字 (可选)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Rating

星级评分组件

```javascript
new Rating({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  value: 4.5,                // 评分值 (默认: 4)
  max: 5,                   // 最大星数 (默认: 5)
  size: 24,                  // 星星大小 (默认: 24)
  filledColor: '#fbbf24',    // 填充颜色 (默认: #fbbf24)
  emptyColor: '#e5e7eb',    // 空星颜色 (默认: #e5e7eb)
  gap: 4,                    // 星星间距 (默认: 4)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Icon

图标组件，支持 emoji 和图片。

```javascript
new Icon({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  size: 64,                  // 图标尺寸 (默认: 64)
  icon: '👍',               // 图标内容 (emoji 或 URL)
  color: '#ffffff',          // 图标颜色 (可选，用于 emoji)
  backgroundColor: '#3b82f6', // 背景颜色 (可选)
  borderColor: '#1d4ed8',    // 边框颜色 (可选)
  borderWidth: 0,            // 边框宽度 (默认: 0)
  radius: 8,                 // 圆角 (默认: 0)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### CTA

行动号召按钮，比 Button 更强调视觉效果。

```javascript
new CTA({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度
  height: 80,                // 高度
  title: '立即开始',          // 主标题
  subtitle: '免费试用 30 天',  // 副标题 (可选)
  backgroundColor: '#3b82f6', // 背景颜色
  textColor: '#ffffff',       // 文字颜色
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Chip

小标签组件，类似 Badge 但更轻量。

```javascript
new Chip({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  text: '标签文字',           // 标签文字
  fontSize: 14,              // 字体大小 (默认: 14)
  color: '#3b82f6',          // 文字颜色
  backgroundColor: '#dbeafe', // 背景颜色
  radius: 12,                // 圆角 (默认: 12)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Timeline

时间线组件

```javascript
new Timeline({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  items: [                   // 时间线项
    { time: '2024-01-01', title: '事件1', description: '描述1' },
    { time: '2024-02-01', title: '事件2', description: '描述2' },
    { time: '2024-03-01', title: '事件3', description: '描述3' }
  ],
  lineColor: '#3b82f6',      // 线条颜色 (默认: #3b82f6)
  dotColor: '#3b82f6',       // 点颜色 (默认: #3b82f6)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### ListItem

列表项组件

```javascript
new ListItem({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  title: '列表项标题',         // 标题
  description: '列表项描述',  // 描述 (可选)
  thumb: 'https://example.com/thumb.png',  // 缩略图 (可选)
  arrow: true,              // 是否显示箭头 (默认: false)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Notification

通知/气泡组件

```javascript
new Notification({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  text: '通知内容',           // 通知文字
  type: 'info',              // 类型: info/success/warning/error (默认: info)
  fontSize: 16,              // 字体大小 (默认: 16)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Arrow

箭头组件

```javascript
new Arrow({
  x: 100,                    // 起点 x 坐标
  y: 200,                    // 起点 y 坐标
  toX: 300,                  // 终点 x 坐标
  toY: 300,                  // 终点 y 坐标
  color: '#3b82f6',          // 箭头颜色
  strokeWidth: 2,            // 线宽 (默认: 2)
  headSize: 10,              // 箭头大小 (默认: 10)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Bubble

气泡/聊天气泡组件

```javascript
new Bubble({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度
  text: '气泡内容',           // 气泡文字
  direction: 'left',         // 气泡方向: left/right (默认: left)
  backgroundColor: '#3b82f6', // 背景颜色
  textColor: '#ffffff',      // 文字颜色
  fontSize: 16,              // 字体大小 (默认: 16)
  fontFamily: 'Arial',       // 字体系列
  padding: 15,               // 内边距 (默认: 15)
  radius: 16,                // 圆角 (默认: 16)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Ribbon

缎带/彩带组件

```javascript
new Ribbon({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 200,                // 宽度
  text: '热卖',              // 缎带文字
  color: '#ef4444',          // 缎带颜色
  fontSize: 18,              // 字体大小 (默认: 18)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Seal

印章组件

```javascript
new Seal({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  size: 100,                 // 印章尺寸 (默认: 100)
  text: '官方认证',           // 印章文字
  color: '#ef4444',          // 印章颜色
  fontSize: 14,              // 字体大小 (默认: 14)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Watermark

水印组件

```javascript
new Watermark({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  text: '水印文字',           // 水印文字
  fontSize: 24,              // 字体大小 (默认: 24)
  color: 'rgba(0,0,0,0.1)',  // 水印颜色 (默认: rgba(0,0,0,0.1))
  fontFamily: 'Arial',       // 字体系列
  rotation: -30,             // 旋转角度 (默认: -30)
  opacity: 0.5,              // 透明度 (默认: 0.5)
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### TagCloud

标签云组件

```javascript
new TagCloud({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  tags: [                    // 标签列表
    { text: 'JavaScript', weight: 5 },
    { text: 'React', weight: 4 },
    { text: 'Node.js', weight: 3 }
  ],
  minSize: 14,              // 最小字体 (默认: 14)
  maxSize: 32,              // 最大字体 (默认: 32)
  colors: ['#3b82f6', '#22c55e', '#f59e0b'],  // 颜色数组
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Stepper

步骤指示器组件

```javascript
new Stepper({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  steps: [                   // 步骤列表
    { label: '步骤 1', status: 'completed' },
    { label: '步骤 2', status: 'active' },
    { label: '步骤 3', status: 'pending' }
  ],
  activeColor: '#3b82f6',   // 激活颜色 (默认: #3b82f6)
  completedColor: '#22c55e', // 完成颜色 (默认: #22c55e)
  pendingColor: '#e5e7eb',  // 待处理颜色 (默认: #e5e7eb)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Table

表格组件

```javascript
new Table({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 500,                // 宽度
  headers: ['姓名', '年龄', '城市'],  // 表头
  rows: [                    // 数据行
    ['张三', '28', '北京'],
    ['李四', '32', '上海'],
    ['王五', '25', '广州']
  ],
  headerBgColor: '#f3f4f6', // 表头背景色 (默认: #f3f4f6)
  headerColor: '#374151',   // 表头文字色 (默认: #374151)
  rowBgColor: '#ffffff',    // 行背景色 (默认: #ffffff)
  rowColor: '#6b7280',      // 行文字色 (默认: #6b7280)
  borderColor: '#e5e7eb',   // 边框颜色 (默认: #e5e7eb)
  fontSize: 14,              // 字体大小 (默认: 14)
  fontFamily: 'Arial',       // 字体系列
  padding: 12,               // 单元格内边距 (默认: 12)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### HighlightText

高亮文本组件

```javascript
new HighlightText({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  text: '这是要高亮的文本',   // 完整文本
  highlight: '高亮',        // 要高亮的部分
  fontSize: 24,              // 字体大小 (默认: 24)
  color: '#000000',          // 文字颜色 (默认: #000000)
  highlightColor: '#fbbf24', // 高亮背景色 (默认: #fbbf24)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Grid

网格布局组件

```javascript
new Grid({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  columns: 3,               // 列数 (默认: 3)
  rows: 3,                  // 行数 (默认: 3)
  gap: 10,                  // 元素间距 (默认: 10)
  backgroundColor: '#f3f4f6', // 背景颜色 (可选)
  padding: 10,               // 内边距 (默认: 10)
  radius: 8,                 // 圆角 (默认: 8)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Columns

多列布局组件

```javascript
new Columns({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 600,                // 宽度
  count: 3,                  // 列数 (默认: 2)
  gap: 20,                   // 列间距 (默认: 20)
  items: [                   // 列内容
    { elements: [...] },
    { elements: [...] },
    { elements: [...] }
  ],
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Barcode

条形码组件

```javascript
new Barcode({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 300,                // 宽度 (默认: 300)
  height: 80,                // 高度 (默认: 80)
  value: '123456789012',     // 条形码数值
  format: 'CODE128',         // 格式 (默认: CODE128)
  color: '#000000',          // 条形码颜色 (默认: #000000)
  showValue: true,           // 是否显示数值 (默认: true)
  fontSize: 14,              // 数值字体大小 (默认: 14)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### QRCode

二维码组件

```javascript
new QRCode({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  size: 200,                 // 二维码尺寸 (默认: 200)
  value: 'https://example.com',  // 二维码内容 (也支持 content 属性)
  color: '#000000',          // 二维码颜色 (默认: #000000)
  backgroundColor: '#ffffff', // 背景色 (默认: #ffffff)
  errorLevel: 'M',           // 纠错级别: L/M/Q/H (默认: M)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Frame

装饰边框组件

```javascript
new Frame({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度
  height: 300,              // 高度
  style: 'classic',         // 边框样式: classic/modern/simple (默认: classic)
  color: '#d4af37',          // 边框颜色 (默认: #d4af37)
  borderWidth: 8,            // 边框宽度 (默认: 8)
  padding: 20,               // 内边距 (默认: 20)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Chart

图表组件

```javascript
new Chart({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 400,                // 宽度 (默认: 400)
  height: 300,              // 高度 (默认: 300)
  type: 'bar',              // 图表类型: bar/line/pie (默认: bar)
  data: {                   // 图表数据
    labels: ['一月', '二月', '三月', '四月'],
    datasets: [{
      label: '销售额',
      data: [120, 190, 80, 160],
      backgroundColor: '#3b82f6'
    }]
  },
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Feature

特性展示组件

```javascript
new Feature({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  icon: '🚀',               // 特性图标 (emoji)
  title: '高性能',           // 特性标题
  description: '秒级响应，处理速度快',  // 特性描述
  iconSize: 48,              // 图标尺寸 (默认: 48)
  fontSize: 18,              // 标题字体大小 (默认: 18)
  descriptionSize: 14,       // 描述字体大小 (默认: 14)
  iconColor: '#3b82f6',     // 图标颜色 (可选)
  titleColor: '#000000',    // 标题颜色 (默认: #000000)
  descriptionColor: '#666666', // 描述颜色 (默认: #666666)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### FeatureGrid

特性网格组件

```javascript
new FeatureGrid({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 600,                // 宽度
  columns: 2,                // 列数 (默认: 2)
  features: [                // 特性列表
    { icon: '🚀', title: '高性能', description: '秒级响应' },
    { icon: '🔒', title: '安全可靠', description: '端到端加密' },
    { icon: '☁️', title: '云原生', description: '弹性扩展' },
    { icon: '📊', title: '数据分析', description: '实时监控' }
  ],
  gap: 20,                   // 间距 (默认: 20)
  iconSize: 32,              // 图标尺寸 (默认: 32)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### StatCard

统计卡片组件

```javascript
new StatCard({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  width: 200,                // 宽度 (默认: 200)
  value: '12,847',           // 数值
  label: '总用户',            // 标签
  change: '+23%',            // 变化值 (可选)
  changeColor: '#22c55e',   // 变化颜色 (默认: #22c55e)
  icon: '👥',               // 图标 (可选)
  fontSize: 28,              // 数值字体大小 (默认: 28)
  labelSize: 14,             // 标签字体大小 (默认: 14)
  valueColor: '#000000',     // 数值颜色 (默认: #000000)
  labelColor: '#666666',     // 标签颜色 (默认: #666666)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### ProgressCircle

圆形进度组件

```javascript
new ProgressCircle({
  x: 100,                    // x 坐标 (圆心)
  y: 200,                    // y 坐标 (圆心)
  size: 120,                 // 圆形尺寸 (默认: 120)
  value: 75,                 // 进度值 0-100 (默认: 50)
  strokeWidth: 10,           // 线条粗细 (默认: 10)
  trackColor: '#e5e7eb',     // 轨道颜色 (默认: #e5e7eb)
  fillColor: '#3b82f6',      // 进度颜色 (默认: #3b82f6)
  showValue: true,           // 是否显示数值 (默认: true)
  fontSize: 24,              // 数值字体大小 (默认: 24)
  fontFamily: 'Arial',       // 字体系列
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

### Star

单个星星组件

```javascript
new Star({
  x: 100,                    // x 坐标
  y: 200,                    // y 坐标
  size: 32,                  // 星星尺寸 (默认: 32)
  filled: true,             // 是否填充 (默认: true)
  color: '#fbbf24',          // 星星颜色 (默认: #fbbf24)
  opacity: 1,                // 透明度
  visible: true,             // 是否可见
  zIndex: 0                  // 层级
})
```

---

## 完整示例

```javascript
const { PosterBuilder, TextElement, Button, Badge, Card, ImageFrame, Quote } = require('./src/index')

async function main() {
  // 创建海报
  const poster = new PosterBuilder({
    width: 1080,
    height: 1920,
    backgroundColor: '#f8fafc'
  })

  // 创建主图层
  poster.initialize()
  const mainLayer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 添加头部
  mainLayer.addElement(new TextElement({
    x: 40, y: 40,
    text: '我的海报标题',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e293b'
  }))

  // 添加徽章 (自动适配宽高)
  mainLayer.addElement(new Badge({
    x: 40, y: 120,
    text: 'NEW',
    fontSize: 14,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    radius: 4
  }))

  // 添加图片框
  mainLayer.addElement(new ImageFrame({
    x: 40, y: 180,
    width: 320, height: 200,
    src: 'https://picsum.photos/400/300',
    borderColor: '#3b82f6',
    borderWidth: 3,
    radius: 8,
    fit: 'cover'
  }))

  // 添加引用块
  mainLayer.addElement(new Quote({
    x: 40, y: 420,
    width: 320,
    text: '这是一段很长的引用文字，会自动换行显示',
    author: '鲁迅',
    backgroundColor: '#2d2d3a',
    borderColor: '#00d9ff',
    padding: 20
  }))

  // 添加卡片
  mainLayer.addElement(new Card({
    x: 40, y: 600,
    width: 320,
    height: 200,
    title: '产品特点',
    subtitle: '高性能、安全可靠、云原生',
    backgroundColor: '#ffffff',
    radius: 12,
    padding: 20
  }))

  // 添加按钮
  mainLayer.addElement(new Button({
    x: 40, y: 840,
    width: 320,
    height: 56,
    text: '立即购买',
    fontSize: 20,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    radius: 8
  }))

  // 导出
  const outputPath = await poster.exportPNG('my-poster', './output')
  console.log('海报已生成:', outputPath)

  poster.destroy()
}

main().catch(console.error)
```

---

## 注意事项

1. **坐标系统**: 所有元素的 x, y 都是相对于父容器的左上角
2. **百分比支持**: 位置和尺寸支持百分比字符串，如 `'50%'`
3. **透明度**: opacity 值为 0-1 之间，0 表示完全透明，1 表示完全不透明
4. **图层顺序**: 通过 zIndex 控制元素的渲染顺序，数值越大越在上层
5. **销毁清理**: 使用完 poster 后调用 `destroy()` 方法释放资源
6. **字体回退**: 中文文本会自动使用字体回退链确保渲染效果
7. **图片加载**: ImageElement 和 ImageFrame 支持网络 URL 和本地 file:// 路径
8. **Badge 自动适配**: Badge 根据文字内容自动调整宽高，文字垂直居中
9. **Quote 自动换行**: Quote 组件自动将长文本换行，不超出边框
10. **ImageFrame 裁剪**: 使用 Group.clipped 实现圆角裁剪
