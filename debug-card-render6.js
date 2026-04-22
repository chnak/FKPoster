const { PosterBuilder, RectElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 300,
    backgroundColor: '#ffffff'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  const card = poster.createComponent({
    x: 50, y: 50,
    width: 200, height: 150,
    backgroundColor: '#cccccc'
  })

  const rect = new RectElement({
    x: 0, y: 0,
    width: 6, height: 150,
    fillColor: '#ff0000'
  })
  card.addElement(rect)

  layer.addElement(card)

  // Intercept rect.render
  const origRectRender = rect.render.bind(rect)
  rect.render = function(paper, context) {
    console.log('rect.render called:')
    console.log('  this.x:', this.x, 'this.y:', this.y)
    console.log('  context:', context)
    origRectRender(paper, context)
    console.log('  After render, _paperItem.position:', this._paperItem?.position)
    console.log('  After render, _paperItem.bounds._x:', this._paperItem?.bounds?._x)
  }

  // Intercept card.render
  const origCardRender = card.render.bind(card)
  card.render = function(paper, context) {
    console.log('\ncard.render called:')
    console.log('  context:', context)
    console.log('  card x:', this.x, 'y:', this.y)
    
    // Calculate what will be passed to children
    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)
    const absWidth = this._resolvePercent(this.width, context.width)
    const absHeight = this._resolvePercent(this.height, context.height)
    console.log('  absX:', absX, 'absY:', absY, 'absWidth:', absWidth, 'absHeight:', absHeight)
    
    origCardRender(paper, context)
  }

  await poster.exportPNG('debug-card-render6', './output')
  poster.destroy()
}

main().catch(console.error)
