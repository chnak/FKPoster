/**
 * 通知和标签测试
 * Notification, TagCloud, Stepper
 */
const {
  PosterBuilder,
  TextElement,
  Notification,
  TagCloud,
  Stepper,
  Chip,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '通知与标签测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Notification 通知
  layer.addElement(new Notification({
    x: 400, y: 130, text: '操作成功！', type: 'success', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 200, text: '警告信息，请注意', type: 'warning', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 270, text: '这是一条普通消息', type: 'info', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 340, text: '错误：操作失败', type: 'error', anchor: [0.5, 0.5]
  }))

  // TagCloud 标签云
  layer.addElement(new TagCloud({
    x: 400, y: 440, width: 600, height: 80,
    tags: ['JavaScript', 'TypeScript', 'React', 'Vue', 'Node.js', 'Python', 'Go', 'Rust'],
    anchor: [0.5, 0.5]
  }))

  // Stepper 步骤指示器
  layer.addElement(new Stepper({
    x: 400, y: 570, width: 600, height: 60,
    currentStep: 2, totalSteps: 4,
    labels: ['注册', '验证', '绑定', '完成'],
    anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('10-notifications', './output')
  poster.destroy()
  console.log('Notifications test saved to output/10-notifications.png')
}

main().catch(console.error)