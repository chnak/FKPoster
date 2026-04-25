/**
 * 应用示例 - 个人资料卡
 * Profile Card
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Avatar,
  Badge,
  Divider,
  Button,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 380,
    height: 480,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 背景装饰
  layer.addElement(new RectElement({
    x: 190, y: 120, width: 380, height: 200,
    fillColor: '#6366f1', opacity: 0.3,
    anchor: [0.5, 0.5]
  }))

  // 头像
  layer.addElement(new Avatar({
    x: 190, y: 100, size: 100,
    name: '李明',
    backgroundColor: '#6366f1',
    borderColor: '#ffffff',
    borderWidth: 4
  }))

  // 姓名
  layer.addElement(new TextElement({
    x: 190, y: 220, text: '李 明', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 职位
  layer.addElement(new TextElement({
    x: 190, y: 260, text: '前端开发工程师', fontSize: 16,
    color: '#a0a0a0', anchor: [0.5, 0.5]
  }))

  // 标签
  layer.addElement(new Badge({
    x: 110, y: 300, text: 'React',
    backgroundColor: '#61dafb', color: '#000000',
    fontSize: 12, radius: 12, padding: 8
  }))

  layer.addElement(new Badge({
    x: 180, y: 300, text: 'Vue',
    backgroundColor: '#42b883', color: '#ffffff',
    fontSize: 12, radius: 12, padding: 8
  }))

  layer.addElement(new Badge({
    x: 240, y: 300, text: 'Node.js',
    backgroundColor: '#339933', color: '#ffffff',
    fontSize: 12, radius: 12, padding: 8
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 190, y: 350, width: 280, thickness: 1,
    color: '#3a3a4e', anchor: [0.5, 0.5]
  }))

  // 统计
  layer.addElement(new TextElement({
    x: 110, y: 385, text: '1.2k', fontSize: 24,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))
  layer.addElement(new TextElement({
    x: 110, y: 410, text: '粉丝', fontSize: 12,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 190, y: 385, text: '86', fontSize: 24,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))
  layer.addElement(new TextElement({
    x: 190, y: 410, text: '关注', fontSize: 12,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 270, y: 385, text: '328', fontSize: 24,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))
  layer.addElement(new TextElement({
    x: 270, y: 410, text: '获赞', fontSize: 12,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  // 按钮
  layer.addElement(new Button({
    x: 190, y: 450, width: 160, height: 40,
    text: '关注', backgroundColor: '#6366f1',
    textColor: '#ffffff', fontSize: 14, radius: 20
  }))

  await poster.exportPNG('app-11-profile-card', './output')
  poster.destroy()
  console.log('Profile card saved to output/app-11-profile-card.png')
}

main().catch(console.error)