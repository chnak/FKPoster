/**
 * 更多一行两列布局示例 3 - 特性介绍卡片
 */
const { PosterBuilder, TextElement, RectElement, CircleElement, Icon, StatCard, Feature, FeatureGrid, Quote } = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 400,
    backgroundColor: '#f8fafc'
  })

  const gap = 20
  const padding = 30
  const columnWidth = (poster.width - padding * 2 - gap) / 2

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 左列 - 统计卡片
  const leftX = padding
  const card1 = new RectElement({
    x: leftX,
    y: padding,
    width: columnWidth,
    height: poster.height - padding * 2,
    fillColor: '#1e293b',
    strokeColor: '#334155',
    strokeWidth: 1,
    radius: 12,
    zIndex: -1
  })
  layer.addElement(card1)

  const statTitle = new TextElement({
    x: leftX + 20,
    y: padding + 25,
    width: columnWidth - 40,
    text: '数据概览',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold'
  })
  layer.addElement(statTitle)

  const statCard1 = new StatCard({
    x: leftX + 20,
    y: padding + 55,
    width: columnWidth - 40,
    height: 70,
    value: '12,847',
    label: '总用户数',
    change: '+23%',
    positive: true,
    zIndex: 2
  })
  layer.addElement(statCard1)

  const statCard2 = new StatCard({
    x: leftX + 20,
    y: padding + 135,
    width: columnWidth - 40,
    height: 70,
    value: '98.5%',
    label: '服务可用性',
    change: '+0.2%',
    positive: true,
    zIndex: 2
  })
  layer.addElement(statCard2)

  const statCard3 = new StatCard({
    x: leftX + 20,
    y: padding + 215,
    width: columnWidth - 40,
    height: 70,
    value: '45ms',
    label: '平均响应时间',
    change: '-15%',
    positive: true,
    zIndex: 2
  })
  layer.addElement(statCard3)

  // 右列 - 引用卡片
  const rightX = padding + columnWidth + gap
  const card2 = new RectElement({
    x: rightX,
    y: padding,
    width: columnWidth,
    height: poster.height - padding * 2,
    fillColor: '#ffffff',
    strokeColor: '#e2e8f0',
    strokeWidth: 1,
    radius: 12,
    zIndex: -1
  })
  layer.addElement(card2)

  const quoteTitle = new TextElement({
    x: rightX + 20,
    y: padding + 25,
    width: columnWidth - 40,
    text: '客户评价',
    fontSize: 18,
    color: '#1e293b',
    fontWeight: 'bold'
  })
  layer.addElement(quoteTitle)

  const quote1 = new Quote({
    x: rightX + 20,
    y: padding + 100,
    width: columnWidth - 40,
    text: '这个工具极大地提升了我们的工作效率，强烈推荐！',
    author: '—— 李明，产品经理',
    padding: 12,
    backgroundColor: '#f1f5f9',
    textColor: '#475569',
    authorColor: '#64748b',
    zIndex: 2
  })
  layer.addElement(quote1)

  const quote2 = new Quote({
    x: rightX + 20,
    y: padding + 230,
    width: columnWidth - 40,
    text: '界面简洁美观，功能强大实用。',
    author: '—— 王芳，设计师',
    padding: 12,
    backgroundColor: '#f1f5f9',
    textColor: '#475569',
    authorColor: '#64748b',
    zIndex: 2
  })
  layer.addElement(quote2)

  await poster.exportPNG('columns-example-3', './output')
  console.log('Example 3 saved to output/columns-example-3.png')
  poster.destroy()
}

main().catch(console.error)
