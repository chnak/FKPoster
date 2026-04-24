/**
 * 电商商品推广海报
 */
const {
  PosterBuilder,
  Card,
  Badge,
  Button,
  Rating,
  ImageFrame,
  Divider,
  TextElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 1200,
    backgroundColor: '#1a1a2e'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部标签
  const badge = new Badge({
    x: 400, y: 60, text: '限时特惠', backgroundColor: '#ef4444',
    anchor: [0.5, 0.5]
  })
  layer.addElement(badge)

  // 商品图片占位框
  const imageFrame = new ImageFrame({
    x: 400, y: 300, width: 500, height: 500,
    radius: 16, borderColor: '#3b82f6', borderWidth: 4,
    anchor: [0.5, 0.5]
  })
  layer.addElement(imageFrame)

  // 商品名称卡片
  const nameCard = new Card({
    x: 400, y: 750, width: 600, height: 100,
    title: '无线蓝牙耳机 Pro',
    subtitle: '降噪设计 | 30小时续航 | Hi-Fi音质',
    backgroundColor: '#16213e', borderColor: '#0f3460', borderWidth: 1, radius: 12,
    padding: 16,
    anchor: [0.5, 0.5]
  })
  layer.addElement(nameCard)

  // 评分
  const rating = new Rating({
    x: 300, y: 880, value: 4.8, max: 5, size: 28,
    filledColor: '#fbbf24', emptyColor: '#4a4a5a',
    anchor: [0.5, 0.5]
  })
  layer.addElement(rating)

  // 价格信息
  const priceText = new TextElement({
    x: 300, y: 950, text: '¥299', fontSize: 48, fontFamily: 'Arial',
    color: '#ef4444', textAlign: 'center', fontWeight: 'bold',
    anchor: [0.5, 0.5]
  })
  layer.addElement(priceText)

  const originalPrice = new TextElement({
    x: 480, y: 940, text: '原价 ¥499', fontSize: 18, fontFamily: 'Microsoft YaHei',
    color: '#888888', textAlign: 'left',
    anchor: [0, 0]
  })
  layer.addElement(originalPrice)

  // 分割线
  const divider = new Divider({
    x: 400, y: 1020, width: 500, color: '#2d2d3a', thickness: 1,
    anchor: [0.5, 0.5]
  })
  layer.addElement(divider)

  // 按钮
  const buyBtn = new Button({
    x: 400, y: 1100, width: 300, height: 60,
    text: '立即购买', backgroundColor: '#3b82f6', textColor: '#ffffff',
    radius: 30,
    anchor: [0.5, 0.5]
  })
  layer.addElement(buyBtn)

  await poster.exportPNG('ecommerce-poster', './output')
  console.log('E-commerce poster saved to output/ecommerce-poster.png')
  poster.destroy()
}

main().catch(console.error)
