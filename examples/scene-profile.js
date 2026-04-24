/**
 * 社交媒体个人资料卡
 */
const {
  PosterBuilder,
  Avatar,
  Card,
  Button,
  StatCard,
  Chip,
  Divider,
  TextElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 1000,
    backgroundColor: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 头像
  const avatar = new Avatar({
    x: 400, y: 150, name: '张小明', size: 120,
    backgroundColor: '#ffffff', color: '#667eea',
    anchor: [0.5, 0.5]
  })
  layer.addElement(avatar)

  // 用户名
  const username = new TextElement({
    x: 400, y: 290, text: '@zhangxiaoming', fontSize: 24, fontFamily: 'Arial',
    color: '#ffffff', textAlign: 'center', fontWeight: 'bold',
    anchor: [0.5, 0.5]
  })
  layer.addElement(username)

  // 个人简介
  const bio = new TextElement({
    x: 400, y: 330, text: '设计师 & 前端开发 | 热爱创作', fontSize: 16, fontFamily: 'Microsoft YaHei',
    color: 'rgba(255,255,255,0.8)', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(bio)

  // 标签
  const tags = ['#设计', '#前端', '#创意', '#UI/UX']
  tags.forEach((tag, i) => {
    const chip = new Chip({
      x: 150 + i * 130, y: 390, text: tag, backgroundColor: 'rgba(255,255,255,0.2)',
      color: '#ffffff',
      anchor: [0.5, 0.5]
    })
    layer.addElement(chip)
  })

  // 统计卡片
  const statsY = 500
  const stat1 = new StatCard({
    x: 200, y: statsY, width: 160, height: 90,
    value: '1.2K', label: '粉丝', backgroundColor: 'rgba(255,255,255,0.15)',
    anchor: [0.5, 0.5]
  })
  layer.addElement(stat1)

  const stat2 = new StatCard({
    x: 400, y: statsY, width: 160, height: 90,
    value: '568', label: '关注', backgroundColor: 'rgba(255,255,255,0.15)',
    anchor: [0.5, 0.5]
  })
  layer.addElement(stat2)

  const stat3 = new StatCard({
    x: 600, y: statsY, width: 160, height: 90,
    value: '3.5K', label: '获赞', backgroundColor: 'rgba(255,255,255,0.15)',
    anchor: [0.5, 0.5]
  })
  layer.addElement(stat3)

  // 分割线
  const divider = new Divider({
    x: 400, y: 650, width: 500, color: 'rgba(255,255,255,0.3)', thickness: 1,
    anchor: [0.5, 0.5]
  })
  layer.addElement(divider)

  // 按钮
  const followBtn = new Button({
    x: 280, y: 780, width: 180, height: 50,
    text: '关注', backgroundColor: '#ffffff', textColor: '#667eea',
    radius: 25,
    anchor: [0.5, 0.5]
  })
  layer.addElement(followBtn)

  const messageBtn = new Button({
    x: 520, y: 780, width: 180, height: 50,
    text: '私信', backgroundColor: 'rgba(255,255,255,0.2)', textColor: '#ffffff',
    radius: 25,
    anchor: [0.5, 0.5]
  })
  layer.addElement(messageBtn)

  // 底部信息
  const footer = new TextElement({
    x: 400, y: 900, text: '小红书号: 123456789', fontSize: 14, fontFamily: 'Microsoft YaHei',
    color: 'rgba(255,255,255,0.6)', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(footer)

  await poster.exportPNG('social-profile-card', './output')
  console.log('Social profile card saved to output/social-profile-card.png')
  poster.destroy()
}

main().catch(console.error)
