(async () => {
  const PCR = require('puppeteer-chromium-resolver')
  const stats = await PCR()

  const browser = await stats.puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
    executablePath: stats.executablePath
  })

  const Koa = require('koa')
  const app = new Koa()

  app.use(async ctx => {
    const { url } = ctx.query
    if (!url) {
      ctx.body = 'Invalid url'
      return
    }
    ctx.set('Content-Type', 'image/png')
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })
    ctx.body = await page.screenshot({ encoding: 'binary', type: 'png' })
    await page.close()
  })

  app.listen(8001, () => {
    console.log('Server listening on port 8081')
  })
})()