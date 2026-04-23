/**
 * 发票/收据
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
    width: 400,
    height: 600,
    backgroundColor: '#ffffff'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部色带
  const topBar = new RectElement({
    x: 0, y: 0, width: 400, height: 80,
    fillColor: '#1a365d'
  })
  layer.addElement(topBar)

  const title = new TextElement({
    x: 0, y: 30, width: 400, textAlign: 'center',
    text: '电 子 发 票',
    fontSize: 24, color: '#ffffff', fontWeight: 'bold', letterSpacing: 8
  })
  layer.addElement(title)

  // 发票信息
  const invoiceNo = new TextElement({
    x: padding, y: 100, width: 352,
    text: '发票号码：144032401202312345678',
    fontSize: 11, color: '#666666'
  })
  layer.addElement(invoiceNo)

  const invoiceDate = new TextElement({
    x: padding, y: 120, width: 352,
    text: '开票日期：2024-12-25',
    fontSize: 11, color: '#666666'
  })
  layer.addElement(invoiceDate)

  // 分隔线
  const div1 = new Divider({ x: padding, y: 145, width: 352, color: '#e2e8f0', thickness: 1 })
  layer.addElement(div1)

  // 购买方
  const buyerTitle = new TextElement({
    x: padding, y: 160, width: 100,
    text: '购买方',
    fontSize: 12, color: '#999999'
  })
  layer.addElement(buyerTitle)

  const buyerName = new TextElement({
    x: padding, y: 180, width: 352,
    text: '深圳市腾讯科技有限公司',
    fontSize: 18, color: '#1a365d', fontWeight: 'bold'
  })
  layer.addElement(buyerName)

  const buyerTax = new TextElement({
    x: padding, y: 208, width: 352,
    text: '纳税人识别号：91440300MA5XXXXXXX',
    fontSize: 11, color: '#666666'
  })
  layer.addElement(buyerTax)

  // 分隔线
  const div2 = new Divider({ x: padding, y: 235, width: 352, color: '#e2e8f0', thickness: 1 })
  layer.addElement(div2)

  // 项目明细表头
  const tableHeader = new RectElement({
    x: padding, y: 250, width: 352, height: 30,
    fillColor: '#f7fafc'
  })
  layer.addElement(tableHeader)

  const h1 = new TextElement({ x: padding + 5, y: 268, width: 200, text: '商品名称', fontSize: 11, color: '#666666' })
  const h2 = new TextElement({ x: padding + 220, y: 268, width: 50, text: '数量', fontSize: 11, color: '#666666' })
  const h3 = new TextElement({ x: padding + 280, y: 268, width: 80, text: '金额', fontSize: 11, color: '#666666', textAlign: 'right' })
  layer.addElement(h1)
  layer.addElement(h2)
  layer.addElement(h3)

  // 商品明细
  const items = [
    { name: '云服务器 ECS - 基础版', qty: 1, price: '¥3,600.00' },
    { name: 'CDN 流量包 - 100GB', qty: 2, price: '¥120.00' },
    { name: '短信服务 - 10000条', qty: 1, price: '¥580.00' },
  ]

  let y = 290
  for (const item of items) {
    const name = new TextElement({ x: padding + 5, y: y, width: 200, text: item.name, fontSize: 12, color: '#333333' })
    const qty = new TextElement({ x: padding + 220, y: y, width: 50, text: String(item.qty), fontSize: 12, color: '#333333' })
    const price = new TextElement({ x: padding + 280, y: y, width: 80, text: item.price, fontSize: 12, color: '#333333', textAlign: 'right' })
    layer.addElement(name)
    layer.addElement(qty)
    layer.addElement(price)
    y += 28
  }

  // 分隔线
  const div3 = new Divider({ x: padding, y: y + 5, width: 352, color: '#e2e8f0', thickness: 1 })
  layer.addElement(div3)

  // 合计
  const totalLabel = new TextElement({
    x: padding, y: y + 20, width: 200,
    text: '合计金额（含税）',
    fontSize: 14, color: '#333333'
  })
  layer.addElement(totalLabel)

  const totalValue = new TextElement({
    x: padding, y: y + 45, width: 352,
    text: '¥4,820.00',
    fontSize: 22, color: '#e53e3e', fontWeight: 'bold', textAlign: 'right'
  })
  layer.addElement(totalValue)

  // 大写金额
  const upper = new TextElement({
    x: padding, y: y + 75, width: 352,
    text: '人民币（大写）：肆仟捌佰贰拾元整',
    fontSize: 12, color: '#666666'
  })
  layer.addElement(upper)

  // 分隔线
  const div4 = new Divider({ x: padding, y: y + 85, width: 352, color: '#e2e8f0', thickness: 1 })
  layer.addElement(div4)

  // 销售方
  const sellerTitle = new TextElement({
    x: padding, y: y + 100, width: 100,
    text: '销售方',
    fontSize: 12, color: '#999999'
  })
  layer.addElement(sellerTitle)

  const sellerName = new TextElement({
    x: padding, y: y + 120, width: 352,
    text: '阿里云计算有限公司',
    fontSize: 16, color: '#1a365d', fontWeight: 'bold'
  })
  layer.addElement(sellerName)

  const sellerInfo = new TextElement({
    x: padding, y: y + 148, width: 352,
    text: '纳税人识别号：91330000MA2XXXXXXX\n地址：杭州市余杭区文一西路969号',
    fontSize: 10, color: '#999999', lineHeight: 1.6
  })
  layer.addElement(sellerInfo)

  // 二维码
  const qr = new QRCode({
    x: padding + 116, y: y + 200, size: 80,
    value: 'https://invoice.example.com/verify/144032401202312345678',
    backgroundColor: '#ffffff'
  })
  layer.addElement(qr)

  const qrText = new TextElement({
    x: padding, y: y + 295, width: 352, textAlign: 'center',
    text: '扫描验证真伪',
    fontSize: 10, color: '#999999'
  })
  layer.addElement(qrText)

  await poster.exportPNG('invoice', './output')
  console.log('Invoice saved to output/invoice.png')
  poster.destroy()
}

main().catch(console.error)
