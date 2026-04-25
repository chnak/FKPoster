/**
 * 应用示例 - 天气卡片
 * Weather Card
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 250,
    backgroundColor: '#1e3a5f'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部装饰圆
  layer.addElement(new RectElement({
    x: 300, y: 15, width: 90, height: 90,
    fillColor: '#FFD700', opacity: 0.2,
    borderRadius: 45
  }))

  // 位置
  layer.addElement(new TextElement({
    x: 20, y: 25, text: '北京市', fontSize: 16,
    color: '#ffffff', fontWeight: 'bold', anchor: [0, 0]
  }))

  // 日期
  layer.addElement(new TextElement({
    x: 20, y: 45, text: '4月25日 星期五', fontSize: 10,
    color: '#94a3b8', anchor: [0, 0]
  }))

  // 天气图标
  layer.addElement(new RectElement({
    x: 295, y: 60, width: 70, height: 70,
    fillColor: '#FFD700',
    borderRadius: 35
  }))

  layer.addElement(new TextElement({
    x: 295, y: 60, text: '☀️', fontSize: 36, anchor: [0.5, 0.5]
  }))

  // 温度
  layer.addElement(new TextElement({
    x: 20, y: 75, text: '24', fontSize: 56,
    color: '#ffffff', fontWeight: 'bold', anchor: [0, 0]
  }))

  layer.addElement(new TextElement({
    x: 105, y: 95, text: '°C', fontSize: 20,
    color: '#94a3b8', anchor: [0, 0]
  }))

  // 天气描述
  layer.addElement(new TextElement({
    x: 20, y: 145, text: '晴 · 微风', fontSize: 14,
    color: '#ffffff', anchor: [0, 0]
  }))

  // 分隔线
  layer.addElement(new RectElement({
    x: 20, y: 175, width: 360, height: 1,
    fillColor: '#334155'
  }))

  // 详细信息
  layer.addElement(new TextElement({
    x: 20, y: 190, text: '体感 26°', fontSize: 11,
    color: '#94a3b8', anchor: [0, 0]
  }))

  layer.addElement(new TextElement({
    x: 95, y: 190, text: '湿度 45%', fontSize: 11,
    color: '#94a3b8', anchor: [0, 0]
  }))

  layer.addElement(new TextElement({
    x: 165, y: 190, text: '风速 12km/h', fontSize: 11,
    color: '#94a3b8', anchor: [0, 0]
  }))

  await poster.exportPNG('app-08-weather', '../output')
  poster.destroy()
  console.log('Weather card saved to output/app-08-weather.png')
}

main().catch(console.error)