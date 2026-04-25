/**
 * 应用示例 - 旅游明信片
 * Travel Postcard
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Divider,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 350,
    backgroundColor: '#87CEEB'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 风景背景区
  layer.addElement(new RectElement({
    x: 250, y: 120, width: 500, height: 230,
    fillColor: '#2d5a27',
    anchor: [0.5, 0.5]
  }))

  // 装饰山脉
  layer.addElement(new RectElement({
    x: 350, y: 60, width: 200, height: 100,
    fillColor: '#4a7c43',
    borderRadius: 100
  }))

  layer.addElement(new RectElement({
    x: 150, y: 80, width: 150, height: 80,
    fillColor: '#5a8c53',
    borderRadius: 75
  }))

  // 地点标签
  layer.addElement(new Badge({
    x: 450, y: 80, text: '云南·大理',
    backgroundColor: '#ffffff', color: '#333333',
    fontSize: 12, radius: 16, padding: 12
  }))

  // 明信片标题
  layer.addElement(new TextElement({
    x: 250, y: 40, text: 'travel', fontSize: 28,
    color: '#ffffff', anchor: [0.5, 0.5],
    fontFamily: 'Georgia'
  }))

  // 分割线
  layer.addElement(new Divider({
    x: 250, y: 280, width: 400, thickness: 2,
    color: '#ffffff', opacity: 0.5, anchor: [0.5, 0.5]
  }))

  // 寄语
  layer.addElement(new TextElement({
    x: 250, y: 305, text: '苍山洱海，风花雪月', fontSize: 18,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 日期
  layer.addElement(new TextElement({
    x: 250, y: 335, text: '2026.04.25', fontSize: 12,
    color: '#ffffff', opacity: 0.8, anchor: [0.5, 0.5]
  }))

  // 邮资凭证区
  layer.addElement(new RectElement({
    x: 20, y: 280, width: 80, height: 50,
    fillColor: '#c41e3a'
  }))

  layer.addElement(new TextElement({
    x: 60, y: 305, text: '邮资已付', fontSize: 10,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-17-postcard', '../output')
  poster.destroy()
  console.log('Postcard saved to output/app-17-postcard.png')
}

main().catch(console.error)