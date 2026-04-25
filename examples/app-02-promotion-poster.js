/**
 * 应用示例 - 促销海报
 * Promotion Poster
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Button,
  Badge,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 800,
    backgroundColor: '#0f0f23'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰圆形
  layer.addElement(new RectElement({
    x: 450, y: 100, width: 300, height: 300,
    fillColor: '#ff6b6b', opacity: 0.3,
    borderRadius: 150
  }))

  layer.addElement(new RectElement({
    x: -50, y: 500, width: 250, height: 250,
    fillColor: '#4ecdc4', opacity: 0.3,
    borderRadius: 125
  }))

  // 折扣标签
  layer.addElement(new Badge({
    x: 300, y: 120, text: '限时特惠',
    backgroundColor: '#ff6b6b', color: '#ffffff',
    fontSize: 18, radius: 20, padding: 15
  }))

  // 主标题
  layer.addElement(new TextElement({
    x: 300, y: 220, text: '夏日狂欢节', fontSize: 48,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 副标题
  layer.addElement(new TextElement({
    x: 300, y: 290, text: '全场低至5折起', fontSize: 24,
    color: '#ff6b6b', anchor: [0.5, 0.5]
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 300, y: 350, width: 400, thickness: 2,
    color: '#3a3a5e', anchor: [0.5, 0.5]
  }))

  // 价格信息
  layer.addElement(new TextElement({
    x: 300, y: 420, text: '¥299', fontSize: 72,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 300, y: 500, text: '原价 ¥599', fontSize: 18,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  // 按钮
  layer.addElement(new Button({
    x: 300, y: 600, width: 200, height: 60,
    text: '立即抢购', backgroundColor: '#ff6b6b',
    textColor: '#ffffff', fontSize: 20, radius: 30
  }))

  // 底部说明
  layer.addElement(new TextElement({
    x: 300, y: 720, text: '* 活动截止至7月31日', fontSize: 12,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-02-promotion-poster', '../output')
  poster.destroy()
  console.log('Promotion poster saved to output/app-02-promotion-poster.png')
}

main().catch(console.error)