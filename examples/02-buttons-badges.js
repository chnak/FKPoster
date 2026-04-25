/**
 * 按钮和徽章测试
 * Button, Badge, CTA, Chip
 */
const {
  PosterBuilder,
  TextElement,
  Button,
  Badge,
  CTA,
  Chip,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 600,
    backgroundColor: '#16213e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '按钮与徽章测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Button
  layer.addElement(new Button({
    x: 200, y: 150, text: '主要按钮', fontSize: 20,
    backgroundColor: '#e94560', radius: 8, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Button({
    x: 400, y: 150, text: '次要按钮', fontSize: 20,
    backgroundColor: '#0f3460', radius: 8, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Button({
    x: 600, y: 150, text: '禁用状态', fontSize: 20,
    backgroundColor: '#533483', radius: 8, opacity: 0.5, anchor: [0.5, 0.5]
  }))

  // CTA
  layer.addElement(new CTA({
    x: 400, y: 250, text: '立即行动', fontSize: 24,
    backgroundColor: '#00d9ff', color: '#000000', anchor: [0.5, 0.5]
  }))

  // Badge
  layer.addElement(new Badge({
    x: 200, y: 350, text: '热门', backgroundColor: '#e94560',
    fontSize: 18, padding: 12, radius: 20, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Badge({
    x: 400, y: 350, text: '新品', backgroundColor: '#00d9ff',
    fontSize: 18, padding: 12, radius: 20, color: '#000000', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Badge({
    x: 600, y: 350, text: '热卖', backgroundColor: '#533483',
    fontSize: 18, padding: 12, radius: 20, anchor: [0.5, 0.5]
  }))

  // Chip
  layer.addElement(new Chip({
    x: 200, y: 450, text: 'JavaScript', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Chip({
    x: 350, y: 450, text: 'TypeScript', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Chip({
    x: 500, y: 450, text: 'React', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Chip({
    x: 620, y: 450, text: 'Node.js', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('02-buttons-badges', './output')
  poster.destroy()
  console.log('Buttons and badges test saved to output/02-buttons-badges.png')
}

main().catch(console.error)