const { PosterBuilder, TextElement, Badge, RectElement } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 300,
    backgroundColor: '#ffffff'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 创建一个组件
  const card = poster.createComponent({
    x: 50, y: 50,
    width: 200, height: 150,
    backgroundColor: '#cccccc'
  })

  // 左侧竖线
  card.addElement(new RectElement({
    x: 0, y: 0,
    width: 6, height: 150,
    fillColor: '#ff0000'
  }))

  // 终端框
  card.addElement(new RectElement({
    x: 20, y: 60,
    width: 160, height: 40,
    fillColor: '#000000'
  }))
  card.addElement(new TextElement({
    x: 30, y: 75,
    text: '$ test command',
    fontSize: 14,
    color: '#00ff00'
  }))

  // 添加到 layer
  layer.addElement(card)

  // 拦截 render 调用
  let renderCount = 0
  const origCardRender = card.render.bind(card)
  card.render = function(paper, context) {
    renderCount++
    console.log(`card.render #${renderCount} called`)
    console.log(`  absX: ${this._resolvePercent(this.x, context.width)}, absY: ${this._resolvePercent(this.y, context.height)}`)
    origCardRender(paper, context)
  }

  console.log('card in poster.components:', poster.components.includes(card))
  console.log('card in layer.elements:', layer.elements.includes(card))

  await poster.exportPNG('debug-card-render', './output')
  console.log(`\nTotal card.render calls: ${renderCount}`)
  poster.destroy()
}

main().catch(console.error)
