/**
 * 规格对比表 - 使用 Grid 布局
 */
const {
  PosterBuilder,
  TextElement,
  Grid,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 500,
    height: 420,
    backgroundColor: '#ffffff'
  })

  const padding = 24
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  const title = new TextElement({
    x: padding, y: padding, width: 452,
    text: '产品规格对比',
    fontSize: 24, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(title)

  // 表头
  const headers = ['规格', '基础版', '专业版', '企业版']
  const rowData = [
    { spec: '存储空间', basic: '10GB', pro: '100GB', enterprise: '无限' },
    { spec: '月流量', basic: '100GB', pro: '1TB', enterprise: '无限' },
    { spec: '并发数', basic: '10', pro: '100', enterprise: '无限' },
    { spec: '支持', basic: '邮件', pro: '7x24', enterprise: '专属客服' },
    { spec: '价格', basic: '免费', pro: '¥99/月', enterprise: '联系销售' },
  ]

  // 使用 Grid 布局 (5列 x 7行)
  const grid = new Grid({
    x: padding,
    y: 60,
    width: 452,
    height: 330,
    columns: 4,
    rows: 6,
    gapX: 2,
    gapY: 2,
    backgroundColor: '#f1f5f9',
    radius: 8
  })

  const layout = grid.getLayout({ width: 500, height: 420 })
  layer.addElement(grid)

  // 表头行
  for (let i = 0; i < headers.length; i++) {
    const pos = layout.cellPositions[i]
    const isHighlight = i === 3

    const headerBg = new TextElement({
      x: pos.x, y: pos.y, width: pos.width, height: pos.height,
      text: ' ',
      backgroundColor: isHighlight ? '#3b82f6' : '#e2e8f0',
      radius: 0
    })
    layer.addElement(headerBg)

    const headerText = new TextElement({
      x: pos.x, y: pos.y + 15, width: pos.width,
      text: headers[i],
      fontSize: 12, color: isHighlight ? '#ffffff' : '#475569', fontWeight: 'bold', textAlign: 'center'
    })
    layer.addElement(headerText)
  }

  // 数据行
  for (let row = 0; row < rowData.length; row++) {
    const data = rowData[row]
    const values = [data.spec, data.basic, data.pro, data.enterprise]

    for (let col = 0; col < 4; col++) {
      const idx = (row + 1) * 4 + col  // +1 跳过表头
      const pos = layout.cellPositions[idx]
      const isHighlight = col === 3
      const isPrice = row === 4

      const cellBg = new TextElement({
        x: pos.x, y: pos.y, width: pos.width, height: pos.height,
        text: ' ',
        backgroundColor: isHighlight ? '#eff6ff' : '#ffffff',
        radius: 0
      })
      layer.addElement(cellBg)

      let textColor = '#334155'
      if (isHighlight) textColor = '#3b82f6'
      if (isPrice && col > 0) textColor = '#e53e3e'

      const cellText = new TextElement({
        x: pos.x, y: pos.y + 12, width: pos.width,
        text: values[col],
        fontSize: 11, color: textColor, fontWeight: isHighlight ? 'bold' : 'normal', textAlign: 'center'
      })
      layer.addElement(cellText)
    }
  }

  await poster.exportPNG('specs-compare', './output')
  console.log('Specs compare saved to output/specs-compare.png')
  poster.destroy()
}

main().catch(console.error)
