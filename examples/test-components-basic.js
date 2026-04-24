/**
 * 测试基本组件
 * Button, Card, Badge, Chip, Avatar, CircleElement, Star
 */
const {
  PosterBuilder,
  Button,
  Card,
  Badge,
  Chip,
  Avatar,
  CircleElement,
  Star,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#f8fafc'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })
  const cx = 400
  let y = 40

  // Button 按钮
  const button = new Button({
    x: cx, y: y, width: 160, height: 50,
    text: '按钮', backgroundColor: '#3b82f6', textColor: '#ffffff',
    anchor: [0.5, 0.5]
  })
  layer.addElement(button)
  y += 80

  // Card 卡片
  const card = new Card({
    x: cx, y: y, width: 350, height: 120,
    title: '卡片标题', subtitle: '卡片副标题内容',
    backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderWidth: 1, radius: 12,
    padding: 20,
    anchor: [0.5, 0.5]
  })
  layer.addElement(card)
  y += 150

  // Badge 徽章
  const badge = new Badge({
    x: cx, y: y, text: '新功能', backgroundColor: '#ef4444',
    anchor: [0.5, 0.5]
  })
  layer.addElement(badge)
  y += 60

  // Chip 标签
  const chip = new Chip({
    x: cx, y: y, text: '热门标签', backgroundColor: '#e2e8f0',
    anchor: [0.5, 0.5]
  })
  layer.addElement(chip)
  y += 70

  // Avatar 头像
  const avatar = new Avatar({
    x: cx, y: y, name: '张三', size: 60, backgroundColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(avatar)
  y += 90

  // CircleElement 圆形
  const circle = new CircleElement({
    x: cx, y: y, radius: 35,
    fillColor: '#f59e0b', strokeColor: '#d97706', strokeWidth: 3,
    anchor: [0.5, 0.5]
  })
  layer.addElement(circle)
  y += 80

  // Star 星星
  const star = new Star({
    x: cx, y: y, size: 40,
    fillColor: '#eab308', strokeColor: '#ca8a04', strokeWidth: 2,
    anchor: [0.5, 0.5]
  })
  layer.addElement(star)

  await poster.exportPNG('test-basic-components', './output')
  console.log('Basic components test saved to output/test-basic-components.png')
  poster.destroy()
}

main().catch(console.error)
