/**
 * 应用示例 - 书籍封面
 * Book Cover
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
    width: 350,
    height: 500,
    backgroundColor: '#c41e3a'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰边框
  layer.addElement(new RectElement({
    x: 175, y: 250, width: 310, height: 460,
    fillColor: 'transparent',
    borderColor: '#d4af37',
    borderWidth: 2,
    anchor: [0.5, 0.5]
  }))

  // 标签
  layer.addElement(new Badge({
    x: 175, y: 60, text: '经典文学',
    backgroundColor: '#d4af37', color: '#1a1a2e',
    fontSize: 12, radius: 12, padding: 10
  }))

  // 书名
  layer.addElement(new TextElement({
    x: 175, y: 150, text: '活着', fontSize: 56,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 英文名
  layer.addElement(new TextElement({
    x: 175, y: 220, text: 'TO LIVE', fontSize: 18,
    color: '#d4af37', anchor: [0.5, 0.5], fontFamily: 'Arial'
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 175, y: 270, width: 150, thickness: 2,
    color: '#d4af37', anchor: [0.5, 0.5]
  }))

  // 作者
  layer.addElement(new TextElement({
    x: 175, y: 320, text: '余华 著', fontSize: 18,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 描述
  layer.addElement(new TextElement({
    x: 175, y: 400, text: '人是为活着本身而活着，\n而不是为了活着之外的\n任何事物所活着。', fontSize: 14,
    color: '#ffffff', opacity: 0.8, anchor: [0.5, 0.5],
    lineHeight: 1.8
  }))

  // 底部信息
  layer.addElement(new TextElement({
    x: 175, y: 480, text: '人民文学出版社', fontSize: 12,
    color: '#d4af37', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-16-book-cover', './output')
  poster.destroy()
  console.log('Book cover saved to output/app-16-book-cover.png')
}

main().catch(console.error)