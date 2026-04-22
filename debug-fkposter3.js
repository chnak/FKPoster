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

  console.log('=== Tracing render flow ===')
  
  // 拦截 card.initialize
  const origCardInit = card.initialize.bind(card)
  card.initialize = function(paper) {
    console.log('card.initialize called')
    console.log('  badge._initialized before:', badge._initialized)
    origCardInit(paper)
    console.log('  badge._initialized after:', badge._initialized)
    console.log('  badge.width:', badge.width, 'badge.height:', badge.height)
  }

  // 拦截 layer.render
  const origLayerRender = layer.render.bind(layer)
  layer.render = async function(paper, context) {
    console.log('layer.render called')
    console.log('  badge._initialized:', badge._initialized)
    console.log('  badge.width:', badge.width, 'badge.height:', badge.height)
    await origLayerRender(paper, context)
    console.log('  After layer.render - badge._initialized:', badge._initialized)
  }

  // 拦截 card.render
  const origCardRender = card.render.bind(card)
  card.render = function(paper, context) {
    console.log('card.render called')
    console.log('  badge._initialized before:', badge._initialized)
    origCardRender(paper, context)
    console.log('  badge._initialized after:', badge._initialized)
    console.log('  badge.width:', badge.width, 'badge.height:', badge.height)
  }

  await poster.exportPNG('debug-fkposter3', './output')
  console.log('\nDone')
  poster.destroy()
}

main().catch(console.error)
