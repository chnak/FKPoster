/**
 * 优惠券/代金券
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Divider,
  Button,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 500,
    backgroundColor: '#fff5f5'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰圆
  const circle1 = new CircleElement({
    x: 350, y: 50, radius: 80,
    fillColor: '#ff6b6b', opacity: 0.1
  })
  layer.addElement(circle1)

  const circle2 = new CircleElement({
    x: 50, y: 450, radius: 100,
    fillColor: '#ff6b6b', opacity: 0.08
  })
  layer.addElement(circle2)

  // 顶部标签
  const tag = new TextElement({
    x: 150, y: padding, width: 100,
    text: '限定优惠',
    fontSize: 14, color: '#ff6b6b'
  })
  layer.addElement(tag)

  // 金额
  const amount = new TextElement({
    x: padding, y: 100, width: 352,
    text: '¥50',
    fontSize: 72, color: '#ff6b6b', fontWeight: 'bold'
  })
  layer.addElement(amount)

  const desc = new TextElement({
    x: padding, y: 180, width: 352,
    text: '代金券',
    fontSize: 24, color: '#333333'
  })
  layer.addElement(desc)

  // 分隔线（虚线效果用多个小矩形模拟）
  for (let i = 0; i < 20; i++) {
    const dash = new RectElement({
      x: padding + i * 18, y: 230, width: 10, height: 2,
      fillColor: '#dddddd'
    })
    layer.addElement(dash)
  }

  // 使用条件
  const conditions = [
    '• 满200元可用',
    '• 限线下门店使用',
    '• 有效期至 2024.12.31',
    '• 不与其他优惠同享'
  ]

  let cy = 260
  for (const c of conditions) {
    const text = new TextElement({
      x: padding, y: cy, width: 352,
      text: c, fontSize: 14, color: '#666666'
    })
    layer.addElement(text)
    cy += 30
  }

  // 商家信息
  const divider = new Divider({
    x: padding, y: 390, width: 352, color: '#ff6b6b', thickness: 1
  })
  layer.addElement(divider)

  const shop = new TextElement({
    x: padding, y: 410, width: 352,
    text: '老北京炸酱面馆 · 前门店',
    fontSize: 12, color: '#999999'
  })
  layer.addElement(shop)

  const code = new TextElement({
    x: padding, y: 450, width: 352,
    text: '券码：COUPON2024ABC',
    fontSize: 11, color: '#cccccc'
  })
  layer.addElement(code)

  await poster.exportPNG('coupon', './output')
  console.log('Coupon saved to output/coupon.png')
  poster.destroy()
}

main().catch(console.error)
