import { Builder, By, Key, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { path } from 'chromedriver';

const limitWait = 4000;

export async function startSelenium(moviesUrls) {
  async function alternate(index, url) {
    const chromeService = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(chromeService);

    const driver = await new Builder().forBrowser('chrome').build();
    const iframeElement = By.tagName('iframe#myvid');

    try {
      await driver.get(url);
      await driver.wait(until.elementLocated(iframeElement), limitWait);
      const movieUrl = await driver
        .findElement(iframeElement)
        .getAttribute('src');

      console.log('movieUrl alternate', movieUrl);
    } finally {
      await driver.quit();
      await chromeService.kill();
      console.log(`${index} - ${url} done scapping...`);
    }
  }

  async function start(index, url) {
    const chromeService = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(chromeService);

    const driver = await new Builder().forBrowser('chrome').build();
    const videoElement = By.tagName('video.jw-video');

    try {
      await driver.get(url);
      await driver.wait(until.elementLocated(videoElement), limitWait);
      const movieUrl = await driver
        .findElement(videoElement)
        .getAttribute('src');

      console.log('movieUrl start', movieUrl);
    } finally {
      await driver.quit();
      await chromeService.kill();
      console.log(`${index} - ${url} done scapping...`);
    }
  }

  async function startScrapping(idx = 0, isAlternate = false) {
    try {
      for (let i = idx; i < moviesUrls.length; i++) {
        const currentUrl = moviesUrls[i];

        if (isAlternate) {
          try {
            await alternate(i, currentUrl);
          } catch (e) {
            throw i;
          }
        } else {
          try {
            await start(i, currentUrl);
          } catch (e) {
            throw i;
          }
        }
      }
    } catch (indexError) {
      if (indexError) {
        console.error('error catch... trying alternate index', indexError);
        if (isAlternate) {
          startScrapping(indexError, false);
        } else {
          startScrapping(indexError, true);
        }
      }
    }
  }

  await startScrapping();
}
