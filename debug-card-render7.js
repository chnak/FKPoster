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

  let renderCount = 0
  const origCardRender = card.render.bind(card)
  card.render = function(paper, context) {
    renderCount++
    console.log(`\n=== card.render #${renderCount} ===`)
    
    const absX = this._resolvePercent(this.x, context.width)
    const absY = this._resolvePercent(this.y, context.height)
    const absWidth = this._resolvePercent(this.width, context.width)
    const absHeight = this._resolvePercent(this.height, context.height)
    
    console.log('Before loop:')
    console.log('  rect.x:', rect.x, 'rect.y:', rect.y)
    console.log('  absX:', absX, 'absY:', absY, 'absWidth:', absWidth, 'absHeight:', absHeight)
    
    // 模拟 Component.render 的逻辑
    for (const element of this.elements) {
      if (!element.render) continue

      console.log('  Inside loop, element.x:', element.x, 'element.y:', element.y)
      
      const originalX = element.x
      const originalY = element.y
      console.log('  originalX:', originalX, 'originalY:', originalY)
      
      const childX = this._resolvePercent(originalX, absWidth)
      const childY = this._resolvePercent(originalY, absHeight)
      console.log('  childX:', childX, 'childY:', childY)
      
      const absoluteX = absX + childX
      const absoluteY = absY + childY
      console.log('  absoluteX:', absoluteX, 'absoluteY:', absoluteY)
      
      element.x = absoluteX
      element.y = absoluteY
      
      console.log('  After setting element.x/y:', element.x, element.y)
    }
    
    console.log('After loop:')
    console.log('  rect.x:', rect.x, 'rect.y:', rect.y)
  }

  await poster.exportPNG('debug-card-render7', './output')
  poster.destroy()
}

main().catch(console.error)
