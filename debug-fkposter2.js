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

  const badge = new Badge({
    x: 40, y: 400,
    text: '视频轨道',
    fontSize: 12,
    backgroundColor: '#2d2d3d',
    color: '#a0aec0',
    padding: 6,
    radius: 4
  })
  card.addElement(badge)

  layer.addElement(card)

  // 拦截 badge.render
  const origBadgeRender = badge.render.bind(badge)
  badge.render = function(paper, context) {
    console.log('Badge.render called:')
    console.log('  x:', this.x, 'y:', this.y)
    console.log('  width:', this.width, 'height:', this.height)
    console.log('  _initialized:', this._initialized)
    origBadgeRender(paper, context)
  }

  // 拦截 card.render
  const origCardRender = card.render.bind(card)
  card.render = function(paper, context) {
    console.log('\nCard.render called:')
    console.log('  children:', this.elements.length)
    origCardRender(paper, context)
  }

  console.log('Before export - badge.width:', badge.width, 'badge.height:', badge.height)

  await poster.exportPNG('debug-fkposter2', './output')
  console.log('\nDone')
  poster.destroy()
}

main().catch(console.error)
