/**
 * 测试文本相关组件
 * HighlightText, Quote, TagCloud, Watermark, Bubble, Stepper
 */
const {
  PosterBuilder,
  HighlightText,
  Quote,
  TagCloud,
  Watermark,
  Bubble,
  Stepper,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#f8fafc'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })
  const cx = 400
  let y = 40

  // HighlightText 高亮文字
  const highlightText = new HighlightText({
    x: cx, y: y, width: 300,
    text: '重要公告', highlightColor: '#fef08a', textColor: '#1e293b',
    highlightStyle: 'background',
    anchor: [0.5, 0.5]
  })
  layer.addElement(highlightText)
  y += 80

  // Quote 引用
  const quote = new Quote({
    x: cx, y: y, width: 350,
    text: '这是引用内容的文本', author: '引用作者',
    backgroundColor: '#2d2d3a', borderColor: '#00d9ff',
    anchor: [0.5, 0.5]
  })
  layer.addElement(quote)
  y += 140

  // TagCloud 标签云
  const tagCloud = new TagCloud({
    x: cx, y: y, width: 400,
    tags: ['JavaScript', 'Python', 'React', 'Vue', 'Node.js', 'TypeScript'],
    anchor: [0.5, 0.5]
  })
  layer.addElement(tagCloud)
  y += 100

  // Watermark 水印
  const watermark = new Watermark({
    x: cx, y: y, width: 300, height: 60,
    text: '机密文档', color: 'rgba(0,0,0,0.08)',
    anchor: [0.5, 0.5]
  })
  layer.addElement(watermark)
  y += 100

  // Bubble 气泡
  const bubble = new Bubble({
    x: cx, y: y, width: 250, height: 70,
    text: '这是一条气泡提示消息', backgroundColor: '#1e293b', textColor: '#ffffff',
    anchor: [0.5, 0.5]
  })
  layer.addElement(bubble)
  y += 100

  // Stepper 步骤器
  const stepper = new Stepper({
    x: cx, y: y, width: 400,
    steps: ['下单', '支付', '发货', '完成'],
    currentStep: 1,
    anchor: [0.5, 0.5]
  })
  layer.addElement(stepper)

  await poster.exportPNG('test-text-components', './output')
  console.log('Text components test saved to output/test-text-components.png')
  poster.destroy()
}

main().catch(console.error)
