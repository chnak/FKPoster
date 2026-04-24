/**
 * 测试布局和容器组件
 * Grid, Columns, Frame, ListItem, Notification, Table
 */
const {
  PosterBuilder,
  Grid,
  Columns,
  Frame,
  ListItem,
  Notification,
  Table,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#f8fafc'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })
  const cx = 400
  let y = 40

  // Grid 网格
  const grid = new Grid({
    x: cx, y: y, columns: 4, rows: 2,
    columnWidth: 50, rowHeight: 50, gap: 8,
    backgroundColor: '#f1f5f9', borderColor: '#cbd5e1', borderWidth: 1, radius: 8,
    anchor: [0.5, 0.5]
  })
  layer.addElement(grid)
  y += 130

  // Columns 列布局
  const columns = new Columns({
    x: cx, y: y, widths: [120, 120, 120], gap: 15,
    anchor: [0.5, 0.5]
  })
  layer.addElement(columns)
  y += 100

  // Frame 框架
  const frame = new Frame({
    x: cx, y: y, width: 200, height: 80,
    borderColor: '#3b82f6', borderWidth: 3, radius: 12,
    anchor: [0.5, 0.5]
  })
  layer.addElement(frame)
  y += 110

  // ListItem 列表项
  const listItem = new ListItem({
    x: cx, y: y, width: 350, height: 60,
    title: '列表项标题', description: '列表项描述内容',
    icon: '→', iconColor: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(listItem)
  y += 90

  // Notification 通知
  const notification = new Notification({
    x: cx, y: y, width: 320, title: '提示', message: '操作已成功完成',
    anchor: [0.5, 0.5]
  })
  layer.addElement(notification)
  y += 100

  // Table 表格
  const table = new Table({
    x: cx, y: y, width: 350,
    headers: ['姓名', '年龄', '城市'],
    rows: [
      ['张三', '25', '北京'],
      ['李四', '30', '上海'],
      ['王五', '28', '广州']
    ],
    anchor: [0.5, 0.5]
  })
  layer.addElement(table)

  await poster.exportPNG('test-layout-containers', './output')
  console.log('Layout and container components test saved to output/test-layout-containers.png')
  poster.destroy()
}

main().catch(console.error)
