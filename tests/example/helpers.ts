export async function loadHomepage(page) {
  await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
}

export async function assertTitle(page) {
  await page.waitForSelector('h1')
}
