import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { path } from 'chromedriver';

export async function startSelenium(moviesUrls) {
  async function start(index, url) {
    const chromeService = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(chromeService);
    const driver = await new Builder().forBrowser('chrome').build();

    try {
      await driver.get(url);
      const videoElement = By.tagName('video.jw-video');
      // await driver.wait(until.elementLocated(videoElement));
      const movieUrl = await driver
        .findElement(videoElement)
        .getAttribute('src');
      console.log('movieUrl', movieUrl);
    } finally {
      await driver.quit();
      await chromeService.kill();
      console.log(`${index} - ${url} done scapping...`);
    }
  }

  try {
    for (const index in moviesUrls) {
      await start(index, moviesUrls[index]);
    }
  } catch (e) {
    console.error('error catch...', e);
  }
}
