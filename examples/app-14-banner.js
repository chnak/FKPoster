/**
 * 应用示例 - 广告横幅
 * Banner Ad
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Button,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 750,
    height: 200,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 左侧装饰
  layer.addElement(new RectElement({
    x: -50, y: 100, width: 200, height: 200,
    fillColor: '#6366f1', opacity: 0.3,
    borderRadius: 100
  }))

  // 标签
  layer.addElement(new Badge({
    x: 100, y: 50, text: '广告',
    backgroundColor: '#ef4444', color: '#ffffff',
    fontSize: 10, radius: 4, padding: 6
  }))

  // 主文案
  layer.addElement(new TextElement({
    x: 280, y: 70, text: '新用户首单立减50元', fontSize: 32,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 副文案
  layer.addElement(new TextElement({
    x: 280, y: 120, text: '精选好物，品质保障', fontSize: 16,
    color: '#a0a0a0', anchor: [0.5, 0.5]
  }))

  // 按钮
  layer.addElement(new Button({
    x: 620, y: 100, width: 120, height: 45,
    text: '立即领取', backgroundColor: '#6366f1',
    textColor: '#ffffff', fontSize: 14, radius: 22
  }))

  // 右侧装饰
  layer.addElement(new RectElement({
    x: 700, y: 100, width: 100, height: 100,
    fillColor: '#4ecdc4', opacity: 0.3,
    borderRadius: 50
  }))

  await poster.exportPNG('app-14-banner', '../output')
  poster.destroy()
  console.log('Banner saved to output/app-14-banner.png')
}

main().catch(console.error)