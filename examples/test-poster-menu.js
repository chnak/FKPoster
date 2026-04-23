/**
 * 餐厅菜单
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Divider,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 650,
    backgroundColor: '#faf6f1'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰边框
  const border = new RectElement({
    x: 12, y: 12, width: 376, height: 626,
    fillColor: 'transparent',
    borderColor: '#8b4513',
    borderWidth: 2,
    radius: 8
  })
  layer.addElement(border)

  // 顶部装饰
  const topDeco = new RectElement({
    x: 150, y: 20, width: 100, height: 4,
    fillColor: '#8b4513'
  })
  layer.addElement(topDeco)

  // 餐厅名称
  const restaurant = new TextElement({
    x: 0, y: 40, width: 400, textAlign: 'center',
    text: '老北京炸酱面馆',
    fontSize: 32, color: '#5c3317', fontWeight: 'bold'
  })
  layer.addElement(restaurant)

  const slogan = new TextElement({
    x: 0, y: 80, width: 400, textAlign: 'center',
    text: '传统风味 · 百年传承',
    fontSize: 12, color: '#8b4513', letterSpacing: 4
  })
  layer.addElement(slogan)

  // 分隔装饰
  const divider = new Divider({ x: 150, y: 105, width: 100, color: '#d4a574', thickness: 1 })
  layer.addElement(divider)

  // 招牌菜
  const specialTitle = new TextElement({
    x: padding, y: 120, width: 100,
    text: '招牌推荐',
    fontSize: 14, color: '#8b4513'
  })
  layer.addElement(specialTitle)

  const specials = [
    { name: '老北京炸酱面', price: '¥28', desc: '精选黄面条，手工现炸酱' },
    { name: '羊肉串', price: '¥8/串', desc: '内蒙古羊腿肉，炭火烤制' },
    { name: '豆汁儿', price: '¥12', desc: '老北京传统小吃' },
  ]

  let sy = 145
  for (const s of specials) {
    const badge = new Badge({
      x: padding, y: sy, text: '荐',
      backgroundColor: '#e53e3e', color: '#ffffff', padding: 3, radius: 3
    })
    layer.addElement(badge)

    const name = new TextElement({
      x: padding + 50, y: sy - 5, width: 200,
      text: s.name, fontSize: 16, color: '#5c3317', fontWeight: 'bold'
    })
    layer.addElement(name)

    const price = new TextElement({
      x: 320, y: sy - 5, width: 60,
      text: s.price, fontSize: 16, color: '#e53e3e', fontWeight: 'bold', textAlign: 'right'
    })
    layer.addElement(price)

    const desc = new TextElement({
      x: padding + 50, y: sy + 18, width: 300,
      text: s.desc, fontSize: 11, color: '#999999'
    })
    layer.addElement(desc)

    sy += 55
  }

  // 分隔线
  const div1 = new Divider({ x: padding, y: sy + 5, width: 352, color: '#d4a574', thickness: 1 })
  layer.addElement(div1)

  // 凉菜
  const coldTitle = new TextElement({
    x: padding, y: sy + 20, width: 100,
    text: '凉菜',
    fontSize: 14, color: '#8b4513'
  })
  layer.addElement(coldTitle)

  const coldItems = [
    { name: '麻酱拌黄瓜', price: '¥18' },
    { name: '老醋花生', price: '¥22' },
    { name: '凉拌腐竹', price: '¥16' },
    { name: '酱牛肉', price: '¥58' },
  ]

  let cy = sy + 50
  for (let i = 0; i < coldItems.length; i++) {
    const item = coldItems[i]
    const col = i % 2
    const row = Math.floor(i / 2)
    const xPos = padding + col * 170
    const yPos = cy + row * 35

    const name = new TextElement({
      x: xPos, y: yPos, width: 120,
      text: item.name, fontSize: 14, color: '#5c3317'
    })
    layer.addElement(name)

    const price = new TextElement({
      x: xPos + 120, y: yPos, width: 50,
      text: item.price, fontSize: 14, color: '#e53e3e', textAlign: 'right'
    })
    layer.addElement(price)
  }

  cy += 80

  // 分隔线
  const div2 = new Divider({ x: padding, y: cy, width: 352, color: '#d4a574', thickness: 1 })
  layer.addElement(div2)

  // 热菜
  const hotTitle = new TextElement({
    x: padding, y: cy + 15, width: 100,
    text: '热菜',
    fontSize: 14, color: '#8b4513'
  })
  layer.addElement(hotTitle)

  const hotItems = [
    { name: '宫保鸡丁', price: '¥38' },
    { name: '鱼香肉丝', price: '¥36' },
    { name: '京酱肉丝', price: '¥42' },
    { name: '糖醋里脊', price: '¥45' },
  ]

  let hy = cy + 45
  for (let i = 0; i < hotItems.length; i++) {
    const item = hotItems[i]
    const col = i % 2
    const row = Math.floor(i / 2)
    const xPos = padding + col * 170
    const yPos = hy + row * 35

    const name = new TextElement({
      x: xPos, y: yPos, width: 120,
      text: item.name, fontSize: 14, color: '#5c3317'
    })
    layer.addElement(name)

    const price = new TextElement({
      x: xPos + 120, y: yPos, width: 50,
      text: item.price, fontSize: 14, color: '#e53e3e', textAlign: 'right'
    })
    layer.addElement(price)
  }

  // 底部信息
  const footer = new TextElement({
    x: 0, y: 610, width: 400, textAlign: 'center',
    text: '📍 北京市朝阳区三里屯路19号\n☎️ 010-6417-1234',
    fontSize: 11, color: '#8b4513', lineHeight: 1.8
  })
  layer.addElement(footer)

  await poster.exportPNG('restaurant-menu', './output')
  console.log('Menu saved to output/restaurant-menu.png')
  poster.destroy()
}

main().catch(console.error)
