/**
 * 音乐播放列表示例
 */
const { PosterBuilder, TextElement, Card, Icon, Divider, Badge, Progress, ProgressCircle, Feature, Avatar, Watermark } = require('../src/index')

async function main() {
  console.log('=== 创建音乐播放列表 ===\n')

  const poster = new PosterBuilder({
    width: 400,
    height: 800,
    backgroundColor: '#1a1a2e'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 标题
  layer.addElement(new Icon({
    x: 170, y: 40, size: 60, icon: '🎵', backgroundColor: '#3b82f6', radius: 30
  }))
  layer.addElement(new TextElement({
    x: 40, y: 110, text: '我的歌单', fontSize: 24, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 140, text: 'FOLIKO MUSIC', fontSize: 12, color: '#64748b'
  }))

  // 当前播放
  layer.addElement(new Card({
    x: 40, y: 180, width: 320, height: 140,
    backgroundColor: '#3b82f6', radius: 16, padding: 20
  }))

  layer.addElement(new Avatar({
    x: 60, y: 210, size: 80, icon: '🎸', backgroundColor: '#2563eb', radius: 40
  }))

  layer.addElement(new TextElement({
    x: 160, y: 210, text: 'Stairway to Heaven', fontSize: 16, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 160, y: 240, text: 'Led Zeppelin', fontSize: 12, color: '#bfdbfe'
  }))

  layer.addElement(new Progress({
    x: 60, y: 280, width: 280, height: 4,
    value: 45, backgroundColor: 'rgba(255,255,255,0.3)', fillColor: '#ffffff', radius: 2
  }))
  layer.addElement(new TextElement({
    x: 60, y: 295, text: '3:24 / 8:02', fontSize: 10, color: '#93c5fd'
  }))

  // 播放控制
  layer.addElement(new Icon({
    x: 140, y: 320, size: 35, icon: '⏮️', backgroundColor: 'transparent', radius: 17
  }))
  layer.addElement(new Icon({
    x: 185, y: 310, size: 50, icon: '▶️', backgroundColor: '#ffffff', radius: 25
  }))
  layer.addElement(new Icon({
    x: 245, y: 320, size: 35, icon: '⏭️', backgroundColor: 'transparent', radius: 17
  }))

  // 歌曲列表
  layer.addElement(new TextElement({
    x: 40, y: 380, text: '播放列表', fontSize: 14, color: '#64748b'
  }))

  // 歌曲1
  layer.addElement(new Card({
    x: 40, y: 410, width: 320, height: 65,
    backgroundColor: '#1e293b', radius: 10, padding: 12
  }))
  layer.addElement(new Badge({
    x: 55, y: 425, text: '1', fontSize: 12,
    backgroundColor: '#3b82f6', color: '#ffffff', radius: 10
  }))
  layer.addElement(new TextElement({
    x: 90, y: 425, text: 'Hotel California', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 90, y: 448, text: 'Eagles', fontSize: 11, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 290, y: 440, text: '6:30', fontSize: 11, color: '#64748b'
  }))

  // 歌曲2
  layer.addElement(new Card({
    x: 40, y: 485, width: 320, height: 65,
    backgroundColor: '#1e293b', radius: 10, padding: 12
  }))
  layer.addElement(new Badge({
    x: 55, y: 500, text: '2', fontSize: 12,
    backgroundColor: '#22c55e', color: '#ffffff', radius: 10
  }))
  layer.addElement(new TextElement({
    x: 90, y: 500, text: 'Imagine', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 90, y: 523, text: 'John Lennon', fontSize: 11, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 290, y: 515, text: '3:05', fontSize: 11, color: '#64748b'
  }))

  // 歌曲3
  layer.addElement(new Card({
    x: 40, y: 560, width: 320, height: 65,
    backgroundColor: '#1e293b', radius: 10, padding: 12
  }))
  layer.addElement(new Badge({
    x: 55, y: 575, text: '3', fontSize: 12,
    backgroundColor: '#64748b', color: '#ffffff', radius: 10
  }))
  layer.addElement(new TextElement({
    x: 90, y: 575, text: 'Bohemian Rhapsody', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 90, y: 598, text: 'Queen', fontSize: 11, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 290, y: 590, text: '5:55', fontSize: 11, color: '#64748b'
  }))

  // 歌曲4
  layer.addElement(new Card({
    x: 40, y: 635, width: 320, height: 65,
    backgroundColor: '#1e293b', radius: 10, padding: 12
  }))
  layer.addElement(new Badge({
    x: 55, y: 650, text: '4', fontSize: 12,
    backgroundColor: '#64748b', color: '#ffffff', radius: 10
  }))
  layer.addElement(new TextElement({
    x: 90, y: 650, text: 'Sweet Child O Mine', fontSize: 14, color: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 90, y: 673, text: "Guns N' Roses", fontSize: 11, color: '#64748b'
  }))
  layer.addElement(new TextElement({
    x: 290, y: 665, text: '5:56', fontSize: 11, color: '#64748b'
  }))

  // 统计数据
  layer.addElement(new Divider({
    x: 40, y: 720, width: 320, thickness: 1, color: '#334155'
  }))

  layer.addElement(new ProgressCircle({
    x: 100, y: 760, radius: 30, value: 75, strokeWidth: 6,
    fillColor: '#3b82f6', trackColor: '#334155', showLabel: false, labelColor: '#ffffff'
  }))
  layer.addElement(new TextElement({
    x: 75, y: 800, text: '进度', fontSize: 10, color: '#64748b'
  }))

  layer.addElement(new TextElement({
    x: 200, y: 750, text: '26,847', fontSize: 20, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 200, y: 775, text: '播放量', fontSize: 10, color: '#64748b'
  }))

  layer.addElement(new TextElement({
    x: 280, y: 750, text: '4', fontSize: 20, color: '#ffffff', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 280, y: 775, text: '首歌', fontSize: 10, color: '#64748b'
  }))

  // 水印
  layer.addElement(new Watermark({
    x: 200, y: 400, text: '🎵', fontSize: 200, color: 'rgba(255,255,255,0.03)', rotation: 0
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('music-playlist', './output')
  console.log(`\n✅ 音乐播放列表已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
