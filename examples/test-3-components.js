/**
 * 测试3个组件
 */
const {
  PosterBuilder,
  Card,
  Rating,
  ProgressCircle,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#f0f4f8'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 组件1: Card (居中在 x=400, y=150)
  const card = new Card({
    x: 400,
    y: 150,
    width: 400,
    height: 120,
    title: '产品特点',
    subtitle: '高性能、低功耗、易使用',
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderWidth: 2,
    radius: 12,
    padding: 20,
  })
  layer.addElement(card)

  // 组件2: Rating (居中在 x=400, y=280)
  const rating = new Rating({
    x: 400,
    y: 280,
    value: 4,
    max: 5,
    size: 40,
    color: '#fbbf24',
    anchor: [0.5, 0.5],
  })
  layer.addElement(rating)

  // 组件3: ProgressCircle (居中在 x=400, y=420)
  const progressCircle = new ProgressCircle({
    x: 400,
    y: 420,
    radius: 60,
    value: 75,
    strokeWidth: 12,
    fillColor: '#3b82f6',
    trackColor: '#e5e7eb',
    showLabel: true,
    anchor: [0.5, 0.5],
  })
  layer.addElement(progressCircle)

  await poster.exportPNG('test-3-components', 'output')
  console.log('Test 3 components saved to output/test-3-components.png')
}

main().catch(console.error)
