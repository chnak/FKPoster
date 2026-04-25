/**
 * 应用示例 - 订单小票
 * Receipt
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Divider,
  QRCode,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 300,
    height: 500,
    backgroundColor: '#ffffff'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  layer.addElement(new TextElement({
    x: 150, y: 40, text: '收银小票', fontSize: 22,
    color: '#333333', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Divider({
    x: 150, y: 70, width: 260, thickness: 1,
    color: '#cccccc', anchor: [0.5, 0.5]
  }))

  // 店铺信息
  layer.addElement(new TextElement({
    x: 150, y: 95, text: '门店：星巴克北京三里屯店', fontSize: 11,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 150, y: 115, text: '订单号：SB20260425001', fontSize: 11,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 150, y: 135, text: '2026-04-25 14:30:25', fontSize: 11,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Divider({
    x: 150, y: 160, width: 260, thickness: 1,
    color: '#cccccc', anchor: [0.5, 0.5]
  }))

  // 商品明细
  layer.addElement(new TextElement({
    x: 30, y: 185, text: '商品名称', fontSize: 12,
    color: '#333333', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 170, y: 185, text: '数量', fontSize: 12,
    color: '#333333', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 185, text: '金额', fontSize: 12,
    color: '#333333', fontWeight: 'bold', anchor: [1, 0]
  }))

  layer.addElement(new TextElement({
    x: 30, y: 210, text: '拿铁咖啡', fontSize: 11,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 170, y: 210, text: 'x1', fontSize: 11,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 210, text: '¥32.00', fontSize: 11,
    color: '#666666', anchor: [1, 0]
  }))

  layer.addElement(new TextElement({
    x: 30, y: 235, text: '提拉米苏', fontSize: 11,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 170, y: 235, text: 'x1', fontSize: 11,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 235, text: '¥28.00', fontSize: 11,
    color: '#666666', anchor: [1, 0]
  }))

  layer.addElement(new TextElement({
    x: 30, y: 260, text: '矿泉水', fontSize: 11,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 170, y: 260, text: 'x2', fontSize: 11,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 260, text: '¥10.00', fontSize: 11,
    color: '#666666', anchor: [1, 0]
  }))

  layer.addElement(new Divider({
    x: 150, y: 285, width: 260, thickness: 1,
    color: '#cccccc', anchor: [0.5, 0.5]
  }))

  // 总计
  layer.addElement(new TextElement({
    x: 30, y: 310, text: '合计', fontSize: 14,
    color: '#333333', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 310, text: '¥80.00', fontSize: 14,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))

  layer.addElement(new TextElement({
    x: 30, y: 335, text: '实收', fontSize: 12,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 335, text: '¥100.00', fontSize: 12,
    color: '#333333', anchor: [1, 0]
  }))

  layer.addElement(new TextElement({
    x: 30, y: 360, text: '找零', fontSize: 12,
    color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 360, text: '¥20.00', fontSize: 12,
    color: '#333333', anchor: [1, 0]
  }))

  layer.addElement(new Divider({
    x: 150, y: 390, width: 260, thickness: 1,
    color: '#cccccc', anchor: [0.5, 0.5]
  }))

  // 二维码
  layer.addElement(new QRCode({
    x: 150, y: 430, size: 60,
    value: 'https://store.starbucks.com.cn',
    color: '#333333'
  }))

  layer.addElement(new TextElement({
    x: 150, y: 480, text: '扫二维码享更多优惠', fontSize: 10,
    color: '#999999', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-07-receipt', './output')
  poster.destroy()
  console.log('Receipt saved to output/app-07-receipt.png')
}

main().catch(console.error)