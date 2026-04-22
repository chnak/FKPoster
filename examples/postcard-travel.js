/**
 * 旅行 postcard 示例
 */
const { PosterBuilder, TextElement, Card, Divider, Icon, Badge, Feature, Progress, ProgressCircle, Quote, Watermark } = require('../src/index')

async function main() {
  console.log('=== 创建旅行明信片 ===\n')

  const poster = new PosterBuilder({
    width: 600,
    height: 900,
    backgroundColor: '#e8f4f8'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 邮戳
  layer.addElement(new Card({
    x: 420, y: 30, width: 130, height: 80,
    backgroundColor: '#ffffff', radius: 8, padding: 10
  }))
  layer.addElement(new TextElement({
    x: 440, y: 50, text: 'FOLIKO TRAVEL', fontSize: 10, color: '#333333', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 440, y: 70, text: '2024.06.15', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 440, y: 90, text: '✈️ 已盖戳', fontSize: 10, color: '#22c55e'
  }))

  // 目的地标题
  layer.addElement(new TextElement({
    x: 40, y: 60, text: '🇯🇵 日本 · 京都', fontSize: 32, color: '#1a1a1a', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 100, text: '古韵与现代的完美融合', fontSize: 16, color: '#666666'
  }))

  // 风景描述卡片
  layer.addElement(new Card({
    x: 40, y: 150, width: 520, height: 200,
    backgroundColor: '#ffffff', radius: 16, padding: 20
  }))

  layer.addElement(new Icon({
    x: 80, y: 180, size: 80, icon: '🏯', backgroundColor: '#fef3c7', radius: 40
  }))

  layer.addElement(new TextElement({
    x: 180, y: 190, text: '清水寺', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 225, text: '位于京都东部音羽山山腰', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 250, text: '始建于778年，是京都最古老的寺院', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 275, text: '1994年列入世界文化遗产名录', fontSize: 12, color: '#22c55e'
  }))

  layer.addElement(new Badge({
    x: 450, y: 180, text: '必去', fontSize: 12,
    backgroundColor: '#ef4444', color: '#ffffff', radius: 10
  }))

  // 旅行攻略
  layer.addElement(new TextElement({
    x: 40, y: 380, text: '📝 旅行攻略', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold'
  }))

  // 必去景点
  layer.addElement(new TextElement({
    x: 40, y: 420, text: '必去景点', fontSize: 14, color: '#666666'
  }))

  layer.addElement(new Feature({
    x: 40, y: 450, width: 160, height: 80,
    icon: '⛩️', title: '伏见稻荷大社', description: '千本鸟居', iconColor: '#ef4444',
    backgroundColor: '#ffffff', radius: 8
  }))

  layer.addElement(new Feature({
    x: 215, y: 450, width: 160, height: 80,
    icon: '🎎', title: '二年坂三年坂', description: '传统街区', iconColor: '#f59e0b',
    backgroundColor: '#ffffff', radius: 8
  }))

  layer.addElement(new Feature({
    x: 390, y: 450, width: 170, height: 80,
    icon: '🍵', title: '茶道体验', description: '宇治抹茶', iconColor: '#22c55e',
    backgroundColor: '#ffffff', radius: 8
  }))

  // 美食推荐
  layer.addElement(new TextElement({
    x: 40, y: 560, text: '🍜 美食推荐', fontSize: 14, color: '#666666'
  }))

  layer.addElement(new Feature({
    x: 40, y: 590, width: 160, height: 80,
    icon: '🍣', title: '怀石料理', description: '京料理精华', iconColor: '#3b82f6',
    backgroundColor: '#ffffff', radius: 8
  }))

  layer.addElement(new Feature({
    x: 215, y: 590, width: 160, height: 80,
    icon: '🥮', title: '和果子', description: '精致甜点', iconColor: '#ec4899',
    backgroundColor: '#ffffff', radius: 8
  }))

  layer.addElement(new Feature({
    x: 390, y: 590, width: 170, height: 80,
    icon: '🍜', title: '拉面小路', description: '多种口味', iconColor: '#8b5cf6',
    backgroundColor: '#ffffff', radius: 8
  }))

  // 旅行进度
  layer.addElement(new TextElement({
    x: 40, y: 710, text: '✈️ 行程规划', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold'
  }))

  layer.addElement(new Card({
    x: 40, y: 750, width: 520, height: 100,
    backgroundColor: '#ffffff', radius: 12, padding: 15
  }))

  layer.addElement(new ProgressCircle({
    x: 100, y: 800, radius: 35, value: 60, strokeWidth: 8,
    fillColor: '#3b82f6', trackColor: '#e5e5e5', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 60, y: 850, text: '行程完成', fontSize: 10, color: '#666666'
  }))

  layer.addElement(new ProgressCircle({
    x: 260, y: 800, radius: 35, value: 80, strokeWidth: 8,
    fillColor: '#22c55e', trackColor: '#e5e5e5', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 220, y: 850, text: '美食体验', fontSize: 10, color: '#666666'
  }))

  layer.addElement(new ProgressCircle({
    x: 420, y: 800, radius: 35, value: 40, strokeWidth: 8,
    fillColor: '#f59e0b', trackColor: '#e5e5e5', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 380, y: 850, text: '景点打卡', fontSize: 10, color: '#666666'
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('postcard-travel', './output')
  console.log(`\n✅ 旅行明信片已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
