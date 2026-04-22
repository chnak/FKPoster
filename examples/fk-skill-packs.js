// FK Skill Packs 宣传海报 - 设计师方案
const { PosterBuilder, TextElement, Badge, Divider, RectElement } = require('../src/index')

async function main() {
  console.log('=== FK Skill Packs 海报测试 ===\n')

  // 16:9 横向布局
  const poster = new PosterBuilder({
    width: 1920,
    height: 1080,
    backgroundColor: '#0f0c29'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 渐变背景装饰 - 右上角
  layer.addElement(new RectElement({
    x: 1400, y: -200,
    width: 700, height: 700,
    fillColor: '#667eea',
    opacity: 0.08,
    rotation: 45
  }))

  // 渐变背景装饰 - 左下角
  layer.addElement(new RectElement({
    x: -100, y: 600,
    width: 500, height: 500,
    fillColor: '#4facfe',
    opacity: 0.08,
    rotation: 30
  }))

  // 渐变背景装饰 - 右下角
  layer.addElement(new RectElement({
    x: 1500, y: 700,
    width: 400, height: 400,
    fillColor: '#764ba2',
    opacity: 0.06,
    rotation: 20
  }))

  // ===== 主标题区域 =====
  layer.addElement(new TextElement({
    x: '50%', y: 80,
    text: 'FK SKILL PACKS',
    fontSize: 64,
    fontWeight: 'bold',
    color: '#667eea',
    textAlign: 'center',
    anchor: [0.5, 0]
  }))

  layer.addElement(new TextElement({
    x: '50%', y: 150,
    text: '为 AI Agent 打造的专业技能包',
    fontSize: 28,
    color: '#a0aec0',
    textAlign: 'center',
    anchor: [0.5, 0]
  }))

  // 平台标签
  const platforms = ['FOLIKO', 'OpenClaw', 'Hermes Agent']
  platforms.forEach((p, i) => {
    layer.addElement(new Badge({
      x: 620 + i * 180, y: 200,
      text: p,
      fontSize: 14,
      backgroundColor: '#1e1e2e',
      color: '#4facfe',
      padding: 8,
      radius: 16
    }))
  })

  // ===== FKBuilder 卡片 =====
  // 注意：createComponent 已经自动添加到 poster.components，不需要 layer.addElement
  const card1 = poster.createComponent({
    x: 80, y: 280,
    width: 860, height: 480,
    backgroundColor: '#1e1e2e'
  })

  // 左侧强调条
  card1.addElement(new RectElement({
    x: 0, y: 0,
    width: 6, height: 480,
    fillColor: '#667eea'
  }))

  // 标题和标签
  card1.addElement(new TextElement({
    x: 40, y: 30,
    text: 'FKBuilder',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#667eea'
  }))
  card1.addElement(new Badge({
    x: 40, y: 90,
    text: '视频制作工具',
    fontSize: 14,
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    color: '#667eea',
    radius: 6
  }))

  // 功能特点
  const fbFeatures = [
    { icon: '🎬', text: '多场景视频构建' },
    { icon: '✨', text: '20+ 预设动画' },
    { icon: '🎵', text: '音视频轨道混合' },
    { icon: '📹', text: 'MP4 高质量导出' }
  ]
  fbFeatures.forEach((f, i) => {
    const row = Math.floor(i / 2)
    const col = i % 2
    card1.addElement(new TextElement({
      x: 40 + col * 380, y: 140 + row * 45,
      text: f.icon + '  ' + f.text,
      fontSize: 20,
      color: '#e2e8f0'
    }))
  })

  // 终端风格命令区
  card1.addElement(new RectElement({
    x: 40, y: 250,
    width: 780, height: 70,
    fillColor: '#0d0d0d',
    borderRadius: 8
  }))
  card1.addElement(new TextElement({
    x: 60, y: 272,
    text: '$ npx skills add chnak/FKbuilder',
    fontSize: 22,
    color: '#4ade80'
  }))

  // GitHub
  card1.addElement(new TextElement({
    x: 40, y: 350,
    text: 'github.com/chnak/FKBuilder',
    fontSize: 16,
    color: '#64748b'
  }))

  // 关键词标签
  const fbTags = ['视频轨道', '文字动画', '转场效果', '组件复用']
  fbTags.forEach((t, i) => {
    card1.addElement(new Badge({
      x: 40 + i * 160, y: 400,
      text: t,
      fontSize: 12,
      backgroundColor: '#2d2d3d',
      color: '#a0aec0',
      padding: 6,
      radius: 4
    }))
  })

  // ===== FKPoster 卡片 =====
  const card2 = poster.createComponent({
    x: 980, y: 280,
    width: 860, height: 480,
    backgroundColor: '#1e1e2e'
  })

  // 左侧强调条
  card2.addElement(new RectElement({
    x: 0, y: 0,
    width: 6, height: 480,
    fillColor: '#f472b6'
  }))

  // 标题和标签
  card2.addElement(new TextElement({
    x: 40, y: 30,
    text: 'FKPoster',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f472b6'
  }))
  card2.addElement(new Badge({
    x: 40, y: 90,
    text: '海报设计工具',
    fontSize: 14,
    backgroundColor: 'rgba(244, 114, 182, 0.2)',
    color: '#f472b6',
    radius: 6
  }))

  // 功能特点
  const fpFeatures = [
    { icon: '📊', text: '30+ 组件库' },
    { icon: '🎯', text: '多图层管理' },
    { icon: '📐', text: '相对坐标定位' },
    { icon: '🖼️', text: 'PNG/SVG 导出' }
  ]
  fpFeatures.forEach((f, i) => {
    const row = Math.floor(i / 2)
    const col = i % 2
    card2.addElement(new TextElement({
      x: 40 + col * 380, y: 140 + row * 45,
      text: f.icon + '  ' + f.text,
      fontSize: 20,
      color: '#e2e8f0'
    }))
  })

  // 终端风格命令区
  card2.addElement(new RectElement({
    x: 40, y: 250,
    width: 780, height: 70,
    fillColor: '#0d0d0d',
    borderRadius: 8
  }))
  card2.addElement(new TextElement({
    x: 60, y: 272,
    text: '$ npx skills add chnak/FKPoster',
    fontSize: 22,
    color: '#4ade80'
  }))

  // GitHub
  card2.addElement(new TextElement({
    x: 40, y: 350,
    text: 'github.com/chnak/FKPoster',
    fontSize: 16,
    color: '#64748b'
  }))

  // 关键词标签
  const fpTags = ['名片海报', '活动宣传', '产品卡片', '统计图表']
  fpTags.forEach((t, i) => {
    card2.addElement(new Badge({
      x: 40 + i * 160, y: 400,
      text: t,
      fontSize: 12,
      backgroundColor: '#2d2d3d',
      color: '#a0aec0',
      padding: 6,
      radius: 4
    }))
  })

  // ===== 底部区域 =====
  // 分隔线
  layer.addElement(new Divider({ x: 80, y: 800, width: 1760, thickness: 1, color: '#2d3748' }))

  // 特性图标行
  const bottomFeatures = [
    { icon: '🎥', text: '视频制作' },
    { icon: '🖼️', text: '海报设计' },
    { icon: '⚡', text: '快速安装' },
    { icon: '🔧', text: '易于扩展' }
  ]
  bottomFeatures.forEach((f, i) => {
    layer.addElement(new TextElement({
      x: 400 + i * 280, y: 850,
      text: f.icon + '  ' + f.text,
      fontSize: 22,
      color: '#a0aec0',
      textAlign: 'center',
      anchor: [0.5, 0]
    }))
  })

  // 底部信息
  layer.addElement(new TextElement({
    x: '50%', y: 950,
    text: '支持 FOLIKO、OpenClaw、Hermes Agent 等主流 Agent 平台',
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    anchor: [0.5, 0]
  }))

  layer.addElement(new TextElement({
    x: '50%', y: 1000,
    text: 'MIT License · Open Source',
    fontSize: 14,
    color: '#4a5568',
    textAlign: 'center',
    anchor: [0.5, 0]
  }))

  // 保存
  await poster.exportPNG('fk-skill-packs', './output')
  console.log('\n✅ FK Skill Packs 海报已生成: output/fk-skill-packs.png')
  poster.destroy()
}

main().catch(console.error)
