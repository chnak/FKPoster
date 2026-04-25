/**
 * 应用示例 - 电影海报
 * Movie Poster
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  Rating,
  Badge,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 600,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 电影标题
  layer.addElement(new TextElement({
    x: 200, y: 80, text: '星际穿越', fontSize: 48,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 电影封面区域
  layer.addElement(new RectElement({
    x: 200, y: 350, width: 380, height: 280,
    fillColor: '#2d2d4a',
    anchor: [0.5, 0.5]
  }))

  // 英文标题
  layer.addElement(new TextElement({
    x: 200, y: 130, text: 'INTERSTELLAR', fontSize: 18,
    color: '#888888', anchor: [0.5, 0.5], fontFamily: 'Arial'
  }))

  // 类型标签
  layer.addElement(new Badge({
    x: 100, y: 170, text: '科幻',
    backgroundColor: '#e94560', color: '#ffffff',
    fontSize: 12, radius: 4, padding: 8
  }))

  layer.addElement(new Badge({
    x: 160, y: 170, text: '冒险',
    backgroundColor: '#533483', color: '#ffffff',
    fontSize: 12, radius: 4, padding: 8
  }))

  layer.addElement(new Badge({
    x: 220, y: 170, text: '剧情',
    backgroundColor: '#0f3460', color: '#ffffff',
    fontSize: 12, radius: 4, padding: 8
  }))

  // 评分
  layer.addElement(new Rating({
    x: 200, y: 220, value: 4.5, size: 20,
    filledColor: '#FFD700', emptyColor: '#444444'
  }))

  layer.addElement(new TextElement({
    x: 260, y: 220, text: '9.4', fontSize: 16,
    color: '#FFD700', fontWeight: 'bold'
  }))

  // 主演
  layer.addElement(new TextElement({
    x: 200, y: 500, text: '主演：马修·麦康纳 / 安妮·海瑟薇', fontSize: 14,
    color: '#aaaaaa', anchor: [0.5, 0.5]
  }))

  // 上映时间
  layer.addElement(new TextElement({
    x: 200, y: 530, text: '2026-05-01 全国上映', fontSize: 14,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 底部宣传语
  layer.addElement(new RectElement({
    x: 200, y: 580, width: 400, height: 40,
    fillColor: '#e94560',
    anchor: [0.5, 0.5]
  }))

  layer.addElement(new TextElement({
    x: 200, y: 580, text: '穿越星际，只为回到你身边', fontSize: 16,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-09-movie-poster', '../output')
  poster.destroy()
  console.log('Movie poster saved to output/app-09-movie-poster.png')
}

main().catch(console.error)