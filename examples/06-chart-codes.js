/**
 * 图表和码类测试
 * Chart, QRCode, Barcode
 */
const {
  PosterBuilder,
  TextElement,
  Chart,
  QRCode,
  Barcode,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 800,
    height: 700,
    backgroundColor: '#0f0f23'
  })
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  layer.addElement(new TextElement({
    x: 400, y: 40, text: '图表与码类测试', fontSize: 28,
    color: '#ffffff', fontWeight: 'bold', anchor: [0.5, 0.5]
  }))

  // Chart - 柱状图
  layer.addElement(new Chart({
    x: 250, y: 180, width: 280, height: 200,
    chartType: 'bar',
    data: [
      { label: '一月', value: 120, color: '#00d9ff' },
      { label: '二月', value: 85, color: '#e94560' },
      { label: '三月', value: 150, color: '#533483' },
      { label: '四月', value: 90, color: '#0f3460' },
    ],
    showLabels: true, showValues: true, anchor: [0.5, 0.5]
  }))

  // Chart - 饼图
  layer.addElement(new Chart({
    x: 550, y: 180, width: 200, height: 200,
    chartType: 'pie',
    data: [
      { label: 'A', value: 30, color: '#00d9ff' },
      { label: 'B', value: 25, color: '#e94560' },
      { label: 'C', value: 20, color: '#533483' },
      { label: 'D', value: 25, color: '#0f3460' },
    ],
    showLabels: true, anchor: [0.5, 0.5]
  }))

  // QRCode
  layer.addElement(new QRCode({
    x: 200, y: 500, size: 120, content: 'https://example.com',
    color: '#ffffff', backgroundColor: '#16213e', anchor: [0.5, 0.5]
  }))

  layer.addElement(new QRCode({
    x: 400, y: 500, size: 120, content: 'https://github.com',
    color: '#ffffff', backgroundColor: '#16213e', anchor: [0.5, 0.5]
  }))

  // Barcode
  layer.addElement(new Barcode({
    x: 600, y: 480, width: 180, height: 80,
    content: '1234567890128', color: '#000000',
    showText: true, textColor: '#333333', anchor: [0.5, 0.5]
  }))

  await poster.exportPNG('06-chart-codes', './output')
  poster.destroy()
  console.log('Chart and codes test saved to output/06-chart-codes.png')
}

main().catch(console.error)