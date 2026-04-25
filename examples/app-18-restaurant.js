/**
 * 应用示例 - 餐厅宣传
 * Restaurant Promotion
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Badge,
  Button,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 600,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰
  layer.addElement(new RectElement({
    x: 400, y: 150, width: 180, height: 180,
    fillColor: '#f97316', opacity: 0.2,
    borderRadius: 90
  }))

  layer.addElement(new RectElement({
    x: 50, y: 400, width: 120, height: 120,
    fillColor: '#f97316', opacity: 0.2,
    borderRadius: 60
  }))

  // 餐厅名称
  layer.addElement(new TextElement({
    x: 250, y: 60, text: '味蜀吾', fontSize: 48,
    color: '#f97316', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 110, text: '老火锅', fontSize: 32,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 标签
  layer.addElement(new Badge({
    x: 150, y: 160, text: '🔥 麻辣锅底',
    backgroundColor: '#c2410c', color: '#ffffff',
    fontSize: 14, radius: 16, padding: 12
  }))

  layer.addElement(new Badge({
    x: 300, y: 160, text: '🥩 鲜切牛肉',
    backgroundColor: '#c2410c', color: '#ffffff',
    fontSize: 14, radius: 16, padding: 12
  }))

  // 优惠信息
  layer.addElement(new RectElement({
    x: 250, y: 230, width: 400, height: 80,
    fillColor: '#f97316',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 220, text: '开业大酬宾', fontSize: 24,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 255, text: '全场菜金8折 · 锅底免费', fontSize: 16,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 招牌菜品
  layer.addElement(new TextElement({
    x: 250, y: 340, text: '招牌推荐', fontSize: 20,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Divider({
    x: 250, y: 370, width: 300, thickness: 1,
    color: '#3a3a4e', anchor: [0.5, 0.5]
  }))

  const dishes = [
    { name: '水煮牛肉', desc: '麻辣鲜香' },
    { name: '鲜毛肚', desc: '七上八下' },
    { name: '鸭肠', desc: '爽脆可口' },
    { name: '红糖糍粑', desc: '甜而不腻' },
  ]

  let yPos = 400
  for (const dish of dishes) {
    layer.addElement(new TextElement({
      x: 100, y: yPos, text: dish.name, fontSize: 16,
      color: '#ffffff'
    }))
    layer.addElement(new TextElement({
      x: 400, y: yPos, text: dish.desc, fontSize: 14,
      color: '#888888', anchor: [1, 0]
    }))
    yPos += 35
  }

  // 按钮
  layer.addElement(new Button({
    x: 250, y: 560, width: 180, height: 50,
    text: '立即订座', backgroundColor: '#f97316',
    textColor: '#ffffff', fontSize: 18, radius: 25
  }))

  await poster.exportPNG('app-18-restaurant', './output')
  poster.destroy()
  console.log('Restaurant poster saved to output/app-18-restaurant.png')
}

main().catch(console.error)