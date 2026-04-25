/**
 * 网格和布局测试
 * Grid, Columns, Watermark (需图片)
 */
const {
  PosterBuilder,
  TextElement,
  Grid,
  Columns,
  RectElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#0f0f23'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '网格与布局测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Grid 网格
  layer.addElement(new TextElement({
    x: 400, y: 110, text: 'Grid 网格布局', fontSize: 16,
    color: '#94a3b8', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Grid({
    x: 400, y: 150, width: 400, height: 180,
    rows: 2, cols: 3,
    backgroundColor: '#1a1a2e', gap: 10,
    children: [
      { text: 'A1', backgroundColor: '#e94560' },
      { text: 'B1', backgroundColor: '#0f3460' },
      { text: 'C1', backgroundColor: '#533483' },
      { text: 'A2', backgroundColor: '#16213e' },
      { text: 'B2', backgroundColor: '#16213e' },
      { text: 'C2', backgroundColor: '#16213e' },
    ],
    anchor: [0.5, 0.5]
  }))

  // Columns 多列布局
  layer.addElement(new TextElement({
    x: 400, y: 370, text: 'Columns 多列布局', fontSize: 16,
    color: '#94a3b8', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Columns({
    x: 400, y: 420, width: 500, height: 100,
    columns: 3,
    children: [
      { text: '第一列内容', backgroundColor: '#e94560' },
      { text: '第二列内容', backgroundColor: '#0f3460' },
      { text: '第三列内容', backgroundColor: '#533483' },
    ],
    anchor: [0.5, 0.5]
  }))

  // 自定义多列示例
  layer.addElement(new Columns({
    x: 400, y: 570, width: 500, height: 80,
    columns: 4,
    children: [
      { text: '功能', backgroundColor: '#16213e' },
      { text: '性能', backgroundColor: '#16213e' },
      { text: '安全', backgroundColor: '#16213e' },
      { text: '支持', backgroundColor: '#16213e' },
    ],
    anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('12-grid-columns', '../output')
  poster.destroy()
  console.log('Grid and columns test saved to output/12-grid-columns.png')
}

main().catch(console.error)