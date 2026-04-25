/**
 * 进度条测试
 * Progress, ProgressCircle
 */
const {
  PosterBuilder,
  TextElement,
  Progress,
  ProgressCircle,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#0f0f23'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '进度条测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Progress 条形进度条
  layer.addElement(new Progress({
    x: 400, y: 150, width: 500, height: 28, value: 75,
    trackColor: '#2d2d44', fillColor: '#00d9ff', radius: 14, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Progress({
    x: 400, y: 220, width: 500, height: 20, value: 50,
    trackColor: '#2d2d44', fillColor: '#e94560', radius: 10, anchor: [0.5, 0.5]
  }))

  layer.addElement(new Progress({
    x: 400, y: 280, width: 500, height: 16, value: 30,
    trackColor: '#2d2d44', fillColor: '#533483', radius: 8, anchor: [0.5, 0.5]
  }))

  // ProgressCircle 圆形进度
  layer.addElement(new ProgressCircle({
    x: 200, y: 450, radius: 70, value: 65,
    trackColor: '#2d2d44', fillColor: '#00d9ff', strokeWidth: 10, anchor: [0.5, 0.5]
  }))

  layer.addElement(new ProgressCircle({
    x: 400, y: 450, radius: 70, value: 80,
    trackColor: '#2d2d44', fillColor: '#e94560', strokeWidth: 10, anchor: [0.5, 0.5]
  }))

  layer.addElement(new ProgressCircle({
    x: 600, y: 450, radius: 70, value: 45,
    trackColor: '#2d2d44', fillColor: '#533483', strokeWidth: 10, anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('04-progress', '../output')
  poster.destroy()
  console.log('Progress test saved to output/04-progress.png')
}

main().catch(console.error)