# FKPoster

[![npm version](https://img.shields.io/npm/v/@chnak/poster)](https://www.npmjs.com/package/@chnak/poster)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

基于 Paper.js 的新一代海报制作插件，支持多层级、组件化、相对坐标定位。

**GitHub**: https://github.com/chnak/FKPoster

## 特性

- **多层级管理** - 支持创建多个图层 (Layer)，方便管理复杂海报的不同区域
- **组件化开发** - 通过 `createComponent` 创建可复用组件，支持背景色和子元素组合
- **相对坐标** - 支持百分比定位 (`'50%'`)，轻松实现居中、适配不同尺寸
- **丰富的组件库** - 内置 30+ 常用组件：Button、Badge、Card、Avatar、Progress、Rating、Icon、Quote 等
- **文本自动换行** - Card、Quote 等组件支持中文文本自动换行
- **多种导出格式** - 支持导出 PNG、SVG、Buffer、Base64

## 安装

```bash
npm install @chnak/poster
```

本地开发：
```bash
npm install
```

## 快速开始

```javascript
const { PosterBuilder, TextElement, Button, Badge } = require('@chnak/poster')

async function main() {
  // 1. 创建海报构建器
  const poster = new PosterBuilder({
    width: 1080,
    height: 1920,
    backgroundColor: '#ffffff'
  })

  // 2. 创建图层
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 3. 添加元素
  layer.addElement(new TextElement({
    x: 100, y: 200,
    text: 'Hello World',
    fontSize: 48,
    color: '#000000'
  }))

  layer.addElement(new Badge({
    x: 100, y: 300,
    text: 'NEW',
    fontSize: 18,
    backgroundColor: '#3b82f6',
    color: '#ffffff'
  }))

  // 4. 导出
  await poster.exportPNG('my-poster', '../output')
  poster.destroy()
}

main().catch(console.error)
```

## 核心概念

### PosterBuilder - 海报构建器

主入口类，负责创建画布、管理图层、导出图片。

```javascript
const poster = new PosterBuilder({
  width: 1080,        // 海报宽度
  height: 1920,       // 海报高度
  backgroundColor: '#ffffff'  // 背景色
})

// 使用预设尺寸
poster.usePreset('poster_square')   // 1080x1080
poster.usePreset('poster_9_16')     // 1080x1920

// 创建图层
const layer = poster.createLayer({ name: 'main', zIndex: 0 })

// 导出
await poster.exportPNG('filename', '../output')
```

### Layer - 图层

图层类，类似轨道，管理一组元素，支持 zIndex 排序。

```javascript
const layer = poster.createLayer({
  name: 'main',
  zIndex: 0
})

layer.addElement(element)
```

### Component - 组件

可复用的元素组合，支持背景色和子元素管理。

```javascript
// 创建组件 (已自动添加到 poster 管理)
const card = poster.createComponent({
  x: 100,
  y: 100,
  width: 300,
  height: 200,
  backgroundColor: '#3b82f6'
})

// 添加子元素 (坐标相对于组件)
card.addElement(new TextElement({
  x: 20, y: 20,
  text: '标题',
  fontSize: 24,
  color: '#ffffff'
}))
```

## 基础元素

| 元素 | 说明 |
|------|------|
| `TextElement` | 文本元素 |
| `RectElement` | 矩形元素 |
| `CircleElement` | 圆形元素 |
| `ImageElement` | 图片元素 |
| `DividerElement` | 分隔线 |

## 高级组件

| 组件 | 说明 |
|------|------|
| `Button` | 按钮 |
| `Badge` | 徽章/标签 |
| `Card` | 卡片 |
| `CTA` | 行动号召按钮 |
| `Chip` | 小标签 |
| `Avatar` | 头像 |
| `Divider` | 分隔线 |
| `Progress` | 进度条 |
| `Rating` | 星级评分 |
| `Quote` | 引用块 |
| `Timeline` | 时间线 |
| `Star` | 星星 |
| `Feature` | 特性展示 |
| `FeatureGrid` | 特性网格 |
| `StatCard` | 统计卡片 |
| `ListItem` | 列表项 |
| `ProgressCircle` | 圆形进度 |
| `Notification` | 通知 |
| `ImageFrame` | 图片框架 |
| `Arrow` | 箭头 |
| `Bubble` | 气泡 |
| `Ribbon` | 缎带 |
| `Seal` | 印章 |
| `Watermark` | 水印 |
| `Icon` | 图标 |
| `TagCloud` | 标签云 |
| `Stepper` | 步骤指示器 |
| `Table` | 表格 |
| `HighlightText` | 高亮文本 |
| `Grid` | 网格 |
| `Columns` | 多列布局 |
| `Barcode` | 条形码 |
| `QRCode` | 二维码 |
| `Frame` | 装饰边框 |
| `Chart` | 图表 |

## 完整示例

### 名片

```javascript
const { PosterBuilder, Avatar, TextElement, Divider, Badge } = require('@chnak/poster')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 400,
    backgroundColor: '#f8fafc'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 头像
  layer.addElement(new Avatar({
    x: 80, y: 80,
    size: 80,
    initials: 'LN',
    backgroundColor: '#6366f1'
  }))

  // 姓名
  layer.addElement(new TextElement({
    x: 180, y: 90,
    text: '李明',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b'
  }))

  // 职位
  layer.addElement(new TextElement({
    x: 180, y: 130,
    text: '高级产品经理',
    fontSize: 16,
    color: '#64748b'
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 80, y: 180,
    width: 440,
    thickness: 1,
    color: '#e2e8f0'
  }))

  // 联系信息
  layer.addElement(new TextElement({
    x: 80, y: 210,
    text: '邮箱：liming@example.com',
    fontSize: 14,
    color: '#475569'
  }))

  layer.addElement(new TextElement({
    x: 80, y: 240,
    text: '电话：138-8888-8888',
    fontSize: 14,
    color: '#475569'
  }))

  // 标签
  layer.addElement(new Badge({
    x: 80, y: 300,
    text: '活跃用户',
    fontSize: 12,
    backgroundColor: '#dbeafe',
    color: '#3b82f6',
    radius: 4
  }))

  await poster.exportPNG('namecard', '../output')
  poster.destroy()
}

main().catch(console.error)
```

### 活动海报

```javascript
const { PosterBuilder, TextElement, Button, Badge, Card, Divider } = require('@chnak/poster')

async function main() {
  const poster = new PosterBuilder({
    width: 1080,
    height: 1920,
    backgroundColor: '#0f172a'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  layer.addElement(new TextElement({
    x: '50%', y: 200,
    text: '春季大促',
    fontSize: 72,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    anchor: [0.5, 0]
  }))

  // 副标题
  layer.addElement(new TextElement({
    x: '50%', y: 300,
    text: '全场低至 5 折',
    fontSize: 36,
    color: '#fbbf24',
    textAlign: 'center',
    anchor: [0.5, 0]
  }))

  // 按钮
  layer.addElement(new Button({
    x: '50%', y: 500,
    width: 300,
    height: 80,
    text: '立即抢购',
    fontSize: 28,
    backgroundColor: '#ef4444',
    color: '#ffffff',
    radius: 12,
    anchor: [0.5, 0]
  }))

  await poster.exportPNG('poster-event', '../output')
  poster.destroy()
}

main().catch(console.error)
```

## 运行示例

```bash
# 基本示例
npm run example:basic

# 组件示例
npm run example:component

# 布局示例
npm run example:layout

# 或直接运行
node examples/namecard-demo.js
node examples/poster-event.js
node examples/poster-movie.js
```

## API 文档

详细参数说明请参阅 [skill.md](./skill.md)。

## 项目结构

```
src/
├── core/           # 核心类
│   ├── PosterBuilder.js  # 海报构建器
│   ├── Layer.js          # 图层
│   ├── Component.js       # 组件基类
│   └── BaseElement.js     # 元素基类
├── elements/        # 基础元素
│   ├── TextElement.js
│   ├── RectElement.js
│   ├── CircleElement.js
│   ├── ImageElement.js
│   └── DividerElement.js
├── components/      # 高级组件
│   ├── Button.js
│   ├── Badge.js
│   ├── Card.js
│   └── ...
└── index.js        # 入口文件
```

## 注意事项

1. **坐标系统** - 所有元素的 x, y 都是相对于父容器的左上角
2. **百分比支持** - 位置和尺寸支持百分比字符串，如 `'50%'`
3. **组件管理** - `createComponent` 创建的组件已自动由 poster 管理，不需要再添加到 layer
4. **销毁清理** - 使用完 poster 后调用 `destroy()` 方法释放资源
5. **字体回退** - 中文文本会自动使用字体回退链确保渲染效果

## License

MIT
