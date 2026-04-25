/**
 * 应用示例 - 名片
 * Business Card
 */
const {
  PosterBuilder,
  TextElement,
  Avatar,
  Divider,
  QRCode,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 240,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 头像
  layer.addElement(new Avatar({
    x: 70, y: 70, size: 60,
    name: '张三',
    backgroundColor: '#6366f1',
    borderColor: '#ffffff',
    borderWidth: 3
  }))

  // 姓名
  layer.addElement(new TextElement({
    x: 150, y: 50, text: '张 三', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold'
  }))

  // 职位
  layer.addElement(new TextElement({
    x: 150, y: 85, text: '高级产品设计师', fontSize: 14,
    color: '#a0a0a0'
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 150, y: 115, width: 200, thickness: 1,
    color: '#3a3a4e'
  }))

  // 联系信息
  layer.addElement(new TextElement({
    x: 150, y: 135, text: '📧 zhangsan@company.com', fontSize: 12,
    color: '#c0c0c0'
  }))

  layer.addElement(new TextElement({
    x: 150, y: 160, text: '📱 138-0000-8888', fontSize: 12,
    color: '#c0c0c0'
  }))

  layer.addElement(new TextElement({
    x: 150, y: 185, text: '🌐 www.company.com', fontSize: 12,
    color: '#c0c0c0'
  }))

  // 二维码
  layer.addElement(new QRCode({
    x: 330, y: 140, size: 70,
    value: 'https://company.com/zhangsan',
    color: '#ffffff'
  }))

  await poster.exportPNG('app-01-business-card', './output')
  poster.destroy()
  console.log('Business card saved to output/app-01-business-card.png')
}

main().catch(console.error)