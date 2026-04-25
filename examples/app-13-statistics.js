/**
 * 应用示例 - 统计图表
 * Statistics Chart
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Chart,
  StatCard,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 400,
    backgroundColor: '#f8fafc'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  layer.addElement(new TextElement({
    x: 300, y: 40, text: '2026年第一季度数据概览', fontSize: 24,
    color: '#1e293b', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 统计卡片
  layer.addElement(new StatCard({
    x: 110, y: 100, width: 160, height: 80,
    value: '12,580',
    label: '总访问量',
    change: '+23%',
    positive: true,
    icon: '👁',
    backgroundColor: '#6366f1'
  }))

  layer.addElement(new StatCard({
    x: 300, y: 100, width: 160, height: 80,
    value: '8,420',
    label: '活跃用户',
    change: '+15%',
    positive: true,
    icon: '👤',
    backgroundColor: '#10b981'
  }))

  layer.addElement(new StatCard({
    x: 490, y: 100, width: 160, height: 80,
    value: '¥256,800',
    label: '总收入',
    change: '+32%',
    positive: true,
    icon: '💰',
    backgroundColor: '#f59e0b'
  }))

  // 图表
  layer.addElement(new Chart({
    x: 300, y: 270, width: 550, height: 200,
    data: [65, 45, 80, 55, 90, 70, 85],
    labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
    barColor: '#6366f1',
    showLabels: true,
    showGrid: true,
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0'
  }))

  await poster.exportPNG('app-13-statistics', './output')
  poster.destroy()
  console.log('Statistics saved to output/app-13-statistics.png')
}

main().catch(console.error)