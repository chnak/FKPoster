/**
 * 数据仪表盘卡片 - 使用 Grid 布局
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Grid,
  CircleElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 520,
    height: 340,
    backgroundColor: '#f1f5f9'
  })

  const padding = 20
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  const title = new TextElement({
    x: padding, y: padding, width: 300,
    text: '数据概览',
    fontSize: 20, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(title)

  const subtitle = new TextElement({
    x: padding, y: padding + 25, width: 300,
    text: '2024年12月',
    fontSize: 12, color: '#64748b'
  })
  layer.addElement(subtitle)

  // 统计卡片数据
  const stats = [
    { label: '总用户', value: '12,847', change: '+23%', color: '#3b82f6' },
    { label: '活跃用户', value: '8,234', change: '+15%', color: '#22c55e' },
    { label: '收入', value: '¥98,500', change: '+32%', color: '#f59e0b' },
    { label: '转化率', value: '4.8%', change: '+2.1%', color: '#8b5cf6' },
  ]

  // 使用 Grid 布局 (4列 x 1行)
  const grid = new Grid({
    x: padding,
    y: 70,
    width: 480,
    height: 100,
    columns: 4,
    rows: 1,
    gapX: 12,
    gapY: 0,
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    radius: 8
  })

  const layout = grid.getLayout({ width: 520, height: 340 })
  layer.addElement(grid)

  // 添加每个统计卡片
  for (let i = 0; i < stats.length; i++) {
    const pos = layout.cellPositions[i]
    const s = stats[i]

    // 顶部色条
    const colorBar = new RectElement({
      x: pos.x, y: pos.y, width: pos.width, height: 4,
      fillColor: s.color
    })
    layer.addElement(colorBar)

    // 数值
    const valueText = new TextElement({
      x: pos.x, y: pos.y + 20, width: pos.width,
      text: s.value, fontSize: 22, color: '#1e293b', fontWeight: 'bold', textAlign: 'center'
    })
    layer.addElement(valueText)

    // 标签
    const labelText = new TextElement({
      x: pos.x, y: pos.y + 48, width: pos.width,
      text: s.label, fontSize: 11, color: '#64748b', textAlign: 'center'
    })
    layer.addElement(labelText)

    // 变化
    const changeText = new TextElement({
      x: pos.x, y: pos.y + 68, width: pos.width,
      text: s.change, fontSize: 11, color: s.color, textAlign: 'center'
    })
    layer.addElement(changeText)
  }

  // 图表区域 - 使用 Grid 布局 (2列 x 1行)
  const chartGrid = new Grid({
    x: padding,
    y: 185,
    width: 480,
    height: 130,
    columns: 2,
    rows: 1,
    gapX: 12,
    gapY: 0,
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    radius: 8
  })

  const chartLayout = chartGrid.getLayout({ width: 520, height: 340 })
  layer.addElement(chartGrid)

  // 左侧：柱状图示意
  const barTitle = new TextElement({
    x: chartLayout.cellPositions[0].x + 10,
    y: chartLayout.cellPositions[0].y + 10,
    width: chartLayout.cellPositions[0].width - 20,
    text: '月度趋势',
    fontSize: 12, color: '#475569', fontWeight: 'bold'
  })
  layer.addElement(barTitle)

  // 简单的柱状图
  const bars = [60, 75, 45, 90, 65, 80, 95]
  const barWidth = 30
  const barGap = 12
  const startX = chartLayout.cellPositions[0].x + 20
  const barBaseY = chartLayout.cellPositions[0].y + 110

  for (let i = 0; i < bars.length; i++) {
    const barHeight = bars[i]
    const barX = startX + i * (barWidth + barGap)
    const barY = barBaseY - barHeight

    const bar = new RectElement({
      x: barX, y: barY, width: barWidth, height: barHeight,
      fillColor: '#3b82f6', opacity: 0.8
    })
    layer.addElement(bar)
  }

  // 右侧：饼图示意
  const pieTitle = new TextElement({
    x: chartLayout.cellPositions[1].x + 10,
    y: chartLayout.cellPositions[1].y + 10,
    width: chartLayout.cellPositions[1].width - 20,
    text: '用户分布',
    fontSize: 12, color: '#475569', fontWeight: 'bold'
  })
  layer.addElement(pieTitle)

  // 简单的饼图（用圆圈代替）
  const pieCenter = {
    x: chartLayout.cellPositions[1].x + 60,
    y: chartLayout.cellPositions[1].y + 75
  }

  const pie1 = new CircleElement({
    x: pieCenter.x, y: pieCenter.y, radius: 35,
    fillColor: '#3b82f6', opacity: 0.9
  })
  layer.addElement(pie1)

  const pie2 = new CircleElement({
    x: pieCenter.x + 10, y: pieCenter.y - 5, radius: 20,
    fillColor: '#22c55e', opacity: 0.9
  })
  layer.addElement(pie2)

  // 图例
  const legendY = chartLayout.cellPositions[1].y + 100
  const legend1 = new TextElement({
    x: chartLayout.cellPositions[1].x + 120, y: legendY - 20, width: 80,
    text: '● 新用户 65%', fontSize: 10, color: '#64748b'
  })
  layer.addElement(legend1)

  const legend2 = new TextElement({
    x: chartLayout.cellPositions[1].x + 120, y: legendY, width: 80,
    text: '● 老用户 35%', fontSize: 10, color: '#64748b'
  })
  layer.addElement(legend2)

  await poster.exportPNG('dashboard', './output')
  console.log('Dashboard saved to output/dashboard.png')
  poster.destroy()
}

main().catch(console.error)
