const { PosterBuilder, Layer, Component, BaseElement, RectElement, CircleElement, TextElement, ImageElement, DividerElement, Button, Badge, Card, CTA, Chip, Avatar, Divider, Progress, Rating, Quote, Timeline, Star, Feature, FeatureGrid, StatCard, ListItem, ProgressCircle, Notification, ImageFrame, Arrow, Bubble, Ribbon, Seal, Watermark, Icon, TagCloud, Stepper, Table, HighlightText, Grid, Columns, Barcode, QRCode, Frame, Chart } = require('../src/index')
const path = require('path')
const fs = require('fs')

async function test() {
    console.log('=== FKPoster 组件全量测试 ===\n')
    
    const outputDir = path.join(__dirname, '..', 'output', 'components-test')
    fs.mkdirSync(outputDir, { recursive: true })
    
    const tests = [
        { name: '01-Button', fn: testButton },
        { name: '02-Badge', fn: testBadge },
        { name: '03-Card', fn: testCard },
        { name: '04-CTA', fn: testCTA },
        { name: '05-Chip', fn: testChip },
        { name: '06-Avatar', fn: testAvatar },
        { name: '07-Divider', fn: testDivider },
        { name: '08-Progress', fn: testProgress },
        { name: '09-Rating', fn: testRating },
        { name: '10-Quote', fn: testQuote },
        { name: '11-Timeline', fn: testTimeline },
        { name: '12-Star', fn: testStar },
        { name: '13-Feature', fn: testFeature },
        { name: '14-FeatureGrid', fn: testFeatureGrid },
        { name: '15-StatCard', fn: testStatCard },
        { name: '16-ListItem', fn: testListItem },
        { name: '17-ProgressCircle', fn: testProgressCircle },
        { name: '18-Notification', fn: testNotification },
        { name: '19-ImageFrame', fn: testImageFrame },
        { name: '20-Arrow', fn: testArrow },
        { name: '21-Bubble', fn: testBubble },
        { name: '22-Ribbon', fn: testRibbon },
        { name: '23-Seal', fn: testSeal },
        { name: '24-Watermark', fn: testWatermark },
        { name: '25-Icon', fn: testIcon },
        { name: '26-TagCloud', fn: testTagCloud },
        { name: '27-Stepper', fn: testStepper },
        { name: '28-Table', fn: testTable },
        { name: '29-HighlightText', fn: testHighlightText },
        { name: '30-Grid', fn: testGrid },
        { name: '31-Columns', fn: testColumns },
        { name: '32-Barcode', fn: testBarcode },
        { name: '33-QRCode', fn: testQRCode },
        { name: '34-Frame', fn: testFrame },
        { name: '35-Chart', fn: testChart },
        { name: '36-RectElement', fn: testRectElement },
        { name: '37-CircleElement', fn: testCircleElement },
        { name: '38-TextElement', fn: testTextElement },
        { name: '39-DividerElement', fn: testDividerElement },
    ]
    
    let passed = 0, failed = 0
    
    for (const t of tests) {
        try {
            await t.fn(outputDir)
            console.log('✅ ' + t.name)
            passed++
        } catch (e) {
            console.log('❌ ' + t.name + ' - ' + e.message)
            failed++
        }
    }
    
    console.log('\n=== 测试结果 ===')
    console.log('通过: ' + passed)
    console.log('失败: ' + failed)
    console.log('总计: ' + tests.length)
}

async function testButton(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Button({ x: 100, y: 70, width: 200, height: 60, text: '测试按钮', fontSize: 24, backgroundColor: '#3b82f6', color: '#fff', radius: 8 }))
    await p.exportPNG('01-Button', dir)
    p.destroy()
}

async function testBadge(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Badge({ x: 200, y: 100, text: 'NEW', fontSize: 20, backgroundColor: '#ef4444', color: '#fff', padding: 15, radius: 4 }))
    await p.exportPNG('02-Badge', dir)
    p.destroy()
}

async function testCard(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Card({ x: 50, y: 50, width: 300, height: 200, title: '卡片标题', titleSize: 28, titleColor: '#1e293b', subtitle: '这是副标题文本', subtitleSize: 16, subtitleColor: '#64748b', backgroundColor: '#fff', radius: 12, padding: 20 }))
    await p.exportPNG('03-Card', dir)
    p.destroy()
}

async function testCTA(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new CTA({ x: 100, y: 70, width: 200, height: 60, text: '立即行动', fontSize: 24, backgroundColor: '#10b981', color: '#fff', radius: 8 }))
    await p.exportPNG('04-CTA', dir)
    p.destroy()
}

