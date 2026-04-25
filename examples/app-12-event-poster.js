/**
 * 应用示例 - 活动海报
 * Event Poster
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Divider,
  Badge,
  Button,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 700,
    backgroundColor: '#0f0f23'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰元素
  layer.addElement(new RectElement({
    x: 400, y: 200, width: 200, height: 200,
    fillColor: '#ff6b6b', opacity: 0.2,
    borderRadius: 100
  }))

  layer.addElement(new RectElement({
    x: 50, y: 450, width: 150, height: 150,
    fillColor: '#4ecdc4', opacity: 0.2,
    borderRadius: 75
  }))

  // 活动标签
  layer.addElement(new Badge({
    x: 250, y: 80, text: '线下活动',
    backgroundColor: '#ff6b6b', color: '#ffffff',
    fontSize: 16, radius: 20, padding: 15
  }))

  // 主标题
  layer.addElement(new TextElement({
    x: 250, y: 170, text: '技术分享会', fontSize: 44,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 主题
  layer.addElement(new TextElement({
    x: 250, y: 240, text: 'AI驱动的前端开发变革', fontSize: 22,
    color: '#4ecdc4', anchor: [0.5, 0.5]
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 250, y: 300, width: 350, thickness: 2,
    color: '#3a3a5e', anchor: [0.5, 0.5]
  }))

  // 活动信息
  const infoX = 250
  layer.addElement(new TextElement({
    x: 80, y: 360, text: '📅 日期', fontSize: 16,
    color: '#888888'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 360, text: '2026年5月15日', fontSize: 16,
    color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 80, y: 400, text: '⏰ 时间', fontSize: 16,
    color: '#888888'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 400, text: '14:00 - 18:00', fontSize: 16,
    color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 80, y: 440, text: '📍 地点', fontSize: 16,
    color: '#888888'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 440, text: '中关村软件园', fontSize: 16,
    color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 80, y: 480, text: '👥 人数', fontSize: 16,
    color: '#888888'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 480, text: '限200人', fontSize: 16,
    color: '#ff6b6b', fontWeight: 'bold'
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 250, y: 530, width: 350, thickness: 1,
    color: '#3a3a5e', anchor: [0.5, 0.5]
  }))

  // 嘉宾
  layer.addElement(new TextElement({
    x: 250, y: 570, text: '特邀嘉宾', fontSize: 14,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 595, text: '王教授 · 张总监 · 李技术VP', fontSize: 14,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 按钮
  layer.addElement(new Button({
    x: 250, y: 650, width: 180, height: 50,
    text: '立即报名', backgroundColor: '#ff6b6b',
    textColor: '#ffffff', fontSize: 18, radius: 25
  }))

  await poster.exportPNG('app-12-event-poster', '../output')
  poster.destroy()
  console.log('Event poster saved to output/app-12-event-poster.png')
}

main().catch(console.error)