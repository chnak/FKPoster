/**
 * 引用和时间线测试
 * Quote, Timeline, Divider
 */
const {
  PosterBuilder,
  TextElement,
  Quote,
  Timeline,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '引用与时间线测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Quote 引用
  layer.addElement(new Quote({
    x: 400, y: 150, width: 500, height: 100,
    text: '生活不是等待暴风雨过去，而是学会在雨中起舞。',
    backgroundColor: '#0f3460', color: '#ffffff', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Quote({
    x: 400, y: 280, width: 500, height: 80,
    text: '追求卓越，成功自然而来。',
    backgroundColor: '#e94560', color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // Divider 分隔线
  layer.addElement(new Divider({
    x: 400, y: 420, width: 300, thickness: 2,
    color: '#533483', style: 'solid', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Divider({
    x: 400, y: 480, width: 300, thickness: 2,
    color: '#00d9ff', style: 'dashed', anchor: [0.5, 0.5]
  }))

  // Timeline 时间线
  layer.addElement(new Timeline({
    x: 400, y: 580, width: 500, height: 100,
    items: [
      { title: '2024', desc: '项目启动' },
      { title: '2025', desc: '产品上线' },
      { title: '2026', desc: '用户破百万' },
    ],
    anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('07-quote-timeline', './output')
  poster.destroy()
  console.log('Quote and timeline test saved to output/07-quote-timeline.png')
}

main().catch(console.error)