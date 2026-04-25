/**
 * 应用示例 - 优惠券
 * Coupon
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Divider,
  Barcode,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 380,
    height: 200,
    backgroundColor: '#ff6b6b'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 左侧金额区
  layer.addElement(new RectElement({
    x: 80, y: 100, width: 120, height: 180,
    fillColor: '#ffffff',
    borderRadius: 0
  }))

  // 金额
  layer.addElement(new TextElement({
    x: 80, y: 70, text: '¥', fontSize: 24,
    color: '#ff6b6b', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 80, y: 120, text: '50', fontSize: 64,
    color: '#ff6b6b', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 80, y: 170, text: '代金券', fontSize: 16,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  // 分割线（虚线效果用多个矩形模拟）
  for (let i = 0; i < 10; i++) {
    layer.addElement(new RectElement({
      x: 200, y: 20 + i * 18, width: 10, height: 6,
      fillColor: '#ffffff',
      borderRadius: 3
    }))
  }

  // 右侧信息区
  layer.addElement(new TextElement({
    x: 270, y: 50, text: '满200可用', fontSize: 18,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 270, y: 90, text: '全场通用', fontSize: 14,
    color: '#ffffff', opacity: 0.9, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Divider({
    x: 230, y: 120, width: 100, thickness: 1,
    color: '#ffffff', opacity: 0.5, anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 270, y: 145, text: '有效期至', fontSize: 12,
    color: '#ffffff', opacity: 0.8, anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 270, y: 170, text: '2026.06.30', fontSize: 14,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 条形码
  layer.addElement(new Barcode({
    x: 270, y: 100, width: 80, height: 30,
    value: '6923456789012',
    textSize: 8,
    showText: false
  }))

  await poster.exportPNG('app-05-coupon', './output')
  poster.destroy()
  console.log('Coupon saved to output/app-05-coupon.png')
}

main().catch(console.error)