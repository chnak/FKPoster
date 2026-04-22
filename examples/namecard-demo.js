/**
 * 名片示例
 */
const { PosterBuilder, Card, Button, Avatar, TextElement, Icon, Divider, QRCode } = require('../src/index')

async function main() {
  console.log('=== 创建名片 ===\n')

  const poster = new PosterBuilder({
    width: 400,
    height: 240,
    backgroundColor: '#1a1a2e'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 头像
  layer.addElement(new Avatar({
    x: 30, y: 40, size: 80,
    icon: '👨‍💻', backgroundColor: '#3b82f6', radius: 40
  }))

  // 姓名和职位
  layer.addElement(new TextElement({
    x: 130, y: 50, text: '张三', fontSize: 28, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 130, y: 85, text: '高级前端工程师', fontSize: 14, color: '#94a3b8'
  }))

  // 联系信息
  layer.addElement(new TextElement({
    x: 130, y: 120, text: '📧 zhangsan@foliko.com', fontSize: 11, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 130, y: 140, text: '📱 138-8888-8888', fontSize: 11, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 130, y: 160, text: '📍 上海市浦东新区', fontSize: 11, color: '#64748b'
  }))

  // 二维码
  layer.addElement(new QRCode({
    x: 300, y: 50, size: 100,
    data: 'https://foliko.com/u/zhangsan',
    backgroundColor: '#ffffff'
  }))

  // 公司名称
  layer.addElement(new TextElement({
    x: 30, y: 200, text: 'FOLIKO 技术有限公司', fontSize: 10, color: '#475569'
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('namecard', './output')
  console.log(`\n✅ 名片已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
