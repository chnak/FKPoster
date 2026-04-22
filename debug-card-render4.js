const { PosterBuilder, RectElement, Component } = require('./src/index')

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

  console.log('card has initialize:', typeof card.initialize)
  console.log('card has render:', typeof card.render)
  console.log('card instanceof Component:', card instanceof Component)
  console.log('layer.elements before add:', layer.elements.length)

  layer.addElement(card)

  console.log('layer.elements after add:', layer.elements.length)
  console.log('layer.elements:', layer.elements.map(e => e.id))

  poster.destroy()
}

main().catch(console.error)
