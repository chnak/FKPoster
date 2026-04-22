const { PosterBuilder, Layer, Component, BaseElement, RectElement, CircleElement, TextElement, ImageElement, DividerElement, Button, Badge, Card, CTA, Chip, Avatar, Divider, Progress, Rating, Quote, Timeline, Star, Feature, FeatureGrid, StatCard, ListItem, ProgressCircle, Notification, ImageFrame, Arrow, Bubble, Ribbon, Seal, Watermark, Icon, TagCloud, Stepper, Table, HighlightText, Grid, Columns, Barcode, QRCode, Frame, Chart } = require('../src/index')
const path = require('path')
const fs = require('fs')

async function test() {
    console.log('=== FKPoster 组件居中测试 ===\n')
    
    const outputDir = path.join(__dirname, '..', 'output', 'components-centered')
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

// 居中辅助函数
function center(canvasWidth, canvasHeight, elementWidth, elementHeight) {
    return {
        x: (canvasWidth - elementWidth) / 2,
        y: (canvasHeight - elementHeight) / 2
    }
}

// 水平居中辅助函数
function centerX(canvasWidth, elementWidth) {
    return (canvasWidth - elementWidth) / 2
}

async function testButton(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const btnW = 200, btnH = 60
    p.createLayer().addElement(new Button({
        x: centerX(W, btnW), y: center(W, H, btnW, btnH).y,
        width: btnW, height: btnH, text: '测试按钮', fontSize: 24,
        backgroundColor: '#3b82f6', color: '#fff', radius: 8
    }))
    await p.exportPNG('01-Button', dir)
    p.destroy()
}

async function testBadge(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const badgeW = 120, badgeH = 50
    p.createLayer().addElement(new Badge({
        x: centerX(W, badgeW), y: center(W, H, badgeW, badgeH).y,
        text: 'NEW', fontSize: 20, backgroundColor: '#ef4444', color: '#fff', padding: 15, radius: 4
    }))
    await p.exportPNG('02-Badge', dir)
    p.destroy()
}

async function testCard(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const cardW = 300, cardH = 200
    p.createLayer().addElement(new Card({
        x: centerX(W, cardW), y: center(W, H, cardW, cardH).y,
        width: cardW, height: cardH,
        title: '卡片标题', titleSize: 28, titleColor: '#1e293b',
        subtitle: '副标题文本内容', subtitleSize: 16, subtitleColor: '#64748b',
        backgroundColor: '#fff', radius: 12, padding: 20
    }))
    await p.exportPNG('03-Card', dir)
    p.destroy()
}

async function testCTA(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const ctaW = 200, ctaH = 60
    p.createLayer().addElement(new CTA({
        x: centerX(W, ctaW), y: center(W, H, ctaW, ctaH).y,
        width: ctaW, height: ctaH, text: '立即行动', fontSize: 24,
        backgroundColor: '#10b981', color: '#fff', radius: 8
    }))
    await p.exportPNG('04-CTA', dir)
    p.destroy()
}

async function testChip(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const chipW = 100, chipH = 40
    p.createLayer().addElement(new Chip({
        x: centerX(W, chipW), y: center(W, H, chipW, chipH).y,
        text: '标签', fontSize: 18, backgroundColor: '#e0e7ff', color: '#4338ca', radius: 16
    }))
    await p.exportPNG('05-Chip', dir)
    p.destroy()
}

async function testAvatar(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const size = 80
    p.createLayer().addElement(new Avatar({
        x: centerX(W, size), y: center(W, H, size, size).y,
        size: size, initials: 'YK', backgroundColor: '#6366f1', fontSize: 32
    }))
    await p.exportPNG('06-Avatar', dir)
    p.destroy()
}

async function testDivider(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const divW = 300, divH = 2
    p.createLayer().addElement(new Divider({
        x: centerX(W, divW), y: center(W, H, divW, divH).y,
        width: divW, thickness: 2, color: '#e2e8f0'
    }))
    await p.exportPNG('07-Divider', dir)
    p.destroy()
}

async function testProgress(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const progW = 300, progH = 20
    p.createLayer().addElement(new Progress({
        x: centerX(W, progW), y: center(W, H, progW, progH).y,
        width: progW, height: progH, value: 0.7, fillColor: '#3b82f6', trackColor: '#e2e8f0'
    }))
    await p.exportPNG('08-Progress', dir)
    p.destroy()
}

async function testRating(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const ratingW = 200, ratingH = 40
    p.createLayer().addElement(new Rating({
        x: centerX(W, ratingW), y: center(W, H, ratingW, ratingH).y,
        value: 4.5, size: 32, filledColor: '#fbbf24', emptyColor: '#e2e8f0'
    }))
    await p.exportPNG('09-Rating', dir)
    p.destroy()
}

async function testQuote(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const quoteW = 300, quoteH = 200
    p.createLayer().addElement(new Quote({
        x: centerX(W, quoteW), y: center(W, H, quoteW, quoteH).y,
        width: quoteW, height: quoteH, quote: '这是一段引用文本',
        fontSize: 18, backgroundColor: '#fff', padding: 20, radius: 8
    }))
    await p.exportPNG('10-Quote', dir)
    p.destroy()
}

async function testTimeline(dir) {
    const W = 400, H = 400
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const timelineW = 300, timelineH = 250
    p.createLayer().addElement(new Timeline({
        x: centerX(W, timelineW), y: center(W, H, timelineW, timelineH).y,
        width: timelineW,
        items: [
            { text: '第一步', time: '2024-01' },
            { text: '第二步', time: '2024-02' },
            { text: '第三步', time: '2024-03' }
        ], dotColor: '#3b82f6'
    }))
    await p.exportPNG('11-Timeline', dir)
    p.destroy()
}

async function testStar(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const starW = 200, starH = 60
    p.createLayer().addElement(new Star({
        x: centerX(W, starW), y: center(W, H, starW, starH).y,
        size: 60, color: '#fbbf24', count: 5, filled: 3
    }))
    await p.exportPNG('12-Star', dir)
    p.destroy()
}

async function testFeature(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const featW = 300, featH = 100
    p.createLayer().addElement(new Feature({
        x: centerX(W, featW), y: center(W, H, featW, featH).y,
        width: featW, height: featH,
        icon: '🚀', title: '特性标题', description: '特性描述文本',
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('13-Feature', dir)
    p.destroy()
}

async function testFeatureGrid(dir) {
    const W = 500, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const gridW = 400, gridH = 200
    p.createLayer().addElement(new FeatureGrid({
        x: centerX(W, gridW), y: center(W, H, gridW, gridH).y,
        columns: 2, itemWidth: 180, itemHeight: 80,
        items: [
            { icon: '🚀', title: '特性1', description: '描述1' },
            { icon: '💡', title: '特性2', description: '描述2' },
            { icon: '⚡', title: '特性3', description: '描述3' },
            { icon: '🎯', title: '特性4', description: '描述4' }
        ],
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('14-FeatureGrid', dir)
    p.destroy()
}

async function testStatCard(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const statW = 200, statH = 100
    p.createLayer().addElement(new StatCard({
        x: centerX(W, statW), y: center(W, H, statW, statH).y,
        width: statW, height: statH,
        label: '用户数', value: '12,847', change: '+23%', positive: true,
        icon: '👥', iconColor: '#3b82f6',
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('15-StatCard', dir)
    p.destroy()
}

async function testListItem(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const itemW = 300, itemH = 80
    p.createLayer().addElement(new ListItem({
        x: centerX(W, itemW), y: center(W, H, itemW, itemH).y,
        width: itemW,
        icon: '📱', title: '列表项标题', description: '列表项描述',
        badge: 'NEW', badgeColor: '#ef4444',
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('16-ListItem', dir)
    p.destroy()
}

async function testProgressCircle(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const radius = 60
    const size = radius * 2
    p.createLayer().addElement(new ProgressCircle({
        x: centerX(W, size), y: center(W, H, size, size).y,
        radius: radius, value: 0.75,
        strokeWidth: 10, fillColor: '#3b82f6', trackColor: '#e2e8f0',
        showLabel: true, labelColor: '#1e293b'
    }))
    await p.exportPNG('17-ProgressCircle', dir)
    p.destroy()
}

async function testNotification(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const notifW = 300, notifH = 80
    p.createLayer().addElement(new Notification({
        x: centerX(W, notifW), y: center(W, H, notifW, notifH).y,
        width: notifW,
        type: 'success', title: '成功', message: '操作已完成',
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('18-Notification', dir)
    p.destroy()
}

async function testImageFrame(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const frameW = 200, frameH = 200
    p.createLayer().addElement(new ImageFrame({
        x: centerX(W, frameW), y: center(W, H, frameW, frameH).y,
        width: frameW, height: frameH,
        style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 12
    }))
    await p.exportPNG('19-ImageFrame', dir)
    p.destroy()
}

async function testArrow(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const arrowW = 200, arrowH = 60
    p.createLayer().addElement(new Arrow({
        x: centerX(W, arrowW), y: center(W, H, arrowW, arrowH).y,
        width: arrowW, height: arrowH,
        direction: 'right', color: '#3b82f6', strokeWidth: 3
    }))
    await p.exportPNG('20-Arrow', dir)
    p.destroy()
}

async function testBubble(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const bubbleW = 200, bubbleH = 100
    p.createLayer().addElement(new Bubble({
        x: centerX(W, bubbleW), y: center(W, H, bubbleW, bubbleH).y,
        width: bubbleW, height: bubbleH,
        text: '气泡内容', fontSize: 16, backgroundColor: '#fff',
        borderColor: '#3b82f6', radius: 12
    }))
    await p.exportPNG('21-Bubble', dir)
    p.destroy()
}

async function testRibbon(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const ribbonW = 200, ribbonH = 50
    p.createLayer().addElement(new Ribbon({
        x: centerX(W, ribbonW), y: center(W, H, ribbonW, ribbonH).y,
        width: ribbonW,
        text: '热卖', fontSize: 20, backgroundColor: '#ef4444', style: 'fold', color: '#fff'
    }))
    await p.exportPNG('22-Ribbon', dir)
    p.destroy()
}

async function testSeal(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const sealSize = 80
    p.createLayer().addElement(new Seal({
        x: centerX(W, sealSize), y: center(W, H, sealSize, sealSize).y,
        size: sealSize,
        text: '官方', fontSize: 16, color: '#ef4444', style: 'circle'
    }))
    await p.exportPNG('23-Seal', dir)
    p.destroy()
}

async function testWatermark(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const wmW = 200, wmH = 50
    p.createLayer().addElement(new Watermark({
        x: centerX(W, wmW), y: center(W, H, wmW, wmH).y,
        text: 'WATERMARK', fontSize: 48, color: 'rgba(0,0,0,0.1)', rotation: -30
    }))
    await p.exportPNG('24-Watermark', dir)
    p.destroy()
}

async function testIcon(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const iconSize = 80
    p.createLayer().addElement(new Icon({
        x: centerX(W, iconSize), y: center(W, H, iconSize, iconSize).y,
        size: iconSize,
        icon: '🚀', backgroundColor: '#fff', radius: 40
    }))
    await p.exportPNG('25-Icon', dir)
    p.destroy()
}

async function testTagCloud(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const cloudW = 300, cloudH = 150
    p.createLayer().addElement(new TagCloud({
        x: centerX(W, cloudW), y: center(W, H, cloudW, cloudH).y,
        maxWidth: cloudW,
        tags: [
            { text: '标签1', bgColor: '#3b82f6', color: '#fff' },
            { text: '标签2', bgColor: '#10b981', color: '#fff' },
            { text: '标签3', bgColor: '#f59e0b', color: '#000' }
        ], fontSize: 16
    }))
    await p.exportPNG('26-TagCloud', dir)
    p.destroy()
}

async function testStepper(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const stepW = 300, stepH = 150
    p.createLayer().addElement(new Stepper({
        x: centerX(W, stepW), y: center(W, H, stepW, stepH).y,
        width: stepW,
        steps: ['步骤1', '步骤2', '步骤3'],
        currentStep: 1, activeColor: '#3b82f6'
    }))
    await p.exportPNG('27-Stepper', dir)
    p.destroy()
}

async function testTable(dir) {
    const W = 500, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const tableW = 400, tableH = 200
    p.createLayer().addElement(new Table({
        x: centerX(W, tableW), y: center(W, H, tableW, tableH).y,
        width: tableW,
        headers: ['列1', '列2', '列3'],
        rows: [
            ['数据1', '数据2', '数据3'],
            ['数据4', '数据5', '数据6']
        ],
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('28-Table', dir)
    p.destroy()
}

async function testHighlightText(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const hlW = 300, hlH = 60
    p.createLayer().addElement(new HighlightText({
        x: centerX(W, hlW), y: center(W, H, hlW, hlH).y,
        text: '这是高亮文本组件',
        highlightWords: ['高亮'],
        fontSize: 24, color: '#1e293b'
    }))
    await p.exportPNG('29-HighlightText', dir)
    p.destroy()
}

async function testGrid(dir) {
    const W = 400, H = 400
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const gridW = 300, gridH = 300
    p.createLayer().addElement(new Grid({
        x: centerX(W, gridW), y: center(W, H, gridW, gridH).y,
        columns: 3, rows: 3,
        itemWidth: 90, itemHeight: 90, gap: 10,
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('30-Grid', dir)
    p.destroy()
}

async function testColumns(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const colW = 300, colH = 200
    p.createLayer().addElement(new Columns({
        x: centerX(W, colW), y: center(W, H, colW, colH).y,
        columns: 3, width: colW, columnWidth: 90, gap: 10,
        items: ['列1', '列2', '列3'],
        backgroundColor: '#fff', radius: 8
    }))
    await p.exportPNG('31-Columns', dir)
    p.destroy()
}

async function testBarcode(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const bcW = 200, bcH = 80
    p.createLayer().addElement(new Barcode({
        x: centerX(W, bcW), y: center(W, H, bcW, bcH).y,
        width: bcW, height: bcH,
        data: '123456789012', format: 'CODE128'
    }))
    await p.exportPNG('32-Barcode', dir)
    p.destroy()
}

async function testQRCode(dir) {
    const W = 400, H = 400
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const qrSize = 150
    p.createLayer().addElement(new QRCode({
        x: centerX(W, qrSize), y: center(W, H, qrSize, qrSize).y,
        size: qrSize,
        content: 'https://example.com',
        color: '#000000', backgroundColor: '#ffffff'
    }))
    await p.exportPNG('33-QRCode', dir)
    p.destroy()
}

async function testFrame(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const frameW = 300, frameH = 200
    p.createLayer().addElement(new Frame({
        x: centerX(W, frameW), y: center(W, H, frameW, frameH).y,
        width: frameW, height: frameH,
        style: 'modern', color: '#3b82f6', borderWidth: 4, radius: 16
    }))
    await p.exportPNG('34-Frame', dir)
    p.destroy()
}

async function testChart(dir) {
    const W = 400, H = 300
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const chartW = 300, chartH = 200
    p.createLayer().addElement(new Chart({
        x: centerX(W, chartW), y: center(W, H, chartW, chartH).y,
        width: chartW, height: chartH,
        chartType: 'bar',
        data: [
            { label: '一月', value: 100 },
            { label: '二月', value: 150 },
            { label: '三月', value: 120 }
        ],
        barColor: '#3b82f6'
    }))
    await p.exportPNG('35-Chart', dir)
    p.destroy()
}

async function testRectElement(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const rectW = 200, rectH = 100
    p.createLayer().addElement(new RectElement({
        x: centerX(W, rectW), y: center(W, H, rectW, rectH).y,
        width: rectW, height: rectH,
        fillColor: '#3b82f6', borderColor: '#1e40af', borderWidth: 2, borderRadius: 8
    }))
    await p.exportPNG('36-RectElement', dir)
    p.destroy()
}

async function testCircleElement(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const r = 60
    const size = r * 2
    p.createLayer().addElement(new CircleElement({
        x: centerX(W, size), y: center(W, H, size, size).y,
        radius: r,
        fillColor: '#10b981', strokeColor: '#059669', strokeWidth: 2
    }))
    await p.exportPNG('37-CircleElement', dir)
    p.destroy()
}

async function testTextElement(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    p.createLayer().addElement(new TextElement({
        x: centerX(W, 300), y: H / 2,
        text: '文本元素测试',
        fontSize: 32, color: '#1e293b', fontWeight: 'bold'
    }))
    await p.exportPNG('38-TextElement', dir)
    p.destroy()
}

async function testDividerElement(dir) {
    const W = 400, H = 200
    const p = new PosterBuilder({ width: W, height: H, backgroundColor: '#f5f5f5' })
    const divW = 300, divH = 2
    p.createLayer().addElement(new DividerElement({
        x: centerX(W, divW), y: center(W, H, divW, divH).y,
        width: divW, thickness: 2, color: '#e2e8f0'
    }))
    await p.exportPNG('39-DividerElement', dir)
    p.destroy()
}

test().catch(console.error)
