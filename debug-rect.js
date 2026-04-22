const { PosterBuilder, RectElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 200,
    backgroundColor: '#ffffff'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  const card = poster.createComponent({
    x: 50, y: 20,
    width: 200, height: 100,
    backgroundColor: '#cccccc'
  })

  // 测试 RectElement 在组件内的位置
  const rect = new RectElement({
    x: 0, y: 0,
    width: 10, height: 50,
    fillColor: '#ff0000'
  })
  card.addElement(rect)

  console.log('rect anchor:', rect.anchor)
  console.log('rect x:', rect.x, 'y:', rect.y)
  console.log('rect width:', rect.width, 'height:', rect.height)
  
  layer.addElement(card)

  await poster.exportPNG('debug-rect', './output')
  
  // 渲染后检查
  console.log('\nAfter export:')
  console.log('rect._paperItem.bounds:', rect._paperItem?.bounds)
  
  poster.destroy()
}

main().catch(console.error)
