const { PosterBuilder, RectElement, TextElement, Badge } = require('./src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 1920,
    height: 1080,
    backgroundColor: '#0f0c29'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // FKBuilder 卡片
  const card1 = poster.createComponent({
    x: 80, y: 280,
    width: 860, height: 480,
    backgroundColor: '#1e1e2e'
  })

  // 左侧强调条
  const leftBar = new RectElement({
    x: 0, y: 0,
    width: 6, height: 480,
    fillColor: '#667eea'
  })
  card1.addElement(leftBar)

  // 终端风格命令区
  card1.addElement(new RectElement({
    x: 40, y: 250,
    width: 780, height: 70,
    fillColor: '#0d0d0d',
    borderRadius: 8
  }))

  console.log('=== Card1 Configuration ===')
  console.log('card1: x=', card1.x, 'y=', card1.y, 'width=', card1.width, 'height=', card1.height)
  console.log('leftBar: x=', leftBar.x, 'y=', leftBar.y, 'width=', leftBar.width, 'height=', leftBar.height)
  
  layer.addElement(card1)

  // 渲染后检查
  await poster.exportPNG('debug-fkposter-cards', './output')
  
  console.log('\n=== After Export ===')
  console.log('leftBar._paperItem.bounds:', leftBar._paperItem?.bounds)
  console.log('leftBar._paperItem.position:', leftBar._paperItem?.position)
  
  // 计算应该的位置
  const absX = 80  // card1.x
  const absY = 280  // card1.y
  console.log('\nExpected:')
  console.log('  leftBar should be at x:', absX, 'y:', absY)
  console.log('  leftBar bounds should be: x=', absX - 3, '-', absX + 3, 'y=', absY, '-', absY + 480)
  
  poster.destroy()
}

main().catch(console.error)
