/**
 * 数据仪表盘卡片
 */
const {
  PosterBuilder,
  Card,
  StatCard,
  ProgressCircle,
  Chart,
  Divider,
  TextElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 900,
    height: 700,
    backgroundColor: '#0f172a'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  const title = new TextElement({
    x: 450, y: 40, text: '数据概览', fontSize: 28, fontFamily: 'Microsoft YaHei',
    color: '#ffffff', textAlign: 'center', fontWeight: 'bold',
    anchor: [0.5, 0.5]
  })
  layer.addElement(title)

  // 统计数据行
  const statsY = 120

  const stat1 = new StatCard({
    x: 150, y: statsY, width: 200, height: 100,
    value: '12,845', label: '总访问量',
    backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1, radius: 12,
    anchor: [0.5, 0.5]
  })
  layer.addElement(stat1)

  const stat2 = new StatCard({
    x: 450, y: statsY, width: 200, height: 100,
    value: '3,521', label: '活跃用户',
    backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1, radius: 12,
    anchor: [0.5, 0.5]
  })
  layer.addElement(stat2)

  const stat3 = new StatCard({
    x: 750, y: statsY, width: 200, height: 100,
    value: '89.2%', label: '转化率',
    backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1, radius: 12,
    anchor: [0.5, 0.5]
  })
  layer.addElement(stat3)

  // 图表卡片
  const chartCard = new Card({
    x: 300, y: 360, width: 500, height: 250,
    title: '月度趋势', backgroundColor: '#1e293b', borderColor: '#334155', borderWidth: 1, radius: 12,
    padding: 20,
    anchor: [0.5, 0.5]
  })
  layer.addElement(chartCard)

  const chart = new Chart({
    x: 300, y: 340, width: 450, height: 180,
    data: [65, 85, 72, 95, 88, 102, 110],
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    barColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(chart)

  // 右侧进度环
  const progressY = 380
  const progressCircle = new ProgressCircle({
    x: 750, y: progressY, radius: 50,
    value: 78, strokeWidth: 10,
    fillColor: '#22c55e', trackColor: '#334155',
    showLabel: true,
    anchor: [0.5, 0.5]
  })
  layer.addElement(progressCircle)

  const progressLabel = new TextElement({
    x: 750, y: 500, text: '完成率', fontSize: 14, fontFamily: 'Microsoft YaHei',
    color: '#94a3b8', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(progressLabel)

  await poster.exportPNG('dashboard-card', './output')
  console.log('Dashboard card saved to output/dashboard-card.png')
  poster.destroy()
}

main().catch(console.error)
