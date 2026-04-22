const { PosterBuilder, TextElement, Badge, RectElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 1920,
    height: 1080,
    backgroundColor: '#0f0c29'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  const card = poster.createComponent({
    x: 80, y: 280,
    width: 860, height: 480,
    backgroundColor: '#1e1e2e'
  })

  // 添加一个 RectElement 作为测试
  card.addElement(new RectElement({
    x: 0, y: 0,
    width: 6, height: 480,
    fillColor: '#667eea'
  }))

  // 测试 Badge
  const fbTags = ['视频轨道', '文字动画', '转场效果', '组件复用']
  fbTags.forEach((t, i) => {
    const badge = new Badge({
      x: 40 + i * 160, y: 400,
      text: t,
      fontSize: 12,
      backgroundColor: '#2d2d3d',
      color: '#a0aec0',
      padding: 6,
      radius: 4
    })
    console.log(`Badge[${i}]: x=${badge.x}, y=${badge.y}, width=${badge.width}, height=${badge.height}`)
    card.addElement(badge)
  })

  layer.addElement(card)

  await poster.exportPNG('debug-fkposter', './output')
  console.log('Done')
  poster.destroy()
}

main().catch(console.error)
