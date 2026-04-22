/**
 * 餐厅菜单示例
 */
const { PosterBuilder, TextElement, Card, Badge, Divider, Icon, Feature, FeatureGrid, Quote, CTA } = require('../src/index')

async function main() {
  console.log('=== 创建餐厅菜单 ===\n')

  const poster = new PosterBuilder({
    width: 600,
    height: 900,
    backgroundColor: '#fef9f3'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 餐厅名称
  layer.addElement(new TextElement({
    x: 40, y: 40, text: 'FOLIKO KITCHEN', fontSize: 36, color: '#1a1a1a', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 85, text: '创意融合料理', fontSize: 16, color: '#666666'
  }))

  layer.addElement(new Divider({
    x: 40, y: 120, width: 520, thickness: 2, color: '#d4a574'
  }))

  // 招牌菜
  layer.addElement(new TextElement({
    x: 40, y: 150, text: '🍴 招牌推荐', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold'
  }))

  layer.addElement(new Feature({
    x: 40, y: 190, width: 520, height: 100,
    icon: '🥩', title: 'M9和牛西冷', description: '精选澳大利亚M9级和牛，配以黑松露酱和时蔬', iconColor: '#c4a484',
    backgroundColor: '#fff5eb', borderColor: '#d4a574', radius: 12
  }))

  layer.addElement(new Feature({
    x: 40, y: 310, width: 520, height: 100,
    icon: '🦐', title: '蒜香黄油龙虾', description: '新鲜波士顿龙虾，蒜香黄油炙烤，附特色酱汁', iconColor: '#ef4444',
    backgroundColor: '#fff5eb', borderColor: '#d4a574', radius: 12
  }))

  // 今日特惠
  layer.addElement(new TextElement({
    x: 40, y: 440, text: '🎉 今日特惠', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold'
  }))

  layer.addElement(new Card({
    x: 40, y: 480, width: 520, height: 80,
    backgroundColor: '#fef3c7', radius: 12, padding: 15
  }))
  layer.addElement(new Badge({
    x: 60, y: 495, text: '5折', fontSize: 14,
    backgroundColor: '#ef4444', color: '#ffffff', radius: 8
  }))
  layer.addElement(new TextElement({
    x: 120, y: 510, text: '法式鹅肝配面包', fontSize: 18, color: '#1a1a1a', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 120, y: 540, text: '原价 ¥288 → 现价 ¥144', fontSize: 12, color: '#666666'
  }))

  // 人气榜单
  layer.addElement(new TextElement({
    x: 40, y: 600, text: '🔥 人气榜单', fontSize: 20, color: '#1a1a1a', fontWeight: 'bold'
  }))

  layer.addElement(new FeatureGrid({
    x: 40, y: 640,
    columns: 2, itemWidth: 250, itemHeight: 70, gap: 20,
    items: [
      { icon: '🍝', title: '黑松露意面', description: '¥68', iconColor: '#3b82f6' },
      { icon: '🍕', title: '玛格丽特披萨', description: '¥58', iconColor: '#22c55e' },
      { icon: '🥗', title: '凯撒沙拉', description: '¥48', iconColor: '#f59e0b' },
      { icon: '🍰', title: '提拉米苏', description: '¥42', iconColor: '#8b5cf6' },
    ],
    backgroundColor: '#ffffff', borderColor: '#e5e5e5', radius: 8
  }))

  // 底部信息
  layer.addElement(new Divider({
    x: 40, y: 820, width: 520, thickness: 1, color: '#d4a574'
  }))

  layer.addElement(new TextElement({
    x: 40, y: 840, text: '📍 上海市静安区南京西路1266号', fontSize: 12, color: '#999999'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 860, text: '⏰ 营业时间：11:00 - 22:00', fontSize: 12, color: '#999999'
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('menu-restaurant', './output')
  console.log(`\n✅ 餐厅菜单已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
