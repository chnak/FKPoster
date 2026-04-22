/**
 * 书页示例 - 章节页面
 */
const { PosterBuilder, TextElement, Divider, Quote, Feature, Progress, Icon, Frame } = require('../src/index')

async function main() {
  console.log('=== 创建书页 ===\n')

  const poster = new PosterBuilder({
    width: 800,
    height: 1100,
    backgroundColor: '#fefefe'
  })

  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 书籍标题区
  layer.addElement(new TextElement({
    x: 40, y: 40, text: 'JavaScript 高级程序设计', fontSize: 32, color: '#1a1a1a', fontWeight: 'bold'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 85, text: '第四版', fontSize: 18, color: '#666666'
  }))

  layer.addElement(new Divider({
    x: 40, y: 120, width: 720, thickness: 2, color: '#e5e5e5'
  }))

  // 章节信息
  layer.addElement(new TextElement({
    x: 40, y: 145, text: '第 5 章', fontSize: 14, color: '#999999'
  }))
  layer.addElement(new TextElement({
    x: 40, y: 175, text: '引用类型', fontSize: 36, color: '#1a1a1a', fontWeight: 'bold'
  }))

  // 名言引用
  layer.addElement(new Quote({
    x: 40, y: 250, width: 720,
    text: 'JavaScript 中的数组和对象是动态类型语言的核心，它们提供了灵活而强大的数据结构。',
    author: 'Nicholas C. Zakas',
    backgroundColor: '#f8f8f8', radius: 8
  }))

  // 本章要点
  layer.addElement(new TextElement({
    x: 40, y: 380, text: '本章要点', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold'
  }))

  layer.addElement(new Feature({
    x: 40, y: 420, width: 340, height: 100,
    icon: '📚', title: 'Object 类型', description: '对象是 JavaScript 的基础，掌握对象的创建、操作和属性特性', iconColor: '#3b82f6',
    backgroundColor: '#f0f7ff', borderColor: '#3b82f6', radius: 8
  }))

  layer.addElement(new Feature({
    x: 420, y: 420, width: 340, height: 100,
    icon: '🔢', title: 'Array 类型', description: '数组提供了有序的数据存储和丰富的操作方法', iconColor: '#22c55e',
    backgroundColor: '#f0f7ff', borderColor: '#22c55e', radius: 8
  }))

  layer.addElement(new Feature({
    x: 40, y: 535, width: 340, height: 100,
    icon: '📝', title: 'Date 类型', description: '日期和时间的处理，包括 Date 对象的所有方法', iconColor: '#f59e0b',
    backgroundColor: '#f0f7ff', borderColor: '#f59e0b', radius: 8
  }))

  layer.addElement(new Feature({
    x: 420, y: 535, width: 340, height: 100,
    icon: '🔬', title: 'RegExp 类型', description: '正则表达式用于模式匹配和文本替换', iconColor: '#8b5cf6',
    backgroundColor: '#f0f7ff', borderColor: '#8b5cf6', radius: 8
  }))

  // 学习进度
  layer.addElement(new TextElement({
    x: 40, y: 660, text: '学习进度', fontSize: 22, color: '#1a1a1a', fontWeight: 'bold'
  }))

  layer.addElement(new TextElement({
    x: 40, y: 700, text: '第 1 节：Object 类型', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new Progress({
    x: 40, y: 730, width: 720, height: 8,
    value: 100, backgroundColor: '#e5e5e5', fillColor: '#3b82f6', radius: 4
  }))

  layer.addElement(new TextElement({
    x: 40, y: 780, text: '第 2 节：Array 类型', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new Progress({
    x: 40, y: 790, width: 720, height: 8,
    value: 75, backgroundColor: '#e5e5e5', fillColor: '#22c55e', radius: 4
  }))

  layer.addElement(new TextElement({
    x: 40, y: 820, text: '第 3 节：Date 类型', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new Progress({
    x: 40, y: 850, width: 720, height: 8,
    value: 30, backgroundColor: '#e5e5e5', fillColor: '#f59e0b', radius: 4
  }))

  layer.addElement(new TextElement({
    x: 40, y: 880, text: '第 4 节：RegExp 类型', fontSize: 14, color: '#666666'
  }))
  layer.addElement(new Progress({
    x: 40, y: 910, width: 720, height: 8,
    value: 0, backgroundColor: '#e5e5e5', fillColor: '#8b5cf6', radius: 4
  }))

  // 章节导航
  layer.addElement(new Frame({
    x: 40, y: 960, width: 720, height: 100,
    style: 'corner', color: '#e5e5e5', borderWidth: 2, radius: 8
  }))

  layer.addElement(new Icon({
    x: 100, y: 985, size: 50, icon: '⬅️', backgroundColor: '#f0f7ff', radius: 25
  }))
  layer.addElement(new TextElement({
    x: 180, y: 995, text: '上一章', fontSize: 12, color: '#999999'
  }))
  layer.addElement(new TextElement({
    x: 180, y: 1020, text: '第 4 章 变量与作用域', fontSize: 16, color: '#1a1a1a'
  }))

  layer.addElement(new Icon({
    x: 600, y: 985, size: 50, icon: '➡️', backgroundColor: '#f0f7ff', radius: 25
  }))
  layer.addElement(new TextElement({
    x: 500, y: 995, text: '下一章', fontSize: 12, color: '#999999'
  }))
  layer.addElement(new TextElement({
    x: 500, y: 1020, text: '第 6 章 面向对象', fontSize: 16, color: '#1a1a1a'
  }))

  console.log('开始渲染...')
  const output = await poster.exportPNG('page-book', './output')
  console.log(`\n✅ 书页已生成: ${output}`)

  poster.destroy()
}

main().catch(console.error)