async function testChip(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Chip({ x: 150, y: 100, text: '标签', fontSize: 18, backgroundColor: '#e0e7ff', color: '#4338ca', radius: 16 }))
    await p.exportPNG('05-Chip', dir)
    p.destroy()
}

async function testAvatar(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Avatar({ x: 200, y: 100, size: 80, initials: 'YK', backgroundColor: '#6366f1', fontSize: 32 }))
    await p.exportPNG('06-Avatar', dir)
    p.destroy()
}

async function testDivider(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Divider({ x: 50, y: 100, width: 300, thickness: 2, color: '#e2e8f0' }))
    await p.exportPNG('07-Divider', dir)
    p.destroy()
}

async function testProgress(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Progress({ x: 50, y: 90, width: 300, height: 20, value: 0.7, fillColor: '#3b82f6', trackColor: '#e2e8f0' }))
    await p.exportPNG('08-Progress', dir)
    p.destroy()
}

async function testRating(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Rating({ x: 100, y: 80, value: 4.5, size: 32, filledColor: '#fbbf24', emptyColor: '#e2e8f0' }))
    await p.exportPNG('09-Rating', dir)
    p.destroy()
}

async function testQuote(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Quote({ x: 50, y: 50, width: 300, height: 200, quote: '这是一段引用文本', fontSize: 18, backgroundColor: '#fff', padding: 20, radius: 8 }))
    await p.exportPNG('10-Quote', dir)
    p.destroy()
}

async function testTimeline(dir) {
    const p = new PosterBuilder({ width: 400, height: 400, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Timeline({ x: 50, y: 50, width: 300, items: [{ text: '第一步', time: '2024-01' }, { text: '第二步', time: '2024-02' }, { text: '第三步', time: '2024-03' }], dotColor: '#3b82f6' }))
    await p.exportPNG('11-Timeline', dir)
    p.destroy()
}

async function testStar(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Star({ x: 200, y: 100, size: 60, color: '#fbbf24', count: 5, filled: 3 }))
    await p.exportPNG('12-Star', dir)
    p.destroy()
}

