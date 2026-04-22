const { PosterBuilder } = require('./src/core/PosterBuilder');
const {
  Button, Card, ListItem, Badge, Avatar, Bubble, Chip, CTA,
  Divider, Progress, ProgressCircle, QRCode, Notification, StatCard,
  Feature, Quote, Rating, Timeline, Stepper, Ribbon, Seal, Star,
  Icon, Watermark, Arrow, HighlightText, Barcode, Frame, Grid,
  Columns, FeatureGrid, TagCloud, Table, ImageFrame, Chart
} = require('./src/components');
const { RectElement, CircleElement, TextElement, DividerElement } = require('./src/elements');

async function test() {
  const poster = new PosterBuilder({
    width: 750,
    height: 4000,
    backgroundColor: '#1a1a2e',
  })
  const layer = poster.createLayer()

  let y = 20

  // 1. Rect + Circle + Divider (basic elements)
  layer.addElement(new RectElement({
    x: 20, y: y, width: 150, height: 60,
    fillColor: '#6366f1', borderRadius: 8
  }))
  layer.addElement(new CircleElement({
    x: 200, y: y + 30, radius: 30,
    fillColor: '#22c55e'
  }))
  layer.addElement(new DividerElement({
    x: 280, y: y + 30, width: 100, color: '#00d9ff'
  }))
  y += 100

  // 2. Text
  layer.addElement(new TextElement({
    x: 20, y: y, text: 'Text Element - Basic text rendering',
    fontSize: 24, color: '#ffffff'
  }))
  y += 50

  // 3. Button
  layer.addElement(new Button({
    x: 20, y: y, width: 200, height: 50,
    text: 'Button', backgroundColor: '#6366f1', borderRadius: 8
  }))
  layer.addElement(new Button({
    x: 240, y: y, width: 200, height: 50,
    text: 'Rounded', backgroundColor: '#22c55e', borderRadius: 25
  }))
  y += 80

  // 4. Card
  layer.addElement(new Card({
    x: 20, y: y, width: 350, height: 120,
    backgroundColor: '#374151', borderRadius: 12,
    title: 'Card Title', subtitle: 'Card subtitle text here'
  }))
  y += 150

  // 5. ListItem
  layer.addElement(new ListItem({
    x: 20, y: y, width: 350, height: 70,
    title: 'List Item', description: 'Description text', badge: 'NEW'
  }))
  y += 100

  // 6. Badge + Chip
  layer.addElement(new Badge({
    x: 20, y: y, text: 'Badge', backgroundColor: '#ef4444'
  }))
  layer.addElement(new Chip({
    x: 120, y: y, text: 'Chip', backgroundColor: '#22c55e'
  }))
  y += 60

  // 7. Avatar
  layer.addElement(new Avatar({
    x: 20, y: y, size: 80, text: 'A', backgroundColor: '#6366f1'
  }))
  layer.addElement(new Avatar({
    x: 120, y: y, size: 80, text: 'B', backgroundColor: '#22c55e'
  }))
  layer.addElement(new Avatar({
    x: 220, y: y, size: 80, text: 'C', backgroundColor: '#f59e0b'
  }))
  y += 110

  // 8. Bubble + Notification
  layer.addElement(new Bubble({
    x: 20, y: y, width: 200, height: 80,
    text: 'Bubble text', backgroundColor: '#6366f1'
  }))
  layer.addElement(new Notification({
    x: 250, y: y,
    title: 'Notification!',
    message: 'This is a notification.',
    notifType: 'info'
  }))
  y += 110

  // 9. CTA
  layer.addElement(new CTA({
    x: 20, y: y, width: 350, height: 60,
    text: 'Call to Action', backgroundColor: '#6366f1'
  }))
  y += 90

  // 10. Progress + ProgressCircle
  layer.addElement(new Progress({
    x: 20, y: y, width: 250, height: 20,
    value: 70, showLabel: true, label: '70%', backgroundColor: '#374151', fillColor: '#22c55e'
  }))
  layer.addElement(new ProgressCircle({
    x: 300, y: y, size: 60,
    value: 60, backgroundColor: '#374151', fillColor: '#6366f1'
  }))
  y += 60

  // 11. StatCard
  layer.addElement(new StatCard({
    x: 20, y: y, width: 170, height: 100,
    title: 'Stat', value: '100', backgroundColor: '#374151'
  }))
  layer.addElement(new StatCard({
    x: 210, y: y, width: 170, height: 100,
    title: 'Users', value: '999', backgroundColor: '#374151'
  }))
  y += 130

  // 12. Timeline + Stepper
  layer.addElement(new Timeline({
    x: 20, y: y, width: 350,
    items: [
      { title: 'Step 1', description: 'Description 1' },
      { title: 'Step 2', description: 'Description 2' }
    ]
  }))
  y += 130

  // 13. Feature + Quote + Rating
  layer.addElement(new Feature({
    x: 20, y: y, width: 200, height: 100,
    title: 'Feature', description: 'Feature description',
    icon: '★', backgroundColor: '#374151'
  }))
  layer.addElement(new Quote({
    x: 240, y: y, width: 200, height: 80,
    text: 'Quote text', backgroundColor: '#374151'
  }))
  layer.addElement(new Rating({
    x: 460, y: y, value: 4, count: 100
  }))
  y += 130

  // 14. Ribbon + Star + Seal
  layer.addElement(new Ribbon({
    x: 20, y: y, width: 120, height: 35,
    text: 'Ribbon', backgroundColor: '#ef4444'
  }))
  layer.addElement(new Star({
    x: 200, y: y, size: 40, color: '#f59e0b'
  }))
  layer.addElement(new Seal({
    x: 280, y: y, size: 60, color: '#6366f1'
  }))
  y += 80

  // 15. Icon + Watermark
  layer.addElement(new Icon({
    x: 20, y: y, size: 50,
    icon: '★', color: '#6366f1', backgroundColor: '#374151'
  }))
  layer.addElement(new Watermark({
    x: 100, y: y, width: 200, height: 50,
    text: 'Watermark', color: '#ffffff', opacity: 0.3
  }))
  y += 80

  // 16. Arrow
  layer.addElement(new Arrow({
    x: 20, y: y, width: 150, height: 40,
    direction: 'right', color: '#00d9ff'
  }))
  y += 70

  // 17. HighlightText
  layer.addElement(new HighlightText({
    x: 20, y: y, text: 'Highlighted Text', fontSize: 28,
    color: '#ffffff', highlightColor: '#f59e0b'
  }))
  y += 60

  // 18. Barcode
  layer.addElement(new Barcode({
    x: 20, y: y, width: 200, height: 80,
    value: '1234567890', backgroundColor: '#ffffff', barColor: '#000000'
  }))
  y += 110

  // 19. Frame
  layer.addElement(new Frame({
    x: 20, y: y, width: 200, height: 120,
    borderColor: '#6366f1', borderWidth: 3
  }))
  y += 150

  // 20. Grid
  layer.addElement(new Grid({
    x: 20, y: y, width: 350, height: 150,
    rows: 2, cols: 3, gap: 10,
    backgroundColor: '#374151'
  }))
  y += 180

  // 21. Columns
  layer.addElement(new Columns({
    x: 20, y: y, width: 350, height: 100,
    columns: 3, gap: 10,
    items: ['Col 1', 'Col 2', 'Col 3'],
    backgroundColor: '#374151'
  }))
  y += 130

  // 22. FeatureGrid
  layer.addElement(new FeatureGrid({
    x: 20, y: y, width: 350, height: 150,
    features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
    backgroundColor: '#374151'
  }))
  y += 180

  // 23. TagCloud
  layer.addElement(new TagCloud({
    x: 20, y: y, width: 350, height: 100,
    tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'],
    backgroundColor: '#374151'
  }))
  y += 130

  // 24. Table
  layer.addElement(new Table({
    x: 20, y: y, width: 350, height: 120,
    headers: ['Name', 'Age', 'City'],
    rows: [['John', '25', 'NYC'], ['Jane', '30', 'LA']],
    backgroundColor: '#374151'
  }))
  y += 150

  // 25. ImageFrame
  layer.addElement(new ImageFrame({
    x: 20, y: y, width: 150, height: 150,
    borderColor: '#6366f1', borderWidth: 3, borderRadius: 8
  }))
  y += 180

  // 26. Chart (simple bar chart)
  layer.addElement(new Chart({
    x: 20, y: y, width: 350, height: 150,
    type: 'bar',
    data: [30, 60, 80, 45],
    backgroundColor: '#374151'
  }))
  y += 180

  // 27. Divider with style
  layer.addElement(new DividerElement({
    x: 20, y: y, width: 350, color: '#6366f1', thickness: 2, style: 'dashed'
  }))

  await poster.exportSVG('all-components', 'output/svg-test')
  await poster.exportPNG('all-components', 'output')
  console.log('Generated: output/all-components.png and output/svg-test/all-components.svg')
}
test().catch(console.error)