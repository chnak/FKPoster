/**
 * 特性展示测试
 * Feature, FeatureGrid
 */
const {
  PosterBuilder,
  TextElement,
  Feature,
  FeatureGrid,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#0f0f23'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '特性展示测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Feature 单个特性
  layer.addElement(new Feature({
    x: 200, y: 150, width: 160, height: 140,
    icon: '🚀', title: '快速', desc: '高效开发体验',
    backgroundColor: '#16213e', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Feature({
    x: 400, y: 150, width: 160, height: 140,
    icon: '🔒', title: '安全', desc: '数据加密保护',
    backgroundColor: '#16213e', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Feature({
    x: 600, y: 150, width: 160, height: 140,
    icon: '💎', title: '专业', desc: '品质保障服务',
    backgroundColor: '#16213e', anchor: [0.5, 0.5]
  }))

  // FeatureGrid 特性网格
  layer.addElement(new FeatureGrid({
    x: 400, y: 400, width: 600, height: 200,
    features: [
      { icon: '⚡', title: '性能', desc: '优化速度' },
      { icon: '🎯', title: '精准', desc: '精确定位' },
      { icon: '🌐', title: '全球', desc: '覆盖广泛' },
      { icon: '💰', title: '实惠', desc: '价格合理' },
    ],
    backgroundColor: '#1a1a2e', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('09-features', './output')
  poster.destroy()
  console.log('Features test saved to output/09-features.png')
}

main().catch(console.error)