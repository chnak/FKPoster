/**
 * 商务名片
 */
const {
  PosterBuilder,
  Avatar,
  TextElement,
  Divider,
  Icon,
} = require('../src/index')

async function main() {
  const poster = new PosterBuilder({
    width: 700,
    height: 400,
    backgroundColor: '#1a1a2e'
  })

  poster.initialize()
  const layer = poster.createLayer({ name: 'main', zIndex: 0 })

  // 左侧色块
  const { RectElement } = require('../src/index')
  const leftBlock = new RectElement({
    x: 150, y: 200, width: 300, height: 400,
    fillColor: '#3b82f6', borderRadius: 0,
    anchor: [0.5, 0.5]
  })
  layer.addElement(leftBlock)

  // 头像
  const avatar = new Avatar({
    x: 150, y: 100, name: '李明', size: 80,
    backgroundColor: '#ffffff', color: '#3b82f6',
    anchor: [0.5, 0.5]
  })
  layer.addElement(avatar)

  // 姓名
  const name = new TextElement({
    x: 150, y: 200, text: '李明', fontSize: 32, fontFamily: 'Microsoft YaHei',
    color: '#ffffff', textAlign: 'center', fontWeight: 'bold',
    anchor: [0.5, 0.5]
  })
  layer.addElement(name)

  // 职位
  const title = new TextElement({
    x: 150, y: 245, text: '高级产品经理', fontSize: 16, fontFamily: 'Microsoft YaHei',
    color: 'rgba(255,255,255,0.8)', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(title)

  // 公司
  const company = new TextElement({
    x: 150, y: 280, text: '科技有限公司', fontSize: 14, fontFamily: 'Microsoft YaHei',
    color: 'rgba(255,255,255,0.6)', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(company)

  // 右侧联系信息
  const rightX = 480
  let contactY = 80

  // 电话
  const phoneIcon = new Icon({
    x: rightX - 80, y: contactY, icon: '📞', size: 20, color: '#ffffff',
    anchor: [0, 0]
  })
  layer.addElement(phoneIcon)

  const phone = new TextElement({
    x: rightX - 40, y: contactY, text: '138-0000-1234', fontSize: 14, fontFamily: 'Arial',
    color: '#ffffff', textAlign: 'left',
    anchor: [0, 0]
  })
  layer.addElement(phone)

  contactY += 50

  // 邮箱
  const emailIcon = new Icon({
    x: rightX - 80, y: contactY, icon: '✉', size: 20, color: '#ffffff',
    anchor: [0, 0]
  })
  layer.addElement(emailIcon)

  const email = new TextElement({
    x: rightX - 40, y: contactY, text: 'liming@company.com', fontSize: 14, fontFamily: 'Arial',
    color: '#ffffff', textAlign: 'left',
    anchor: [0, 0]
  })
  layer.addElement(email)

  contactY += 50

  // 网站
  const webIcon = new Icon({
    x: rightX - 80, y: contactY, icon: '🌐', size: 20, color: '#ffffff',
    anchor: [0, 0]
  })
  layer.addElement(webIcon)

  const website = new TextElement({
    x: rightX - 40, y: contactY, text: 'www.company.com', fontSize: 14, fontFamily: 'Arial',
    color: '#ffffff', textAlign: 'left',
    anchor: [0, 0]
  })
  layer.addElement(website)

  contactY += 50

  // 地址
  const addrIcon = new Icon({
    x: rightX - 80, y: contactY, icon: '📍', size: 20, color: '#ffffff',
    anchor: [0, 0]
  })
  layer.addElement(addrIcon)

  const address = new TextElement({
    x: rightX - 40, y: contactY, text: '北京市朝阳区建国路88号', fontSize: 14, fontFamily: 'Microsoft YaHei',
    color: '#ffffff', textAlign: 'left',
    anchor: [0, 0]
  })
  layer.addElement(address)

  // 分隔线
  const divider = new Divider({
    x: rightX, y: 280, width: 180, color: '#3b82f6', thickness: 2,
    anchor: [0.5, 0.5]
  })
  layer.addElement(divider)

  // 底部标语
  const slogan = new TextElement({
    x: 480, y: 330, text: '创新 · 协作 · 卓越', fontSize: 16, fontFamily: 'Microsoft YaHei',
    color: '#888888', textAlign: 'center',
    anchor: [0.5, 0.5]
  })
  layer.addElement(slogan)

  await poster.exportPNG('business-card', './output')
  console.log('Business card saved to output/business-card.png')
  poster.destroy()
}

main().catch(console.error)
