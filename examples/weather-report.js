/**
 * 天气报告示例
 */
const { PosterBuilder, TextElement, Card, Divider, Icon, ProgressCircle, Feature, FeatureGrid, Badge, Notification } = require('../src/index')

async function main() {
  console.log('=== 创建天气报告 ===\n')

  const poster = new PosterBuilder({
    width: 600,
    height: 900,
    backgroundColor: '#1e3a5f'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部标题
  layer.addElement(new TextElement({
    x: 40, y: 40, text: 'FOLIKO 天气预报', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 70, text: '上海市', fontSize: 36, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 105, text: '2024年06月15日 星期六', fontSize: 14, color: '#64748b'
  }))

  // 今日天气
  layer.addElement(new Card({
    x: 40, y: 150, width: 520, height: 200,
    backgroundColor: '#2563eb', radius: 20, padding: 25
  }))

  layer.addElement(new Icon({
    x: 60, y: 180, size: 100, icon: '☀️', backgroundColor: 'transparent', radius: 50
  }))

  layer.addElement(new TextElement({
    x: 200, y: 190, text: '32°C', fontSize: 56, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 200, y: 260, text: '晴', fontSize: 24, color: '#bfdbfe'
  }))
  layer.addElement(new TextElement({
    x: 280, y: 260, text: '紫外线强', fontSize: 14, color: '#93c5fd'
  }))

  layer.addElement(new Badge({
    x: 200, y: 295, text: '穿衣指数: 短袖', fontSize: 12,
    backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff', radius: 10
  }))

  // 详细信息
  layer.addElement(new TextElement({
    x: 450, y: 200, text: '空气质量', fontSize: 12, color: '#93c5fd'
  }))
  layer.addElement(new TextElement({
    x: 450, y: 225, text: '良 56', fontSize: 18, color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 450, y: 265, text: '风速', fontSize: 12, color: '#93c5fd'
  }))
  layer.addElement(new TextElement({
    x: 450, y: 290, text: '2级', fontSize: 18, color: '#ffffff'
  }))

  // 小时预报
  layer.addElement(new TextElement({
    x: 40, y: 380, text: '逐小时预报', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new FeatureGrid({
    x: 40, y: 420,
    columns: 5, itemWidth: 95, itemHeight: 90, gap: 10,
    items: [
      { icon: '☀️', title: '现在', description: '32°', iconColor: '#fbbf24' },
      { icon: '⛅', title: '14:00', description: '31°', iconColor: '#fbbf24' },
      { icon: '⛅', title: '15:00', description: '30°', iconColor: '#f59e0b' },
      { icon: '🌥️', title: '16:00', description: '28°', iconColor: '#94a3b8' },
      { icon: '🌙', title: '17:00', description: '26°', iconColor: '#94a3b8' },
    ],
    backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent', radius: 12
  }))

  // 一周预报
  layer.addElement(new TextElement({
    x: 40, y: 560, text: '一周预报', fontSize: 18, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new Card({
    x: 40, y: 600, width: 520, height: 200,
    backgroundColor: 'rgba(255,255,255,0.05)', radius: 12, padding: 15
  }))

  // 周一
  layer.addElement(new TextElement({
    x: 60, y: 630, text: '周一', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new Icon({
    x: 60, y: 650, size: 40, icon: '🌧️', backgroundColor: 'transparent', radius: 20
  }))
  layer.addElement(new TextElement({
    x: 60, y: 710, text: '26°/22°', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new Feature({
    x: 120, y: 670, width: 80, height: 40,
    icon: '', title: '', description: '90%', iconColor: '#3b82f6',
    backgroundColor: 'transparent', radius: 0
  }))

  // 周二
  layer.addElement(new TextElement({
    x: 200, y: 630, text: '周二', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new Icon({
    x: 200, y: 650, size: 40, icon: '⛅', backgroundColor: 'transparent', radius: 20
  }))
  layer.addElement(new TextElement({
    x: 200, y: 710, text: '28°/23°', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new Feature({
    x: 260, y: 670, width: 80, height: 40,
    icon: '', title: '', description: '60%', iconColor: '#3b82f6',
    backgroundColor: 'transparent', radius: 0
  }))

  // 周三
  layer.addElement(new TextElement({
    x: 340, y: 630, text: '周三', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new Icon({
    x: 340, y: 650, size: 40, icon: '☀️', backgroundColor: 'transparent', radius: 20
  }))
  layer.addElement(new TextElement({
    x: 340, y: 710, text: '30°/24°', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new Feature({
    x: 400, y: 670, width: 80, height: 40,
    icon: '', title: '', description: '20%', iconColor: '#22c55e',
    backgroundColor: 'transparent', radius: 0
  }))

  // 周四
  layer.addElement(new TextElement({
    x: 60, y: 745, text: '周四', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new Icon({
    x: 60, y: 765, size: 40, icon: '☀️', backgroundColor: 'transparent', radius: 20
  }))
  layer.addElement(new TextElement({
    x: 60, y: 825, text: '31°/25°', fontSize: 14, color: '#ffffff'
  }))

  // 周五
  layer.addElement(new TextElement({
    x: 200, y: 745, text: '周五', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new Icon({
    x: 200, y: 765, size: 40, icon: '⛅', backgroundColor: 'transparent', radius: 20
  }))
  layer.addElement(new TextElement({
    x: 200, y: 825, text: '29°/24°', fontSize: 14, color: '#ffffff'
  }))

  // 周六
  layer.addElement(new TextElement({
    x: 340, y: 745, text: '周六', fontSize: 14, color: '#94a3b8'
  }))
  layer.addElement(new Icon({
    x: 340, y: 765, size: 40, icon: '🌧️', backgroundColor: 'transparent', radius: 20
  }))
  layer.addElement(new TextElement({
    x: 340, y: 825, text: '25°/21°', fontSize: 14, color: '#ffffff'
  }))

  // 出行建议
  layer.addElement(new Notification({
    x: 40, y: 840, width: 520,
    type: 'info', title: '出行建议', message: '今日紫外线较强，建议涂抹防晒霜'
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('weather-report', './output')
  console.log(`\n✅ 天气报告已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
