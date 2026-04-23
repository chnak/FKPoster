/**
 * 一行两列布局示例
 */
const { PosterBuilder, TextElement, RectElement, CircleElement, Button, Badge } = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 400,
    backgroundColor: '#f8fafc'
  })

  // 布局参数
  const gap = 20
  const padding = 30
  const columnWidth = (poster.width - padding * 2 - gap) / 2

  // 先初始化 Paper.js
  poster.initialize()

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 左列示例 1 - 卡片组件
  const leftX = padding
  const card1 = new RectElement({
    x: leftX,
    y: padding,
    width: columnWidth,
    height: poster.height - padding * 2,
    fillColor: '#ffffff',
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
    radius: 12
  })
  layer.addElement(card1)

  const title1 = new TextElement({
    x: leftX + 20,
    y: padding + 30,
    width: columnWidth - 40,
    text: '左侧示例 1',
    fontSize: 20,
    color: '#1e293b',
    fontWeight: 'bold'
  })
  layer.addElement(title1)

  const desc1 = new TextElement({
    x: leftX + 20,
    y: padding + 60,
    width: columnWidth - 40,
    text: '这是一个卡片组件示例',
    fontSize: 14,
    color: '#64748b'
  })
  layer.addElement(desc1)

  const btn1 = new Button({
    x: leftX + 20,
    y: padding + 100,
    width: 120,
    height: 36,
    text: '按钮',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    radius: 6
  })
  layer.addElement(btn1)

  // 右列示例 2 - 另一个组件
  const rightX = padding + columnWidth + gap
  const card2 = new RectElement({
    x: rightX,
    y: padding,
    width: columnWidth,
    height: poster.height - padding * 2,
    fillColor: '#ffffff',
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
    radius: 12,
    zIndex: -1
  })
  layer.addElement(card2)

  const title2 = new TextElement({
    x: rightX + 20,
    y: padding + 30,
    width: columnWidth - 40,
    text: '右侧示例 2',
    fontSize: 20,
    color: '#1e293b',
    fontWeight: 'bold'
  })
  layer.addElement(title2)

  const desc2 = new TextElement({
    x: rightX + 20,
    y: padding + 60,
    width: columnWidth - 40,
    text: '包含圆形和徽章组件',
    fontSize: 14,
    color: '#64748b'
  })
  layer.addElement(desc2)

  const circle1 = new CircleElement({
    x: rightX + 50,
    y: padding + 130,
    radius: 40,
    fillColor: '#10b981'
  })
  layer.addElement(circle1)

  const circle2 = new CircleElement({
    x: rightX + 150,
    y: padding + 130,
    radius: 40,
    fillColor: '#f59e0b'
  })
  layer.addElement(circle2)

  const badge1 = new Badge({
    x: rightX + columnWidth - 80,
    y: padding + 20,
    text: 'NEW',
    backgroundColor: '#ef4444',
    textColor: '#ffffff',
    fontSize: 12,
    paddingX: 8,
    paddingY: 4,
    radius: 4,
    zIndex: 10
  })
  layer.addElement(badge1)

  // 渲染并导出
  await poster.exportPNG('columns-example', './output')
  console.log('Columns example saved to output/columns-example.png')
  poster.destroy()
}

main().catch(console.error)
