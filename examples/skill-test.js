/**
 * 根据 SKILL.md 制作的测试示例
 */
const { PosterBuilder, TextElement, RectElement, Card, Badge, Button, Quote } = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 600,
    height: 400,
    backgroundColor: '#f8fafc'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 添加一个矩形
  const rect = new RectElement({
    x: 300, y: 100, width: 200, height: 80,
    fillColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(rect)

  // 添加文本
  const text = new TextElement({
    x: 50, y: 50,
    text: '这是一个测试海报',
    fontSize: 24,
    color: '#1e293b',
    anchor: [0, 0]
  })
  layer.addElement(text)

  // 添加卡片
  const card = new Card({
    x: 300, y: 280,
    width: 350,
    height: 160,
    title: '卡片标题',
    titleSize: 24,
    titleColor: '#000000',
    subtitle: '卡片副标题内容，这是一个比较长的文本用于测试自动换行功能',
    subtitleSize: 16,
    subtitleColor: '#666666',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    radius: 12,
    padding: 20,
    anchor: [0.5, 0.5]
  })
  layer.addElement(card)

  // 添加徽章
  const badge = new Badge({
    x: 500, y: 50,
    text: '新功能',
    backgroundColor: '#ef4444',
    color: '#ffffff',
    fontSize: 12,
    padding: 12,
    radius: 12,
    anchor: [0.5, 0.5]
  })
  layer.addElement(badge)

  // 添加按钮
  const button = new Button({
    x: 150, y: 350,
    width: 160,
    height: 50,
    text: '点击我',
    textColor: '#ffffff',
    fontSize: 24,
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
    borderWidth: 0,
    radius: 8,
    anchor: [0.5, 0.5]
  })
  layer.addElement(button)

  // 添加引用
  const quote = new Quote({
    x: 450, y: 350,
    width: 200,
    text: '这是引用内容的文本，用于测试引用组件',
    author: '引用作者',
    backgroundColor: '#2d2d3a',
    borderColor: '#00d9ff',
    fontSize: 14,
    anchor: [0.5, 0.5]
  })
  layer.addElement(quote)

  await poster.exportPNG('skill-test', './output')
  poster.destroy()
  console.log('SKILL.md 测试海报已保存到 output/skill-test.png')
}

main().catch(console.error)