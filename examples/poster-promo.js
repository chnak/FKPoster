/**
 * 宣传图片示例 - 新品发布
 */
const { PosterBuilder, TextElement, Card, Badge, Button, Feature, Rating, Divider, Frame, Icon, Chart, ProgressCircle } = require('../src/index')

async function main() {
  console.log('=== 创建宣传图片 ===\n')

  const poster = new PosterBuilder({
    width: 1200,
    height: 800,
    backgroundColor: '#030712'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 左侧：产品展示区
  // 主框架
  layer.addElement(new Frame({
    x: 40, y: 40, width: 500, height: 720,
    style: 'corner', color: '#3b82f6', borderWidth: 3, radius: 20
  }))

  // 产品图标区
  layer.addElement(new Icon({
    x: 190, y: 120, size: 160, icon: '🎧', backgroundColor: '#1e293b', radius: 80
  }))
  layer.addElement(new TextElement({
    x: 190, y: 330, text: 'FOLIKO Pods Pro', fontSize: 32, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 190, y: 375, text: '无线降噪耳机', fontSize: 18, color: '#64748b'
  }))

  // 评分
  layer.addElement(new Rating({
    x: 140, y: 420, value: 4.8, size: 20, filledColor: '#fbbf24', emptyColor: '#334155'
  }))
  layer.addElement(new TextElement({
    x: 220, y: 435, text: '4.8 (9,847 评价)', fontSize: 14, color: '#64748b'
  }))

  // 特性亮点
  layer.addElement(new Feature({
    x: 80, y: 480, width: 200, height: 90,
    icon: '🔇', title: '主动降噪', description: '最深-45dB降噪', iconColor: '#3b82f6',
    backgroundColor: '#1e293b', borderColor: '#334155', radius: 8
  }))

  layer.addElement(new Feature({
    x: 300, y: 480, width: 200, height: 90,
    icon: '🔋', title: '超长续航', description: '40小时续航', iconColor: '#22c55e',
    backgroundColor: '#1e293b', borderColor: '#334155', radius: 8
  }))

  layer.addElement(new Feature({
    x: 80, y: 585, width: 200, height: 90,
    icon: '💧', title: '防水等级', description: 'IPX5防水', iconColor: '#3b82f6',
    backgroundColor: '#1e293b', borderColor: '#334155', radius: 8
  }))

  layer.addElement(new Feature({
    x: 300, y: 585, width: 200, height: 90,
    icon: '📡', title: '蓝牙5.3', description: '稳定连接', iconColor: '#8b5cf6',
    backgroundColor: '#1e293b', borderColor: '#334155', radius: 8
  }))

  // 价格
  layer.addElement(new TextElement({
    x: 140, y: 700, text: '¥1,299', fontSize: 40, color: '#ef4444', fontWeight: 'bold'
  }))
  layer.addElement(new Badge({
    x: 340, y: 710, text: '新品', fontSize: 14,
    backgroundColor: '#ef4444', color: '#ffffff', radius: 12
  }))

  // 右侧：数据展示区
  layer.addElement(new TextElement({
    x: 600, y: 60, text: '产品数据', fontSize: 28, color: '#ffffff', fontWeight: 'bold'
  }))

  // 销量统计
  layer.addElement(new Card({
    x: 600, y: 110, width: 260, height: 140,
    backgroundColor: '#1e293b', radius: 16, padding: 20
  }))
  layer.addElement(new TextElement({
    x: 620, y: 130, text: '累计销量', fontSize: 14, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 620, y: 165, text: '128,947', fontSize: 36, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 620, y: 210, text: '台', fontSize: 14, color: '#64748b'
  }))
  layer.addElement(new Badge({
    x: 700, y: 200, text: '+28%', fontSize: 12,
    backgroundColor: '#22c55e', color: '#ffffff', radius: 10
  }))

  layer.addElement(new Card({
    x: 880, y: 110, width: 260, height: 140,
    backgroundColor: '#1e293b', radius: 16, padding: 20
  }))
  layer.addElement(new TextElement({
    x: 900, y: 130, text: '月销售额', fontSize: 14, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 900, y: 165, text: '¥1.2亿', fontSize: 36, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 900, y: 210, text: '本月', fontSize: 14, color: '#64748b'
  }))
  layer.addElement(new Badge({
    x: 980, y: 200, text: '+15%', fontSize: 12,
    backgroundColor: '#22c55e', color: '#ffffff', radius: 10
  }))

  // 图表
  layer.addElement(new Frame({
    x: 600, y: 270, width: 540, height: 220,
    style: 'modern', color: '#334155', borderWidth: 2, radius: 16
  }))
  layer.addElement(new TextElement({
    x: 620, y: 295, text: '月度销量趋势', fontSize: 16, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new Chart({
    x: 620, y: 320, width: 500, height: 160,
    chartType: 'bar',
    data: [
      { label: '1月', value: 8200 },
      { label: '2月', value: 9500 },
      { label: '3月', value: 7800 },
      { label: '4月', value: 10500 },
      { label: '5月', value: 12000 },
      { label: '6月', value: 11500 },
    ],
    barColor: '#3b82f6'
  }))

  // 进度指示
  layer.addElement(new TextElement({
    x: 600, y: 520, text: '用户满意度', fontSize: 28, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new ProgressCircle({
    x: 700, y: 580, radius: 60, value: 96, strokeWidth: 10,
    fillColor: '#3b82f6', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 650, y: 680, text: '降噪效果', fontSize: 14, color: '#94a3b8'
  }))

  layer.addElement(new ProgressCircle({
    x: 900, y: 580, radius: 60, value: 94, strokeWidth: 10,
    fillColor: '#22c55e', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 850, y: 680, text: '音质评价', fontSize: 14, color: '#94a3b8'
  }))

  // 按钮
  layer.addElement(new Button({
    x: 600, y: 730, width: 260, height: 50,
    text: '立即购买', fontSize: 16,
    backgroundColor: '#3b82f6', color: '#ffffff', radius: 8
  }))

  layer.addElement(new Button({
    x: 880, y: 730, width: 260, height: 50,
    text: '了解更多', fontSize: 16,
    backgroundColor: 'transparent', color: '#ffffff', radius: 8,
    borderColor: '#3b82f6', borderWidth: 2
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('poster-promo', './output')
  console.log(`\n✅ 宣传图片已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
