/**
 * 应用示例 - 产品卡片
 * Product Card
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Badge,
  Button,
  Rating,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 520,
    backgroundColor: '#f8f9fa'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 产品图片区域
  layer.addElement(new RectElement({
    x: 200, y: 180, width: 360, height: 280,
    fillColor: '#ffffff',
    borderRadius: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1
  }))

  // 折扣标签
  layer.addElement(new Badge({
    x: 320, y: 60, text: '-20%',
    backgroundColor: '#ef4444', color: '#ffffff',
    fontSize: 14, radius: 8, padding: 10
  }))

  // 产品名称
  layer.addElement(new TextElement({
    x: 200, y: 70, text: 'AirPods Pro 3', fontSize: 28,
    color: '#1a1a2e', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 评分
  layer.addElement(new Rating({
    x: 170, y: 110, value: 4.8, size: 16,
    filledColor: '#fbbf24', emptyColor: '#e5e7eb'
  }))

  layer.addElement(new TextElement({
    x: 230, y: 110, text: '(1,234评价)', fontSize: 12,
    color: '#888888'
  }))

  // 描述
  layer.addElement(new TextElement({
    x: 200, y: 400, text: '主动降噪 · 空间音频 · MagSafe充电', fontSize: 13,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  // 价格
  layer.addElement(new TextElement({
    x: 60, y: 450, text: '¥', fontSize: 20,
    color: '#ef4444'
  }))

  layer.addElement(new TextElement({
    x: 80, y: 450, text: '1799', fontSize: 36,
    color: '#ef4444', fontWeight: 'bold'
  }))

  layer.addElement(new TextElement({
    x: 170, y: 455, text: '¥2199', fontSize: 14,
    color: '#999999'
  }))

  // 按钮
  layer.addElement(new Button({
    x: 300, y: 460, width: 100, height: 40,
    text: '立即购买', backgroundColor: '#3b82f6',
    textColor: '#ffffff', fontSize: 14, radius: 20
  }))

  await poster.exportPNG('app-10-product', './output')
  poster.destroy()
  console.log('Product card saved to output/app-10-product.png')
}

main().catch(console.error)