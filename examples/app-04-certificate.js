/**
 * 应用示例 - 证书
 * Certificate
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Divider,
  Badge,
  Seal,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 450,
    backgroundColor: '#f5f5f0'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 证书边框
  layer.addElement(new RectElement({
    x: 300, y: 225, width: 540, height: 390,
    fillColor: 'transparent',
    borderColor: '#d4af37',
    borderWidth: 3,
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new RectElement({
    x: 300, y: 225, width: 520, height: 370,
    fillColor: 'transparent',
    borderColor: '#d4af37',
    borderWidth: 1,
    anchor: [0.5, 0.5]
  }))

  // 标题
  layer.addElement(new TextElement({
    x: 300, y: 80, text: 'CERTIFICATE', fontSize: 14,
    color: '#888888', anchor: [0.5, 0.5], fontFamily: 'Arial'
  }))

  layer.addElement(new TextElement({
    x: 300, y: 115, text: '荣誉证书', fontSize: 36,
    color: '#1a1a2e', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 分隔装饰
  layer.addElement(new Divider({
    x: 300, y: 155, width: 100, thickness: 2,
    color: '#d4af37', anchor: [0.5, 0.5]
  }))

  // 授予
  layer.addElement(new TextElement({
    x: 300, y: 195, text: '授予', fontSize: 16,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  // 获奖者姓名
  layer.addElement(new TextElement({
    x: 300, y: 235, text: '张 三', fontSize: 42,
    color: '#d4af37', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 获奖原因
  layer.addElement(new TextElement({
    x: 300, y: 295, text: '年度最佳员工', fontSize: 20,
    color: '#333333', anchor: [0.5, 0.5]
  }))

  // 颁奖日期
  layer.addElement(new TextElement({
    x: 300, y: 350, text: '2026年1月1日', fontSize: 14,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  // 印章
  layer.addElement(new Seal({
    x: 480, y: 320, size: 70,
    text: '认证',
    color: '#cc0000'
  }))

  await poster.exportPNG('app-04-certificate', './output')
  poster.destroy()
  console.log('Certificate saved to output/app-04-certificate.png')
}

main().catch(console.error)