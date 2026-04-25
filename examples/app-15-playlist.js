/**
 * 应用示例 - 音乐播放列表封面
 * Playlist Cover
 */
const {
  PosterBuilder,
  TextElement,
  RectElement,
  CircleElement,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 400,
    height: 400,
    backgroundColor: '#1a1a2e'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 背景装饰圆
  layer.addElement(new CircleElement({
    x: 320, y: 80, radius: 120,
    fillColor: '#6366f1', opacity: 0.3
  }))

  layer.addElement(new CircleElement({
    x: 80, y: 320, radius: 80,
    fillColor: '#ec4899', opacity: 0.3
  }))

  // 唱片图形
  layer.addElement(new CircleElement({
    x: 200, y: 160, radius: 100,
    fillColor: '#1a1a2e',
    borderColor: '#ffffff',
    borderWidth: 2
  }))

  layer.addElement(new CircleElement({
    x: 200, y: 160, radius: 35,
    fillColor: '#6366f1'
  }))

  layer.addElement(new CircleElement({
    x: 200, y: 160, radius: 10,
    fillColor: '#ffffff'
  }))

  // 播放列表图标
  layer.addElement(new TextElement({
    x: 200, y: 300, text: '♪', fontSize: 36,
    color: '#ffffff', anchor: [0.5, 0.5]
  }))

  // 标题
  layer.addElement(new TextElement({
    x: 200, y: 340, text: '我的私人歌单', fontSize: 22,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // 歌曲数量
  layer.addElement(new TextElement({
    x: 200, y: 375, text: '128首歌曲', fontSize: 14,
    color: '#888888', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('app-15-playlist', '../output')
  poster.destroy()
  console.log('Playlist cover saved to output/app-15-playlist.png')
}

main().catch(console.error)