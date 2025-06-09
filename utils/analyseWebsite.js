const puppeteer = require('puppeteer');

async function analysePortfolio(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  const content = await page.evaluate(() => {
    return {
        title: document.title,
        metaDescription: document.querySelector("meta[name='description']")?.content || "",
        sections: Array.from(document.querySelectorAll('section, header, footer')).map(sec =>
          sec.id || sec.className || 'unnamed-section'
        ),
        textContent: document.body.innerText.slice(0, 8000) // trim to avoid token limits
      };
  });

  await browser.close();
  return content;
}

module.exports = {
  analysePortfolio
};