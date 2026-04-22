/**
 * 测试组件位置 - 针对之前发现问题的组件
 */
const {
  PosterBuilder,
  Avatar,
  Watermark,
  Feature,
  Quote,
  Progress,
  Notification,
  Chip,
  Icon,
  ListItem,
  StatCard,
  Star,
  Badge,
  Button,
  Card,
  RectElement,
  TextElement
} = require('../src/index')

async function main() {
  console.log('=== 测试组件位置 ===\n')

  const poster = new PosterBuilder({
    width: 1200,
    height: 800,
    backgroundColor: '#1a1a2e'
  })

  const layer = poster.createLayer({ name: '测试层', zIndex: 1 })

  let y = 50

  // ========== 1. Avatar 测试 ==========
  console.log('1. 测试 Avatar...')
  layer.addElement(new Avatar({
    x: 100,
    y: y,
    size: 80,
    initials: 'A',
    backgroundColor: '#6366f1'
  }))
  layer.addElement(new TextElement({
    x: 200,
    y: y + 40,
    text: 'Avatar Test - 应该水平居中',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 120

  // ========== 2. Watermark 测试 ==========
  console.log('2. 测试 Watermark...')
  layer.addElement(new Watermark({
    x: 100,
    y: y,
    text: '水印测试',
    fontSize: 48,
    color: 'rgba(255,255,255,0.3)'
  }))
  layer.addElement(new TextElement({
    x: 100,
    y: y + 60,
    text: 'Watermark Test - 文字应该在起点位置',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 120

  // ========== 3. Star 测试 ==========
  console.log('3. 测试 Star...')
  layer.addElement(new Star({
    x: 100,
    y: y,
    points: 5,
    outerRadius: 40,
    fillColor: '#fbbf24'
  }))
  layer.addElement(new TextElement({
    x: 200,
    y: y + 40,
    text: 'Star Test - 星星应该在圆心位置',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 120

  // ========== 4. StatCard 测试 ==========
  console.log('4. 测试 StatCard...')
  layer.addElement(new StatCard({
    x: 100,
    y: y,
    width: 200,
    height: 120,
    label: 'Total Users',
    value: '10,000',
    icon: '👥',
    backgroundColor: '#2d2d3a'
  }))
  layer.addElement(new TextElement({
    x: 320,
    y: y + 60,
    text: 'StatCard Test',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 160

  // ========== 5. Badge 测试 ==========
  console.log('5. 测试 Badge...')
  layer.addElement(new Badge({
    x: 100,
    y: y,
    text: '测试徽章',
    backgroundColor: '#ef4444'
  }))
  layer.addElement(new TextElement({
    x: 250,
    y: y + 20,
    text: 'Badge Test - 徽章应该居中',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 80

  // ========== 6. Button 测试 ==========
  console.log('6. 测试 Button...')
  layer.addElement(new Button({
    x: 100,
    y: y,
    text: '测试按钮',
    backgroundColor: '#3b82f6',
    padding: 30
  }))
  layer.addElement(new TextElement({
    x: 280,
    y: y + 30,
    text: 'Button Test - 按钮应该居中',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 100

  // ========== 7. Notification 测试 ==========
  console.log('7. 测试 Notification...')
  layer.addElement(new Notification({
    x: 100,
    y: y,
    title: '通知标题',
    message: '这是一条通知消息',
    notifType: 'info'
  }))
  layer.addElement(new TextElement({
    x: 500,
    y: y + 40,
    text: 'Notification Test',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 120

  // ========== 8. Progress 测试 ==========
  console.log('8. 测试 Progress...')
  layer.addElement(new Progress({
    x: 100,
    y: y,
    width: 300,
    height: 20,
    value: 65,
    fillColor: '#22c55e'
  }))
  layer.addElement(new TextElement({
    x: 420,
    y: y + 15,
    text: 'Progress Test',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 60

  // ========== 9. Chip 测试 ==========
  console.log('9. 测试 Chip...')
  layer.addElement(new Chip({
    x: 100,
    y: y,
    text: '标签芯片',
    backgroundColor: '#e0e7ff',
    color: '#4338ca'
  }))
  layer.addElement(new TextElement({
    x: 280,
    y: y + 15,
    text: 'Chip Test - 芯片应该居中',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 60

  // ========== 10. Icon 测试 (Emoji) ==========
  console.log('10. 测试 Icon (Emoji)...')
  layer.addElement(new Icon({
    x: 100,
    y: y,
    icon: '👍',
    size: 64
  }))
  layer.addElement(new TextElement({
    x: 200,
    y: y + 40,
    text: 'Icon Emoji Test - Emoji应该在方框中心',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 100

  // ========== 11. Quote 测试 ==========
  console.log('11. 测试 Quote...')
  layer.addElement(new Quote({
    x: 100,
    y: y,
    width: 400,
    text: '这是一段引用文字，用于测试引号组件的位置是否正确。',
    author: '鲁迅',
    backgroundColor: '#2d2d3a'
  }))
  layer.addElement(new TextElement({
    x: 520,
    y: y + 60,
    text: 'Quote Test',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 150

  // ========== 12. Feature 测试 ==========
  console.log('12. 测试 Feature...')
  layer.addElement(new Feature({
    x: 100,
    y: y,
    width: 200,
    height: 120,
    icon: '🚀',
    title: '特性标题',
    description: '特性描述文字',
    backgroundColor: '#2d2d3a'
  }))
  layer.addElement(new TextElement({
    x: 320,
    y: y + 60,
    text: 'Feature Test',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 160

  // ========== 13. ListItem 测试 ==========
  console.log('13. 测试 ListItem...')
  layer.addElement(new ListItem({
    x: 100,
    y: y,
    width: 400,
    height: 60,
    icon: '→',
    title: '列表项标题',
    description: '列表项描述',
    badge: 'NEW'
  }))
  layer.addElement(new TextElement({
    x: 520,
    y: y + 30,
    text: 'ListItem Test',
    fontSize: 16,
    color: '#ffffff'
  }))
  y += 100

  // ========== 14. Card 测试 ==========
  console.log('14. 测试 Card...')
  layer.addElement(new Card({
    x: 100,
    y: y,
    width: 300,
    height: 150,
    title: '卡片标题',
    subtitle: '卡片副标题内容',
    backgroundColor: '#2d2d3a'
  }))
  layer.addElement(new TextElement({
    x: 420,
    y: y + 75,
    text: 'Card Test',
    fontSize: 16,
    color: '#ffffff'
  }))

  console.log('\n开始渲染...')
  const output = await poster.exportPNG('test-positions', './output')
  console.log(`\n✅ 海报已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
