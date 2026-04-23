/**
 * 天气卡片
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
  Icon,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 360,
    height: 480,
    backgroundColor: '#87CEEB'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰云朵
  const cloud1 = new CircleElement({
    x: 280, y: 60, radius: 40,
    fillColor: '#ffffff', opacity: 0.6
  })
  layer.addElement(cloud1)

  const cloud2 = new CircleElement({
    x: 310, y: 80, radius: 30,
    fillColor: '#ffffff', opacity: 0.5
  })
  layer.addElement(cloud2)

  const cloud3 = new CircleElement({
    x: 50, y: 400, radius: 50,
    fillColor: '#ffffff', opacity: 0.3
  })
  layer.addElement(cloud3)

  // 城市和日期
  const city = new TextElement({
    x: padding, y: padding, width: 200,
    text: '上海市',
    fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(city)

  const date = new TextElement({
    x: padding, y: padding + 35, width: 200,
    text: '2024年12月25日 · 周三',
    fontSize: 13, color: 'rgba(255,255,255,0.8)'
  })
  layer.addElement(date)

  // 天气图标（大太阳）
  const sun = new CircleElement({
    x: 240, y: 100, radius: 50,
    fillColor: '#FFD700', opacity: 0.9
  })
  layer.addElement(sun)

  // 温度
  const temp = new TextElement({
    x: padding, y: 160, width: 200,
    text: '18°',
    fontSize: 80, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(temp)

  const weatherDesc = new TextElement({
    x: padding, y: 250, width: 200,
    text: '晴 · 适宜户外活动',
    fontSize: 18, color: 'rgba(255,255,255,0.9)'
  })
  layer.addElement(weatherDesc)

  // 详细信息框
  const infoBox = new RectElement({
    x: padding, y: 300, width: 312, height: 120,
    fillColor: 'rgba(255,255,255,0.2)', radius: 12
  })
  layer.addElement(infoBox)

  const details = [
    { label: '体感温度', value: '16°' },
    { label: '风力', value: '2级' },
    { label: '湿度', value: '45%' },
    { label: '紫外线', value: '中等' },
  ]

  let dx = padding + 20
  for (let i = 0; i < details.length; i++) {
    const d = details[i]
    const xPos = dx + (i % 2) * 150
    const yPos = 320 + Math.floor(i / 2) * 45

    const label = new TextElement({
      x: xPos, y: yPos, width: 80,
      text: d.label, fontSize: 12, color: 'rgba(255,255,255,0.7)'
    })
    layer.addElement(label)

    const value = new TextElement({
      x: xPos, y: yPos + 18, width: 80,
      text: d.value, fontSize: 18, color: '#ffffff', fontWeight: 'bold'
    })
    layer.addElement(value)
  }

  // 穿衣建议
  const tips = new TextElement({
    x: padding, y: 440, width: 312,
    text: '👔 建议穿着薄外套或卫衣，早晚温差较大',
    fontSize: 13, color: 'rgba(255,255,255,0.9)'
  })
  layer.addElement(tips)

  await poster.exportPNG('weather-card', './output')
  console.log('Weather card saved to output/weather-card.png')
  poster.destroy()
}

main().catch(console.error)