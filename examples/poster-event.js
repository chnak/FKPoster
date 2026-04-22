/**
 * 活动海报示例
 */
const { PosterBuilder, TextElement, FeatureGrid, ProgressCircle, Rating, Badge, Divider, CTA, Icon, TagCloud, Frame, Notification, Watermark } = require('../src/index')

async function main() {
  console.log('=== 创建活动海报 ===\n')

  const poster = new PosterBuilder({
    width: 1080,
    height: 1440,
    backgroundColor: '#0f0f23'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部标签
  layer.addElement(new Badge({
    x: 40, y: 40, text: '🔥 限时活动', fontSize: 16,
    backgroundColor: '#ef4444', color: '#ffffff', radius: 20
  }))

  // 主标题
  layer.addElement(new TextElement({
    x: 40, y: 100, text: 'FOLIKO 开发者大会', fontSize: 52, color: '#ffffff', fontWeight: 'bold'
  }))

  // 副标题
  layer.addElement(new TextElement({
    x: 40, y: 165, text: '2024 年度技术盛会 · 大咖云集', fontSize: 24, color: '#94a3b8'
  }))

  // 评分
  layer.addElement(new Rating({
    x: 40, y: 210, value: 4.9, size: 24, filledColor: '#fbbf24', emptyColor: '#334155'
  }))
  layer.addElement(new TextElement({
    x: 160, y: 225, text: '4.9分 (1,283人评价)', fontSize: 14, color: '#64748b'
  }))

  // 大会信息卡片
  layer.addElement(new Frame({
    x: 40, y: 280, width: 1000, height: 160,
    style: 'modern', color: '#3b82f6', borderWidth: 2, radius: 16
  }))

  layer.addElement(new Icon({
    x: 80, y: 320, size: 60, icon: '📅', backgroundColor: '#1e293b', radius: 30
  }))
  layer.addElement(new TextElement({
    x: 160, y: 330, text: '2024年12月15日-16日', fontSize: 20, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 160, y: 360, text: '会议日期', fontSize: 14, color: '#64748b'
  }))

  layer.addElement(new Icon({
    x: 450, y: 320, size: 60, icon: '📍', backgroundColor: '#1e293b', radius: 30
  }))
  layer.addElement(new TextElement({
    x: 530, y: 330, text: '深圳国际会展中心', fontSize: 20, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 530, y: 360, text: '会议地点', fontSize: 14, color: '#64748b'
  }))

  layer.addElement(new Icon({
    x: 820, y: 320, size: 60, icon: '👥', backgroundColor: '#1e293b', radius: 30
  }))
  layer.addElement(new TextElement({
    x: 900, y: 330, text: '3000+ 人', fontSize: 20, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 900, y: 360, text: '参会人数', fontSize: 14, color: '#64748b'
  }))

  // 核心亮点
  layer.addElement(new TextElement({
    x: 40, y: 480, text: '核心亮点', fontSize: 28, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new FeatureGrid({
    x: 40, y: 530,
    columns: 3, itemWidth: 300, itemHeight: 100, gap: 20,
    items: [
      { icon: '🎤', title: '大咖演讲', description: '50+ 技术专家分享前沿技术', iconColor: '#3b82f6' },
      { icon: '🏆', title: '黑客马拉松', description: '24小时coding挑战赛', iconColor: '#f59e0b' },
      { icon: '🎁', title: '现场抽奖', description: 'MacBook Pro 等你来拿', iconColor: '#ef4444' },
      { icon: '🍜', title: '美食自助', description: '各地美食无限量供应', iconColor: '#22c55e' },
      { icon: '🎮', title: '互动展区', description: '体验最新科技产品', iconColor: '#8b5cf6' },
      { icon: '📸', title: '社交活动', description: '认识志同道合的开发者', iconColor: '#ec4899' },
    ],
    backgroundColor: '#1e293b', borderColor: '#334155', radius: 12
  }))

  // 议程进度
  layer.addElement(new TextElement({
    x: 40, y: 800, text: '报名进度', fontSize: 28, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new ProgressCircle({
    x: 120, y: 880, radius: 70, value: 78, strokeWidth: 12,
    fillColor: '#3b82f6', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 70, y: 1000, text: '已报名', fontSize: 14, color: '#94a3b8'
  }))

  layer.addElement(new ProgressCircle({
    x: 320, y: 880, radius: 70, value: 45, strokeWidth: 12,
    fillColor: '#22c55e', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 270, y: 1000, text: '企业参会', fontSize: 14, color: '#94a3b8'
  }))

  layer.addElement(new ProgressCircle({
    x: 520, y: 880, radius: 70, value: 92, strokeWidth: 12,
    fillColor: '#f59e0b', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 470, y: 1000, text: '个人参会', fontSize: 14, color: '#94a3b8'
  }))

  layer.addElement(new ProgressCircle({
    x: 720, y: 880, radius: 70, value: 60, strokeWidth: 12,
    fillColor: '#ef4444', trackColor: '#334155', showLabel: true, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 670, y: 1000, text: 'VIP席位', fontSize: 14, color: '#94a3b8'
  }))

  // 标签
  layer.addElement(new TextElement({
    x: 40, y: 1080, text: '相关标签', fontSize: 28, color: '#ffffff', fontWeight: 'bold'
  }))

  layer.addElement(new TagCloud({
    x: 40, y: 1130, maxWidth: 1000,
    tags: [
      { text: '前端开发', bgColor: '#3b82f6', color: '#ffffff' },
      { text: 'Node.js', bgColor: '#22c55e', color: '#ffffff' },
      { text: '云原生', bgColor: '#f59e0b', color: '#000000' },
      { text: 'AI/ML', bgColor: '#ef4444', color: '#ffffff' },
      { text: 'DevOps', bgColor: '#8b5cf6', color: '#ffffff' },
      { text: '区块链', bgColor: '#ec4899', color: '#ffffff' },
      { text: '架构设计', bgColor: '#06b6d4', color: '#ffffff' },
      { text: '性能优化', bgColor: '#84cc16', color: '#000000' },
    ],
    fontSize: 14
  }))

  // 通知
  layer.addElement(new Notification({
    x: 40, y: 1250, width: 480,
    type: 'warning', title: '早鸟票即将售罄', message: '原价1999元，早鸟价499元'
  }))

  layer.addElement(new Notification({
    x: 540, y: 1250, width: 480,
    type: 'success', title: '团购优惠', message: '3人以上团购可享8折优惠'
  }))

  // 底部CTA
  layer.addElement(new Divider({
    x: 40, y: 1330, width: 1000, thickness: 1, color: '#334155'
  }))

  layer.addElement(new CTA({
    x: 40, y: 1360, width: 1000, height: 80,
    text: '立即报名', fontSize: 28,
    backgroundColor: '#3b82f6', color: '#ffffff', radius: 12
  }))

  // 水印
  layer.addElement(new Watermark({
    x: 540, y: 720, text: 'FOLIKO', fontSize: 200, color: 'rgba(255,255,255,0.02)', rotation: -30
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('poster-event', './output')
  console.log(`\n✅ 活动海报已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
