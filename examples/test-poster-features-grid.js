/**
 * 产品特点展示 - 使用 Grid 布局
 */
const {
  PosterBuilder,
  TextElement,
  Grid,
  Icon,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 480,
    height: 400,
    backgroundColor: '#f8fafc'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  const title = new TextElement({
    x: padding, y: padding, width: 432,
    text: '为什么选择我们',
    fontSize: 28, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(title)

  // 产品特点数据
  const features = [
    { icon: '🚀', title: '高性能', desc: '秒级响应，处理速度快' },
    { icon: '🔒', title: '安全可靠', desc: '端到端加密' },
    { icon: '☁️', title: '云原生', desc: '弹性扩展' },
    { icon: '📊', title: '数据分析', desc: '实时监控' },
    { icon: '⚡', title: '高可用', desc: '99.9% 可用性' },
    { icon: '🎯', title: '精准定位', desc: '智能推荐系统' },
  ]

  // 使用 Grid 布局
  const grid = new Grid({
    x: padding,
    y: 70,
    width: 432,
    height: 300,
    columns: 3,
    rows: 2,
    gapX: 16,
    gapY: 16,
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    radius: 12
  })

  // 获取布局信息
  const layout = grid.getLayout({ width: 480, height: 400 })

  // 渲染 Grid 背景
  layer.addElement(grid)

  // 添加每个特点到对应的格子
  for (let i = 0; i < features.length; i++) {
    const pos = layout.cellPositions[i]
    const f = features[i]

    // 图标
    const iconEl = new TextElement({
      x: pos.centerX - 30, y: pos.y + 20, width: 60,
      text: f.icon, fontSize: 32, textAlign: 'center'
    })
    layer.addElement(iconEl)

    // 标题
    const titleEl = new TextElement({
      x: pos.x + 10, y: pos.y + 60, width: pos.width - 20,
      text: f.title, fontSize: 14, color: '#1e293b', fontWeight: 'bold', textAlign: 'center'
    })
    layer.addElement(titleEl)

    // 描述
    const descEl = new TextElement({
      x: pos.x + 10, y: pos.y + 82, width: pos.width - 20,
      text: f.desc, fontSize: 11, color: '#64748b', textAlign: 'center'
    })
    layer.addElement(descEl)
  }

  await poster.exportPNG('features-grid', './output')
  console.log('Features grid saved to output/features-grid.png')
  poster.destroy()
}

main().catch(console.error)
