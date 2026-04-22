const { PosterBuilder, TextElement, Badge, Divider, RectElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 1920,
    height: 1080,
    backgroundColor: '#0f0c29'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  const card = poster.createComponent({
    x: 80, y: 280,
    width: 400, height: 200,
    backgroundColor: '#1e1e2e'
  })

  card.addElement(new TextElement({
    x: 20, y: 20,
    text: '测试标题',
    fontSize: 24,
    color: '#ffffff'
  }))

  card.addElement(new Badge({
    x: 20, y: 60,
    text: '测试标签',
    fontSize: 14,
    backgroundColor: '#667eea',
    color: '#ffffff',
    radius: 6
  }))

  console.log('card elements:', card.elements.length)
  console.log('badge width:', card.elements[1]?.width)
  console.log('badge height:', card.elements[1]?.height)

  layer.addElement(card)

  await poster.exportPNG('debug-badge', './output')
  console.log('Done')
  poster.destroy()
}

main().catch(console.error)
