/**
 * 应用示例 - 餐厅菜单
 * Restaurant Menu
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
    width: 450,
    height: 650,
    backgroundColor: '#2d2d2d'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题背景
  layer.addElement(new RectElement({
    x: 225, y: 60, width: 450, height: 80,
    fillColor: '#c41e3a',
    anchor: [0.5, 0.5]
  }))

  // 标题文字
  layer.addElement(new TextElement({
    x: 225, y: 55, text: '川味坊', fontSize: 36,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 副标题
  layer.addElement(new TextElement({
    x: 225, y: 90, text: '正宗川菜 · 麻辣鲜香', fontSize: 14,
    color: '#ffcccb', anchor: [0.5, 0.5]
  }))

  // 招牌菜
  layer.addElement(new TextElement({
    x: 50, y: 160, text: '招牌推荐', fontSize: 20,
    color: '#ffffff', fontWeight: 'bold'
  }))

  // 菜品1
  layer.addElement(new TextElement({
    x: 50, y: 200, text: '麻婆豆腐', fontSize: 18,
    color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 200, text: '¥38', fontSize: 18,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))
  layer.addElement(new TextElement({
    x: 50, y: 225, text: '麻辣鲜香，下饭神器', fontSize: 12,
    color: '#888888'
  }))

  // 菜品2
  layer.addElement(new TextElement({
    x: 50, y: 270, text: '水煮鱼', fontSize: 18,
    color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 270, text: '¥88', fontSize: 18,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))
  layer.addElement(new TextElement({
    x: 50, y: 295, text: '鲜活鱼片，麻辣过瘾', fontSize: 12,
    color: '#888888'
  }))

  // 菜品3
  layer.addElement(new TextElement({
    x: 50, y: 340, text: '宫保鸡丁', fontSize: 18,
    color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 340, text: '¥42', fontSize: 18,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))
  layer.addElement(new TextElement({
    x: 50, y: 365, text: '香辣可口，经典川菜', fontSize: 12,
    color: '#888888'
  }))

  layer.addElement(new Divider({
    x: 225, y: 400, width: 350, thickness: 1,
    color: '#444444', anchor: [0.5, 0.5]
  }))

  // 热门菜品
  layer.addElement(new TextElement({
    x: 50, y: 430, text: '热门佳肴', fontSize: 20,
    color: '#ffffff', fontWeight: 'bold'
  }))

  // 菜品4
  layer.addElement(new Badge({
    x: 140, y: 475, text: 'NEW', backgroundColor: '#ff6b6b',
    color: '#ffffff', fontSize: 10, radius: 4, padding: 4
  }))
  layer.addElement(new TextElement({
    x: 50, y: 470, text: '酸菜鱼', fontSize: 16,
    color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 470, text: '¥68', fontSize: 16,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))

  // 菜品5
  layer.addElement(new TextElement({
    x: 50, y: 520, text: '回锅肉', fontSize: 16,
    color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 520, text: '¥45', fontSize: 16,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))

  // 菜品6
  layer.addElement(new TextElement({
    x: 50, y: 570, text: '辣子鸡', fontSize: 16,
    color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 570, text: '¥52', fontSize: 16,
    color: '#c41e3a', fontWeight: 'bold', anchor: [1, 0]
  }))

  // 底部
  layer.addElement(new TextElement({
    x: 225, y: 620, text: '地址：北京市朝阳区美食街12号', fontSize: 12,
    color: '#666666', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-06-menu', '../output')
  poster.destroy()
  console.log('Menu saved to output/app-06-menu.png')
}

main().catch(console.error)