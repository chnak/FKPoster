/**
 * 装饰组件测试
 * Star, Arrow, Bubble, Ribbon, Seal, Frame
 */
const {
  PosterBuilder,
  TextElement,
  Star,
  Arrow,
  Bubble,
  Ribbon,
  Seal,
  Frame,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 800,
    backgroundColor: '#16213e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '装饰组件测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Star 星星
  layer.addElement(new Star({
    x: 200, y: 150, size: 60, color: '#fbbf24', filled: true, anchor: [0.5, 0.5]
  }))
  layer.addElement(new Star({
    x: 300, y: 150, size: 60, color: '#fbbf24', filled: false, anchor: [0.5, 0.5]
  }))

  // Arrow 箭头
  layer.addElement(new Arrow({
    x: 450, y: 120, direction: 'right', size: 50, color: '#00d9ff', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Arrow({
    x: 550, y: 120, direction: 'left', size: 50, color: '#e94560', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Arrow({
    x: 650, y: 120, direction: 'up', size: 50, color: '#533483', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Arrow({
    x: 700, y: 170, direction: 'down', size: 50, color: '#0f3460', anchor: [0.5, 0.5]
  }))

  // Bubble 气泡
  layer.addElement(new Bubble({
    x: 200, y: 250, width: 150, height: 60,
    text: '你好世界', backgroundColor: '#00d9ff', color: '#000000',
    direction: 'top', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Bubble({
    x: 400, y: 250, width: 150, height: 60,
    text: '提示信息', backgroundColor: '#e94560', color: '#ffffff',
    direction: 'bottom', anchor: [0.5, 0.5]
  }))

  // Ribbon 缎带
  layer.addElement(new Ribbon({
    x: 200, y: 380, width: 120, height: 40,
    text: '热门', backgroundColor: '#e94560', color: '#ffffff', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Ribbon({
    x: 400, y: 380, width: 120, height: 40,
    text: '新品', backgroundColor: '#00d9ff', color: '#000000', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Ribbon({
    x: 600, y: 380, width: 120, height: 40,
    text: '推荐', backgroundColor: '#533483', color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // Seal 印章
  layer.addElement(new Seal({
    x: 200, y: 520, size: 80, text: '认证', color: '#e94560', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Seal({
    x: 400, y: 520, size: 80, text: '官方', color: '#fbbf24', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Seal({
    x: 600, y: 520, size: 80, text: '精品', color: '#533483', anchor: [0.5, 0.5]
  }))

  // Frame 装饰边框
  layer.addElement(new Frame({
    x: 200, y: 660, width: 150, height: 80,
    borderColor: '#00d9ff', borderWidth: 3, style: 'square', anchor: [0.5, 0.5]
  }))
  layer.addElement(new Frame({
    x: 450, y: 660, width: 150, height: 80,
    borderColor: '#e94560', borderWidth: 3, style: 'circle', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('08-decorations', '../output')
  poster.destroy()
  console.log('Decorations test saved to output/08-decorations.png')
}

main().catch(console.error)