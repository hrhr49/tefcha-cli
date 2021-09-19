#!/usr/bin/env node
import {program} from 'commander'
import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'
import chalk from 'chalk'

declare global {
  interface Window {
    tefcha: any;
  }
}

const OUTPUT_EXTENSIONS = ['svg', 'png', 'jpg', 'jpeg'] as const;
type OutputExtension = (typeof OUTPUT_EXTENSIONS)[number];

const isOutputExtension = (obj: any): obj is OutputExtension => {
  return OUTPUT_EXTENSIONS.includes(obj);
};

const launch = async (src: string, outputFile: string, extension: OutputExtension, config: any) => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  const htmlFile = path.join(__dirname, 'index.html');
  page.setViewport({width: 500, height: 500});
  await page.goto(`file://${htmlFile}`);
  await page.evaluate(`document.body.style.background = '${'white'}'`);

  const result = await page.$eval('#container', (container, src, config, _x3) => {
    container.textContent = src;
    try {
      window.tefcha.initialize(config);
    } catch (error) {
      return {status: 'error', error, message: error.message};
    }
  }, src, config, null);

  if (result && result.status === 'error') {
    console.error(chalk.red(result.message))
  }

  if (['png', 'jpg', 'jpeg'].includes(extension)) {
    try {
      const svgElement = (await page.$$('svg'))[0];
      if (outputFile) {
        await svgElement.screenshot({
          path: outputFile,
          type: extension,
        });
      } else {
        const imageBuffer = await svgElement.screenshot({
          type: extension,
        });
        // imageBuffer should be 'Buffer' type
        if (typeof imageBuffer === 'string'
            || typeof imageBuffer === 'undefined'
           ) {
          throw `invalid image buffer type: ${typeof imageBuffer}`;
        }
        // NOTE: 1 means stdout
        fs.writeFileSync(1, imageBuffer, 'binary');
      }
    } catch (e) {
      console.error(e);
    }
  } else {
    const svgText: string = await page.$eval('#container', container => container.innerHTML);
    if (outputFile) {
      fs.writeFileSync(outputFile, svgText);
    } else {
      console.log(svgText);
    }
  }
  await browser.close();
};

const main = () => {
  program
    .usage('[options] [file]')
    .description('Convert pseudo code to flowchart. If input file is not given, use stdin instead.')
    .option('-o --output-file <file>', `Output file name. (${OUTPUT_EXTENSIONS.join(', ')} are available. If it is not given, output svg text to stdout).`)
    .option('-c --config-file <file>', 'Optional: JSON configuration file for tefcha.')
    .option('-e --extension <extension>', `Optional: specify output format (${OUTPUT_EXTENSIONS.join(', ')})`);

  program.parse(process.argv);
  const inputFile = program.args[0];
  const outputFile = program.outputFile;
  const configFile = program.configFile;

  let extension = program.extension;

  if (inputFile && !fs.existsSync(inputFile)) {
    console.error(chalk.red(`Cannot find input file "${inputFile}"`));
    return;
  }
  if (configFile && !fs.existsSync(configFile)) {
    console.error(chalk.red(`Cannot find config file "${configFile}"`));
    return;
  }

  const src: string = fs.readFileSync(inputFile || 0).toString();

  let config: any = {};

  if (configFile) {
    config = JSON.parse(fs.readFileSync(configFile).toString());
  }

  if (!extension && outputFile) {
    // remove '.' (.svg -> svg)
    extension = path.extname(outputFile).replace(/^\./, '');
  }

  if (!extension) {
    console.error('output extension is not specified');
    return;
  }

  if (!isOutputExtension(extension)) {
    console.error(chalk.red(`extension ${extension} is not supported. ${OUTPUT_EXTENSIONS.join(', ')} are supported.`));
    return;
  }

  if (extension === 'jpg') {
    // for puppeteer
    extension = 'jpeg';
  }
  launch(src, outputFile, extension, config);
}

main();
