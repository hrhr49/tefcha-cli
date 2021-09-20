import * as path from 'path'
import puppeteer from 'puppeteer'

import {Config} from 'tefcha'
import {BaseRenderer} from './base-renderer'
import {OutputExtension} from './common'

declare global {
  interface Window {
    tefcha: any;
  }
}

const render = async ({
  src,
  extension,
  config
}: {
  src: string;
  extension: OutputExtension;
  config: any;
}): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  try {
    const page = await browser.newPage();
    const htmlFile = path.join(
      process.env.NODE_ENV === 'develop'
      ? `${__dirname}/../bin`
      : __dirname,
      'index.html'
    );
    page.setViewport({width: 500, height: 500});
    await page.goto(`file://${htmlFile}`);
    await page.evaluate(`document.body.style.background = '${'white'}'`);

    const result = await page.$eval('#container', (container: any, src: any, config: any, _x3: any) => {
      container.textContent = src;
      try {
        window.tefcha.initialize(config);
      } catch (error) {
        return {status: 'error', error, message: error.message};
      }
    }, src, config, null);

    if (result && result.status === 'error') {
      throw result.message;
    }

    let resultBuffer: Buffer;
    if (['png', 'jpg', 'jpeg'].includes(extension)) {
      try {
        const svgElement = (await page.$$('svg'))[0];
        const imageBuffer = await svgElement.screenshot({
          type: extension,
        });
        // imageBuffer should be 'Buffer' type
        if (typeof imageBuffer === 'string') {
          throw 'invalid image buffer type: string';
        }
        if (typeof imageBuffer === 'undefined') {
          throw 'invalid image buffer type: undefined';
        }
        resultBuffer = imageBuffer;
      } catch (e) {
        console.error(e);
        throw e;
      }
    } else {
      const svgText: string = await page.$eval('#container', container => container.innerHTML);
      resultBuffer = Buffer.from(svgText);
    }
    return resultBuffer;
  } finally {
    await browser.close();
  }
};


class PuppeteerRenderer implements BaseRenderer {
  readonly src: string;
  readonly config: Config;

  constructor ({
    src,
    config,
  }: {
    src: string;
    config: Config;
  }) {
    this.src = src;
    this.config = config;
  }

  renderSvg = async (): Promise<Buffer> => {
    return await render({
      src: this.src,
      extension: 'svg',
      config: this.config
    });
  }

  renderPng = async (): Promise<Buffer> => {
    return await render({
      src: this.src,
      extension: 'png',
      config: this.config
    });
  }

  renderJpeg = async (): Promise<Buffer> => {
    return await render({
      src: this.src,
      extension: 'jpeg',
      config: this.config
    });
  }
}

export {
  PuppeteerRenderer,
};
