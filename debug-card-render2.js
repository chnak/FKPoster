const { PosterBuilder, TextElement, Badge, RectElement } = require('./src/index')

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

  // 左侧竖线
  const rect = new RectElement({
    x: 0, y: 0,
    width: 6, height: 150,
    fillColor: '#ff0000'
  })
  card.addElement(rect)

  layer.addElement(card)

  // 详细追踪
  const origCardRender = card.render.bind(card)
  card.render = function(paper, context) {
    console.log('card.render called')
    console.log('  context:', context)
    console.log('  card.width:', this.width, 'card.height:', this.height)
    console.log('  absX:', this._resolvePercent(this.x, context?.width || 0), 'absY:', this._resolvePercent(this.y, context?.height || 0))
    
    // 计算 absWidth 和 absHeight
    const absWidth = this._resolvePercent(this.width, context?.width || 0)
    const absHeight = this._resolvePercent(this.height, context?.height || 0)
    console.log('  absWidth:', absWidth, 'absHeight:', absHeight)
    
    origCardRender(paper, context)
    
    console.log('  After render, rect._paperItem.bounds:', rect._paperItem?.bounds?._x)
  }

  await poster.exportPNG('debug-card-render2', './output')
  poster.destroy()
}

main().catch(console.error)
