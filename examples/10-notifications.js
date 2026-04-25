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

  // 带标题和文本的通知
  layer.addElement(new Notification({
    x: 400, y: 140, width: 320,
    type: 'success',
    title: '提交成功',
    text: '您的资料已成功提交，我们会尽快处理',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 240, width: 320,
    type: 'warning',
    title: '存储空间不足',
    text: '您的云盘空间已用尽，建议清理不需要的文件或升级存储套餐',
    anchor: [0.5, 0.5]
  }))

  // 无标题的通知
  layer.addElement(new Notification({
    x: 400, y: 340, text: '操作成功！', type: 'success', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 400, text: '警告信息，请注意', type: 'warning', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 460, text: '这是一条普通消息', type: 'info', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Notification({
    x: 400, y: 520, text: '错误：操作失败', type: 'error', anchor: [0.5, 0.5]
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