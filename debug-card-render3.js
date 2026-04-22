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

  console.log('card id:', card.id)
  console.log('poster.components:', poster.components.map(c => c.id))
  console.log('layer.elements:', layer.elements.map(e => e.id))
  console.log('Same object?', poster.components[0] === layer.elements[0])

  layer.addElement(card)

  await poster.exportPNG('debug-card-render3', './output')
  
  console.log('After export, rect._paperItem.bounds._x:', rect._paperItem?.bounds?._x)
  console.log('After export, rect._paperItem.position:', rect._paperItem?.position)
  
  poster.destroy()
}

main().catch(console.error)
