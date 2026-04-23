/**
 * 测试海报 - 渐变双色调风格
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
    height: 600,
    backgroundColor: '#1a1a2e'
  })

  const padding = 28
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 渐变圆形背景
  const circle1 = new CircleElement({
    x: 100, y: 200, radius: 280,
    fillColor: '#667eea', opacity: 0.3
  })
  layer.addElement(circle1)

  const circle2 = new CircleElement({
    x: 300, y: 400, radius: 200,
    fillColor: '#f093fb', opacity: 0.25
  })
  layer.addElement(circle2)

  // 顶部标签
  const badge = new Badge({
    x: padding, y: padding, text: '✦ FEATURED',
    backgroundColor: '#667eea', textColor: '#ffffff', padding: 6
  })
  layer.addElement(badge)

  // 主标题
  const title = new TextElement({
    x: padding, y: 150, width: 344,
    text: '音你而动',
    fontSize: 58, color: '#ffffff', fontWeight: 'bold'
  })
  layer.addElement(title)

  const titleEn = new TextElement({
    x: padding, y: 220, width: 344,
    text: 'MOVE TO THE BEAT',
    fontSize: 14, color: '#f093fb', letterSpacing: 6
  })
  layer.addElement(titleEn)

  // 分隔线
  const divider = new Divider({
    x: padding, y: 270, width: 100, color: '#764ba2', thickness: 2
  })
  layer.addElement(divider)

  // 描述
  const desc = new TextElement({
    x: padding, y: 310, width: 344,
    text: '沉浸式音乐体验\n让每一刻都充满节奏\n\n戴上耳机，世界就是你的舞池',
    fontSize: 15, color: '#e0e0e0', lineHeight: 1.8
  })
  layer.addElement(desc)

  // 统计数据
  const stats = [
    { value: '10M+', label: '播放量' },
    { value: '500+', label: '歌单' },
    { value: 'Hi-Fi', label: '音质' },
  ]

  let sx = padding
  for (const s of stats) {
    const value = new TextElement({
      x: sx, y: 440, width: 100,
      text: s.value, fontSize: 24, color: '#667eea', fontWeight: 'bold', textAlign: 'center'
    })
    layer.addElement(value)

    const label = new TextElement({
      x: sx, y: 470, width: 100,
      text: s.label, fontSize: 11, color: '#888888', textAlign: 'center'
    })
    layer.addElement(label)
    sx += 110
  }

  // 底部提示
  const footer = new TextElement({
    x: 0, y: 540, width: 400, textAlign: 'center',
    text: '▶ 开始播放',
    fontSize: 16, color: '#667eea'
  })
  layer.addElement(footer)

  // 装饰线
  const line = new RectElement({
    x: padding, y: 570, width: 344, height: 2,
    fillColor: '#764ba2', opacity: 0.5
  })
  layer.addElement(line)

  await poster.exportPNG('poster-duotone', './output')
  console.log('Duotone poster saved to output/poster-duotone.png')
  poster.destroy()
}

main().catch(console.error)
