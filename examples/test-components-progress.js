/**
 * 测试进度和评分组件
 * Progress, ProgressCircle, Rating, StatCard
 */
const {
  PosterBuilder,
  Progress,
  ProgressCircle,
  Rating,
  StatCard,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#f8fafc'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })
  const cx = 400
  let y = 40

  // Progress 进度条
  const progress = new Progress({
    x: cx, y: y, width: 300, height: 20,
    value: 75, trackColor: '#e2e8f0', fillColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(progress)
  y += 80

  // ProgressCircle 环形进度
  const progressCircle = new ProgressCircle({
    x: cx, y: y, radius: 60,
    value: 65, strokeWidth: 10,
    fillColor: '#3b82f6', trackColor: '#e5e7eb',
    showLabel: true,
    anchor: [0.5, 0.5]
  })
  layer.addElement(progressCircle)
  y += 150

  // Rating 评分
  const rating = new Rating({
    x: cx, y: y, value: 4.5, max: 5, size: 36,
    filledColor: '#fbbf24', emptyColor: '#e5e7eb',
    anchor: [0.5, 0.5]
  })
  layer.addElement(rating)
  y += 80

  // StatCard 统计卡片
  const statCard = new StatCard({
    x: cx, y: y, width: 280, height: 100,
    value: '12,345', label: '总用户', change: '+8.2%', positive: true,
    icon: '👥', iconColor: '#6366f1',
    anchor: [0.5, 0.5]
  })
  layer.addElement(statCard)

  await poster.exportPNG('test-progress-rating', './output')
  console.log('Progress and rating components test saved to output/test-progress-rating.png')
  poster.destroy()
}

main().catch(console.error)
