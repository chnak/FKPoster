/**
 * 文章/图文排版 - 使用 Columns 布局（简化版）
 */
const {
  PosterBuilder,
  TextElement,
  Columns,
  ImageFrame,
  Divider,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 480,
    height: 340,
    backgroundColor: '#ffffff'
  })

  const padding = 20
  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 分类标签
  const category = new TextElement({
    x: padding, y: padding, width: 60,
    text: '科技',
    fontSize: 11, color: '#3b82f6'
  })
  layer.addElement(category)

  // 标题
  const title = new TextElement({
    x: padding, y: padding + 20, width: 440,
    text: '人工智能改变生活',
    fontSize: 22, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(title)

  // 元信息
  const meta = new TextElement({
    x: padding, y: padding + 52, width: 440,
    text: '2024年12月25日',
    fontSize: 11, color: '#94a3b8'
  })
  layer.addElement(meta)

  // 分隔线
  const divider = new Divider({ x: padding, y: padding + 75, width: 440, color: '#e2e8f0', thickness: 1 })
  layer.addElement(divider)

  // 使用 Columns 布局：左侧文字 + 右侧图片
  const columns = new Columns({
    x: padding,
    y: padding + 90,
    width: 440,
    height: 200,
    columns: 2,
    gap: 16,
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    radius: 8
  })

  const layout = columns.getLayout({ width: 480, height: 340 })
  layer.addElement(columns)

  const leftCol = layout.columnPositions[0]
  const rightCol = layout.columnPositions[1]

  // 左侧：简短文字（使用 maxWidth 触发自动换行）
  const leftText = new TextElement({
    x: leftCol.x + 12,
    y: leftCol.y + 12,
    maxWidth: leftCol.width - 24,
    text: 'AI 技术正在改变世界',
    fontSize: 14, color: '#1e293b', fontWeight: 'bold'
  })
  layer.addElement(leftText)

  const leftDesc = new TextElement({
    x: leftCol.x + 12,
    y: leftCol.y + 40,
    maxWidth: leftCol.width - 24,
    text: '从智能家居到自动驾驶，从医疗诊断到金融风控，AI正在悄然改变生活。',
    fontSize: 11, color: '#64748b', lineHeight: 1.5
  })
  layer.addElement(leftDesc)

  // 右侧：图片
  const img = new ImageFrame({
    x: rightCol.x + 8,
    y: rightCol.y + 8,
    width: rightCol.width - 16,
    height: rightCol.height - 16,
    src: 'https://picsum.photos/300/200',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    radius: 6,
    fit: 'cover'
  })
  layer.addElement(img)

  await poster.exportPNG('article-layout', './output')
  console.log('Article layout saved to output/article-layout.png')
  poster.destroy()
}

main().catch(console.error)
