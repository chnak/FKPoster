/**
 * 表格和文本测试
 * Table, HighlightText, Icon
 */
const {
  PosterBuilder,
  TextElement,
  Table,
  HighlightText,
  Icon,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#16213e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 50, text: '表格与高亮文本测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Table 表格
  layer.addElement(new Table({
    x: 400, y: 150, width: 500, height: 120,
    columns: [
      { title: '姓名', width: 100 },
      { title: '年龄', width: 80 },
      { title: '城市', width: 100 },
      { title: '职业', width: 100 },
    ],
    rows: [
      ['张三', '28', '北京', '工程师'],
      ['李四', '25', '上海', '设计师'],
      ['王五', '32', '深圳', '产品经理'],
    ],
    anchor: [0.5, 0.5]
  }))

  // HighlightText 高亮文本
  layer.addElement(new HighlightText({
    x: 400, y: 320, text: '重要提示：每日限时优惠', fontSize: 22,
    color: '#ffffff', highlightColor: '#e94560', anchor: [0.5, 0.5]
  }))

  layer.addElement(new HighlightText({
    x: 400, y: 380, text: '新增功能全面上线', fontSize: 22,
    color: '#ffffff', highlightColor: '#00d9ff', anchor: [0.5, 0.5]
  }))

  // Icon 图标 (使用 emoji)
  layer.addElement(new TextElement({
    x: 400, y: 470, text: '图标展示', fontSize: 18,
    color: '#94a3b8', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 150, y: 540, size: 60, content: '🚀', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 250, y: 540, size: 60, content: '💡', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 350, y: 540, size: 60, content: '🔥', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 450, y: 540, size: 60, content: '⭐', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 550, y: 540, size: 60, content: '💎', anchor: [0.5, 0.5]
  }))

  layer.addElement(new Icon({
    x: 650, y: 540, size: 60, content: '🎯', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('11-table-text', '../output')
  poster.destroy()
  console.log('Table and text test saved to output/11-table-text.png')
}

main().catch(console.error)