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
    height: 900,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '引用与时间线测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Quote 引用
  layer.addElement(new Quote({
    x: 400, y: 150, width: 500,
    text: '生活不是等待暴风雨过去，而是学会在雨中起舞。',
    author: '村上春树',
    backgroundColor: '#0f3460', color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 多行 Quote
  layer.addElement(new Quote({
    x: 400, y: 280, width: 500,
    text: '这是一段比较长的文本，用于测试文字自动换行功能是否正常工作，文本应该能够自动适配组件宽度并分成多行显示',
    author: '测试作者',
    backgroundColor: '#e94560', color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 短 Quote
  layer.addElement(new Quote({
    x: 400, y: 450, width: 500,
    text: '追求卓越，成功自然而来。',
    author: '科比',
    backgroundColor: '#533483', color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // Divider 分隔线
  layer.addElement(new Divider({
    x: 400, y: 560, width: 300, thickness: 2,
    color: '#533483', style: 'solid', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Divider({
    x: 400, y: 620, width: 300, thickness: 2,
    color: '#00d9ff', style: 'dashed', anchor: [0.5, 0.5]
  }))

  // Timeline 时间线
  layer.addElement(new Timeline({
    x: 400, y: 720, width: 500, height: 180,
    items: [
      { date: '2024', title: '项目启动', desc: '完成初期调研和规划' },
      { date: '2025', title: '产品上线', desc: '正式发布首个版本' },
      { date: '2026', title: '用户破百万', desc: '活跃用户数突破100万' },
    ],
    anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('07-quote-timeline', '../output')
  poster.destroy()
  console.log('Quote and timeline test saved to output/07-quote-timeline.png')
}

main().catch(console.error)