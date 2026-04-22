const { PosterBuilder, TextElement, Badge, RectElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 1920,
    height: 1080,
    backgroundColor: '#0f0c29'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  const badge = new Badge({
    x: 20, y: 60,
    text: '测试标签',
    fontSize: 14,
    backgroundColor: '#667eea',
    color: '#ffffff',
    radius: 6
  })

  console.log('Before init - badge.width:', badge.width, 'badge.height:', badge.height)

  // Initialize badge
  poster._initPaper()
  const paper = poster.paper
  badge.initialize(paper)

  console.log('After init - badge.width:', badge.width, 'badge.height:', badge.height)

  poster.destroy()
}

main().catch(console.error)
