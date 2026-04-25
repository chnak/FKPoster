/**
 * 头像和评分测试
 * Avatar, Rating
 */
const {
  PosterBuilder,
  TextElement,
  Avatar,
  Rating,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '头像与评分测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Avatar - 不同尺寸
  layer.addElement(new Avatar({
    x: 200, y: 150, size: 60, name: '张三', backgroundColor: '#e94560', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Avatar({
    x: 400, y: 150, size: 80, name: '李四', backgroundColor: '#0f3460', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Avatar({
    x: 600, y: 150, size: 100, name: '王五', backgroundColor: '#533483', anchor: [0.5, 0.5]
  }))

  // Rating - 不同评分
  layer.addElement(new TextElement({
    x: 400, y: 280, text: '4.5 / 5.0', fontSize: 18,
    color: '#94a3b8', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Rating({
    x: 400, y: 320, value: 4.5, max: 5, size: 40, gap: 8, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Rating({
    x: 400, y: 400, value: 3, max: 5, size: 32, gap: 6,
    filledColor: '#ff6b6b', emptyColor: '#3d3d5c', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Rating({
    x: 400, y: 470, value: 5, max: 5, size: 28, gap: 4, anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('03-avatar-rating', '../output')
  poster.destroy()
  console.log('Avatar and rating test saved to output/03-avatar-rating.png')
}

main().catch(console.error)