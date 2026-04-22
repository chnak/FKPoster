const { PosterBuilder, TextElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 100,
    backgroundColor: '#0f172a'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  const text = new TextElement({ x: 50, y: 50, text: '12,847', fontSize: 24, color: '#ffffff', fontWeight: 'bold' })
  layer.addElement(text)

  await poster.exportPNG('simple-text-test', './output')
  console.log('Done')
  poster.destroy()
}

main().catch(console.error)
