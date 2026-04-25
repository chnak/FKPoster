/**
 * 应用示例 - 微信公众号文章配图
 * WeChat Article Cover
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Badge,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 400,
    backgroundColor: '#07C160'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 装饰
  layer.addElement(new RectElement({
    x: 400, y: 300, width: 200, height: 200,
    fillColor: '#ffffff', opacity: 0.1,
    borderRadius: 100
  }))

  // 公众号标识
  layer.addElement(new RectElement({
    x: 250, y: 60, width: 160, height: 40,
    fillColor: '#ffffff',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 60, text: '微信公众号', fontSize: 14,
    color: '#07C160', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 主标题
  layer.addElement(new TextElement({
    x: 250, y: 160, text: '如何使用AI工具', fontSize: 36,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 220, text: '提升工作效率300%', fontSize: 24,
    color: '#ffffff', opacity: 0.9, anchor: [0.5, 0.5]
  }))

  // 分隔线
  layer.addElement(new Divider({
    x: 250, y: 280, width: 300, thickness: 2,
    color: '#ffffff', opacity: 0.5, anchor: [0.5, 0.5]
  }))

  // 二维码提示
  layer.addElement(new RectElement({
    x: 250, y: 330, width: 80, height: 80,
    fillColor: '#ffffff',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 330, text: 'QR', fontSize: 16,
    color: '#07C160', anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 250, y: 380, text: '长按识别阅读', fontSize: 12,
    color: '#ffffff', opacity: 0.8, anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-19-wechat', '../output')
  poster.destroy()
  console.log('WeChat cover saved to output/app-19-wechat.png')
}

main().catch(console.error)