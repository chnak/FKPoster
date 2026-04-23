/**
 * 更多一行两列布局示例
 */
const { PosterBuilder, TextElement, RectElement, CircleElement, Button, Badge, Avatar, Rating, Progress, Chip, Divider } = require('../src/index')

async function main() {
  // ========== 示例 2: 用户资料卡片 ==========
  const poster2 = new PosterBuilder({
    width: 800,
    height: 400,
    backgroundColor: '#f8fafc'
  })

  const gap = 20
  const padding = 30
  const columnWidth = (poster2.width - padding * 2 - gap) / 2

  poster2.initialize()
  const layer2 = poster2.createLayer({ name: 'main', zIndex: 0 })

  // 左列 - 用户资料卡片
  const leftX = padding
  const card1 = new RectElement({
    x: leftX,
    y: padding,
    width: columnWidth,
    height: poster2.height - padding * 2,
    fillColor: '#ffffff',
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
    radius: 12,
    zIndex: -1
  })
  layer2.addElement(card1)

  const avatar1 = new Avatar({
    x: leftX + columnWidth / 2,
    y: padding + 50,
    src: 'https://via.placeholder.com/80',
    size: 80,
    zIndex: 2
  })
  layer2.addElement(avatar1)

  const name1 = new TextElement({
    x: leftX + 20,
    y: padding + 150,
    width: columnWidth - 40,
    text: '张三',
    fontSize: 20,
    color: '#1e293b',
    fontWeight: 'bold',
    textAlign: 'center'
  })
  layer2.addElement(name1)

  const bio1 = new TextElement({
    x: leftX + 20,
    y: padding + 180,
    width: columnWidth - 40,
    text: '前端开发工程师',
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center'
  })
  layer2.addElement(bio1)

  const rating1 = new Rating({
    x: leftX + columnWidth / 2 - 60,
    y: padding + 210,
    value: 4.5,
    size: 20,
    zIndex: 2
  })
  layer2.addElement(rating1)

  // 右列 - 产品信息卡片
  const rightX = padding + columnWidth + gap
  const card2 = new RectElement({
    x: rightX,
    y: padding,
    width: columnWidth,
    height: poster2.height - padding * 2,
    fillColor: '#ffffff',
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
    radius: 12,
    zIndex: -1
  })
  layer2.addElement(card2)

  const productTitle = new TextElement({
    x: rightX + 20,
    y: padding + 30,
    width: columnWidth - 40,
    text: 'iPhone 15 Pro',
    fontSize: 20,
    color: '#1e293b',
    fontWeight: 'bold'
  })
  layer2.addElement(productTitle)

  const price = new TextElement({
    x: rightX + 20,
    y: padding + 60,
    text: '¥8999',
    fontSize: 24,
    color: '#ef4444',
    fontWeight: 'bold'
  })
  layer2.addElement(price)

  const desc2 = new TextElement({
    x: rightX + 20,
    y: padding + 100,
    width: columnWidth - 40,
    text: 'A17 Pro 芯片 | 钛金属设计 | 4800万像素',
    fontSize: 12,
    color: '#64748b'
  })
  layer2.addElement(desc2)

  const progress1 = new Progress({
    x: rightX + 20,
    y: padding + 150,
    width: columnWidth - 40,
    height: 12,
    value: 75,
    trackColor: '#e2e8f0',
    fillColor: '#3b82f6',
    zIndex: 2
  })
  layer2.addElement(progress1)

  const progressLabel = new TextElement({
    x: rightX + 20,
    y: padding + 175,
    text: '库存剩余 25%',
    fontSize: 12,
    color: '#64748b'
  })
  layer2.addElement(progressLabel)

  const chip1 = new Chip({
    x: rightX + 20,
    y: padding + 200,
    text: '热销',
    backgroundColor: '#fef3c7',
    textColor: '#92400e',
    fontSize: 12,
    zIndex: 2
  })
  layer2.addElement(chip1)

  const chip2 = new Chip({
    x: rightX + 80,
    y: padding + 200,
    text: '新品',
    backgroundColor: '#dbeafe',
    textColor: '#1e40af',
    fontSize: 12,
    zIndex: 2
  })
  layer2.addElement(chip2)

  const divider2 = new Divider({
    x: rightX + 20,
    y: padding + 250,
    width: columnWidth - 40,
    color: '#e2e8f0',
    thickness: 1
  })
  layer2.addElement(divider2)

  const shipInfo = new TextElement({
    x: rightX + 20,
    y: padding + 270,
    text: '顺丰包邮 | 预计 2-3 天送达',
    fontSize: 12,
    color: '#64748b'
  })
  layer2.addElement(shipInfo)

  await poster2.exportPNG('columns-example-2', './output')
  console.log('Example 2 saved to output/columns-example-2.png')
  poster2.destroy()
}

main().catch(console.error)