async function testFeature(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Feature({ x: 50, y: 50, width: 300, height: 100, icon: '🚀', title: '特性标题', description: '特性描述', backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('13-Feature', dir)
    p.destroy()
}

async function testFeatureGrid(dir) {
    const p = new PosterBuilder({ width: 500, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new FeatureGrid({ x: 50, y: 50, columns: 2, itemWidth: 200, itemHeight: 80, items: [{ icon: '🚀', title: '特性1', description: '描述1' }, { icon: '💡', title: '特性2', description: '描述2' }], backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('14-FeatureGrid', dir)
    p.destroy()
}

async function testStatCard(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new StatCard({ x: 100, y: 50, width: 200, height: 100, label: '用户数', value: '12,847', change: '+23%', positive: true, icon: '👥', iconColor: '#3b82f6', backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('15-StatCard', dir)
    p.destroy()
}

async function testListItem(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new ListItem({ x: 50, y: 50, width: 300, icon: '📱', title: '列表项标题', description: '列表项描述', badge: 'NEW', badgeColor: '#ef4444', backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('16-ListItem', dir)
    p.destroy()
}

async function testProgressCircle(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new ProgressCircle({ x: 200, y: 100, radius: 60, value: 0.75, strokeWidth: 10, fillColor: '#3b82f6', trackColor: '#e2e8f0', showLabel: true, labelColor: '#1e293b' }))
    await p.exportPNG('17-ProgressCircle', dir)
    p.destroy()
}

async function testNotification(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Notification({ x: 50, y: 50, width: 300, type: 'success', title: '成功', message: '操作已完成', backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('18-Notification', dir)
    p.destroy()
}

async function testImageFrame(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new ImageFrame({ x: 100, y: 50, width: 200, height: 200, style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 12 }))
    await p.exportPNG('19-ImageFrame', dir)
    p.destroy()
}

async function testArrow(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Arrow({ x: 100, y: 100, width: 200, height: 60, direction: 'right', color: '#3b82f6', strokeWidth: 3 }))
    await p.exportPNG('20-Arrow', dir)
    p.destroy()
}

async function testBubble(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Bubble({ x: 100, y: 100, width: 200, height: 100, text: '气泡内容', fontSize: 16, backgroundColor: '#fff', borderColor: '#3b82f6', radius: 12 }))
    await p.exportPNG('21-Bubble', dir)
    p.destroy()
}

async function testRibbon(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Ribbon({ x: 100, y: 100, width: 200, text: '热卖', fontSize: 20, backgroundColor: '#ef4444', style: 'fold', color: '#fff' }))
    await p.exportPNG('22-Ribbon', dir)
    p.destroy()
}

async function testSeal(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Seal({ x: 200, y: 150, size: 80, text: '官方', fontSize: 16, color: '#ef4444', style: 'circle' }))
    await p.exportPNG('23-Seal', dir)
    p.destroy()
}

async function testWatermark(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Watermark({ x: 200, y: 150, text: 'WATERMARK', fontSize: 48, color: 'rgba(0,0,0,0.1)', rotation: -30 }))
    await p.exportPNG('24-Watermark', dir)
    p.destroy()
}

async function testIcon(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Icon({ x: 200, y: 100, size: 80, icon: '🚀', backgroundColor: '#fff', radius: 40 }))
    await p.exportPNG('25-Icon', dir)
    p.destroy()
}

async function testTagCloud(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new TagCloud({ x: 50, y: 50, maxWidth: 300, tags: [{ text: '标签1', bgColor: '#3b82f6', color: '#fff' }, { text: '标签2', bgColor: '#10b981', color: '#fff' }, { text: '标签3', bgColor: '#f59e0b', color: '#000' }], fontSize: 16 }))
    await p.exportPNG('26-TagCloud', dir)
    p.destroy()
}

async function testStepper(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Stepper({ x: 50, y: 50, width: 300, steps: ['步骤1', '步骤2', '步骤3'], currentStep: 1, activeColor: '#3b82f6' }))
    await p.exportPNG('27-Stepper', dir)
    p.destroy()
}

async function testTable(dir) {
    const p = new PosterBuilder({ width: 500, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Table({ x: 50, y: 50, width: 400, headers: ['列1', '列2', '列3'], rows: [['数据1', '数据2', '数据3'], ['数据4', '数据5', '数据6']], backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('28-Table', dir)
    p.destroy()
}

async function testHighlightText(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new HighlightText({ x: 50, y: 80, text: '这是高亮文本组件', highlightWords: ['高亮'], highlightColor: '#fef08a', fontSize: 24, color: '#1e293b' }))
    await p.exportPNG('29-HighlightText', dir)
    p.destroy()
}

async function testGrid(dir) {
    const p = new PosterBuilder({ width: 400, height: 400, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Grid({ x: 50, y: 50, columns: 3, rows: 3, itemWidth: 100, itemHeight: 100, gap: 10, backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('30-Grid', dir)
    p.destroy()
}

async function testColumns(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Columns({ x: 50, y: 50, columns: 3, width: 300, columnWidth: 90, gap: 10, items: ['列1', '列2', '列3'], backgroundColor: '#fff', radius: 8 }))
    await p.exportPNG('31-Columns', dir)
    p.destroy()
}

async function testBarcode(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Barcode({ x: 100, y: 50, width: 200, height: 80, data: '123456789012', format: 'CODE128' }))
    await p.exportPNG('32-Barcode', dir)
    p.destroy()
}

async function testQRCode(dir) {
    const p = new PosterBuilder({ width: 400, height: 400, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new QRCode({ x: 200, y: 200, size: 150, content: 'https://example.com', color: '#000000', backgroundColor: '#ffffff' }))
    await p.exportPNG('33-QRCode', dir)
    p.destroy()
}

async function testFrame(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Frame({ x: 50, y: 50, width: 300, height: 200, style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 16 }))
    await p.exportPNG('34-Frame', dir)
    p.destroy()
}

async function testChart(dir) {
    const p = new PosterBuilder({ width: 400, height: 300, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new Chart({ x: 50, y: 50, width: 300, height: 200, chartType: 'bar', data: [{ label: '一月', value: 100 }, { label: '二月', value: 150 }, { label: '三月', value: 120 }], barColor: '#3b82f6' }))
    await p.exportPNG('35-Chart', dir)
    p.destroy()
}

async function testRectElement(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new RectElement({ x: 100, y: 50, width: 200, height: 100, fillColor: '#3b82f6', borderColor: '#1e40af', borderWidth: 2, borderRadius: 8 }))
    await p.exportPNG('36-RectElement', dir)
    p.destroy()
}

async function testCircleElement(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new CircleElement({ x: 200, y: 100, radius: 60, fillColor: '#10b981', strokeColor: '#059669', strokeWidth: 2 }))
    await p.exportPNG('37-CircleElement', dir)
    p.destroy()
}

async function testTextElement(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new TextElement({ x: 50, y: 80, text: '文本元素测试', fontSize: 32, color: '#1e293b', fontWeight: 'bold' }))
    await p.exportPNG('38-TextElement', dir)
    p.destroy()
}

async function testDividerElement(dir) {
    const p = new PosterBuilder({ width: 400, height: 200, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new DividerElement({ x: 50, y: 100, width: 300, thickness: 2, color: '#e2e8f0' }))
    await p.exportPNG('39-DividerElement', dir)
    p.destroy()
}

test().catch(console.error)
