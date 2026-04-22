/**
 * 电影海报示例
 */
const { PosterBuilder, TextElement, Badge, Rating, Divider, Icon, Frame, Quote, Feature, TagCloud, CTA, Watermark } = require('../src/index')

async function main() {
  console.log('=== 创建电影海报 ===\n')

  const poster = new PosterBuilder({
    width: 800,
    height: 1200,
    backgroundColor: '#0a0a0a'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 顶部标签
  layer.addElement(new Badge({
    x: 40, y: 40, text: 'IMAX 3D', fontSize: 14,
    backgroundColor: '#ef4444', color: '#ffffff', radius: 6
  }))
  layer.addElement(new Badge({
    x: 130, y: 40, text: 'Dolby Atmos', fontSize: 14,
    backgroundColor: '#3b82f6', color: '#ffffff', radius: 6
  }))

  // 主标题
  layer.addElement(new TextElement({
    x: 40, y: 100, text: '星际穿越', fontSize: 56, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 165, text: 'Interstellar', fontSize: 24, color: '#666666'
  }))

  // 电影框架
  layer.addElement(new Frame({
    x: 40, y: 220, width: 720, height: 400,
    style: 'double', color: '#fbbf24', borderWidth: 4, radius: 16
  }))

  layer.addElement(new Icon({
    x: 320, y: 320, size: 120, icon: '🚀', backgroundColor: '#1a1a1a', radius: 60
  }))
  layer.addElement(new TextElement({
    x: 300, y: 480, text: '即将上映', fontSize: 20, color: '#fbbf24'
  }))

  // 评分
  layer.addElement(new TextElement({
    x: 40, y: 660, text: '豆瓣评分', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new Rating({
    x: 40, y: 685, value: 9.4, size: 22, filledColor: '#fbbf24', emptyColor: '#333333'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 700, text: '9.4分 · 186万人评价', fontSize: 14, color: '#666666'
  }))

  // 导演和演员
  layer.addElement(new TextElement({
    x: 40, y: 760, text: '导演', fontSize: 12, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 785, text: '克里斯托弗·诺兰', fontSize: 18, color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 300, y: 760, text: '主演', fontSize: 12, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 300, y: 785, text: '马修·麦康纳 / 安妮·海瑟薇 / 杰西卡·查斯坦', fontSize: 16, color: '#ffffff'
  }))

  // 类型和时长
  layer.addElement(new TextElement({
    x: 40, y: 840, text: '类型', fontSize: 12, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 865, text: '科幻 / 冒险 / 剧情', fontSize: 16, color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 300, y: 840, text: '时长', fontSize: 12, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 300, y: 865, text: '169 分钟', fontSize: 16, color: '#ffffff'
  }))

  layer.addElement(new TextElement({
    x: 500, y: 840, text: '上映日期', fontSize: 12, color: '#666666'
  }))
  layer.addElement(new TextElement({
    x: 500, y: 865, text: '2014-11-12', fontSize: 16, color: '#ffffff'
  }))

  // 剧情简介
  layer.addElement(new Quote({
    x: 40, y: 920, width: 720,
    text: '一组探险家利用他们针对虫洞的新发现，超越人类对于太空旅行的极限，从而开始在广袤的宇宙中进行星际航行的故事。',
    backgroundColor: '#1a1a1a', radius: 8
  }))

  // 标签
  layer.addElement(new TagCloud({
    x: 40, y: 1020, maxWidth: 720,
    tags: [
      { text: '硬科幻', bgColor: '#3b82f6', color: '#ffffff' },
      { text: '时空穿越', bgColor: '#22c55e', color: '#ffffff' },
      { text: '父女情感', bgColor: '#f59e0b', color: '#000000' },
      { text: '诺贝尔奖理论', bgColor: '#8b5cf6', color: '#ffffff' },
      { text: 'IMAX', bgColor: '#ef4444', color: '#ffffff' },
    ],
    fontSize: 13
  }))

  // 底部CTA
  layer.addElement(new Divider({
    x: 40, y: 1100, width: 720, thickness: 1, color: '#333333'
  }))

  layer.addElement(new CTA({
    x: 40, y: 1125, width: 720, height: 60,
    text: '立即购票', fontSize: 22,
    backgroundColor: '#ef4444', color: '#ffffff', radius: 8
  }))

  // 水印
  layer.addElement(new Watermark({
    x: 400, y: 600, text: 'FOLIKO', fontSize: 120, color: 'rgba(255,255,255,0.03)', rotation: -30
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('poster-movie', './output')
  console.log(`\n✅ 电影海报已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
