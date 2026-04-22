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

  console.log('=== Before layer.addElement ===')
  console.log('poster.components count:', poster.components.length)
  console.log('layer.elements count:', layer.elements.length)

  layer.addElement(card)

  console.log('=== After layer.addElement ===')
  console.log('poster.components count:', poster.components.length)
  console.log('layer.elements count:', layer.elements.length)

  // Check if card is same object
  if (poster.components.length > 0 && layer.elements.length > 0) {
    console.log('poster.components[0] === layer.elements[0]:', poster.components[0] === layer.elements[0])
  }

  await poster.exportPNG('debug-card-render5', './output')
  poster.destroy()
}

main().catch(console.error)
