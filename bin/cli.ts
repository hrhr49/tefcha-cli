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

const launch = async (src: string, outputFile: string, extension: string, config: any) => {
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

  if (outputFile && ['.png', '.jpg', '.jpeg'].includes(extension)) {
    try {
      const svgElement = (await page.$$('svg'))[0];
      await svgElement.screenshot({
        path: outputFile,
        type: {
          '.png': 'png',
          '.jpg': 'jpeg',
          '.jpeg': 'jpeg',
        }[extension],
      });
    } catch(e) {
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
    .option('-o --output-file <file>', 'Output file name. (.svg, .png, .jpg are available. If it is not given, output svg text to stdout).')
    .option('-c --config-file <file>', 'Optional: JSON configuration file for tefcha.')

  program.parse(process.argv);
  const inputFile = program.args[0];
  const outputFile = program.outputFile;
  const configFile = program.configFile;

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

  const extension = path.extname(outputFile);
  const supportedExtensions = ['.svg', '.png', '.jpg', '.jpeg'];

  if (outputFile && !supportedExtensions.includes(extension)) {
    console.error(chalk.red(`extension ${extension} is not supported. ${supportedExtensions.join(', ')} are supported.`));
    return;
  }

  launch(src, outputFile, extension, config);
}

main();
