import {Command} from 'commander'
import * as fs from 'fs'
import * as path from 'path'
import * as opentype from 'opentype.js'

import {
  Config,
  defaultConfig,
} from 'tefcha'

import {
  PuppeteerRenderer
} from './puppeteer-renderer'
import {
  OpenTypeSharpRenderer
} from './opentype-sharp-renderer'
import {
  OUTPUT_EXTENSIONS,
  isOutputExtension,
} from './common'

const {
  version
} = require('../package.json');

const FONT_FILE = 'NotoSansCJKjp-Regular.otf';
const DEFAULT_FONT_PATH: string = path.join(
  process.env.NODE_ENV === 'develop'
  ? `${__dirname}/../bin`
  : __dirname,
  FONT_FILE
);

interface CommandArguments {
  inputFile?: string;
  outputFile?: string;
  configFile?: string;
  extension?: string;
  disableBrowser?: boolean;
  fontFile?: string;
};

const parseArgs = (argv=process.argv): CommandArguments => {
  const program = new Command();
  program
    .version(version)
    .usage('[options] [file]')
    .description('Convert pseudo code to flowchart. If input file is not given, use stdin instead.')

    .option('-o --output-file <file>', `Output file name. (${OUTPUT_EXTENSIONS.join(', ')} are available. If it is not given, output svg text to stdout).`)
    .option('-c --config-file <file>', 'Optional: JSON configuration file for tefcha.')
    .option('-e --extension <extension>', `Optional: specify output format (${OUTPUT_EXTENSIONS.join(', ')})`)
    .option('-d --disable-browser', `Optional: browser(pupeteer) is not used. NOTE: If output is SVG, text is converted to <path> tag.`)
    .option('-f --font-file <file>', `Optional: path of font file (wof, otf, ttf). NOTE: this option is available if --disable-browser option is specified.`);
  program.parse(argv);

  return {
    inputFile: program.args[0],
    outputFile: program.outputFile,
    configFile: program.configFile,
    extension: program.extension,
    disableBrowser: program.disableBrowser,
    fontFile: program.fontFile,
  };
};

const main = async ({
  inputFile,
  outputFile,
  configFile,
  extension: rawExtension,
  disableBrowser,
  fontFile,
}: CommandArguments): Promise<Buffer> => {
  if (inputFile && !fs.existsSync(inputFile)) {
    throw `Cannot find input file "${inputFile}"`;
  }
  if (configFile && !fs.existsSync(configFile)) {
    throw `Cannot find config file "${configFile}"`;
  }
  if (fontFile && !fs.existsSync(fontFile)) {
    throw `Cannot find font file "${fontFile}"`;
  }
  if (fontFile && !disableBrowser) {
    throw `-f or --font-file option is available if --disable-browser option is specified.`;
  }

  // NOTE: input file '0' means stdin.
  const src: string = fs.readFileSync(inputFile || 0).toString();
  const config: Config = configFile 
    ? JSON.parse(fs.readFileSync(configFile).toString())
    : defaultConfig;

  const extension = rawExtension
    || (outputFile && path.extname(outputFile).replace(/^\./, '')) // remove '.' (.svg -> svg)
    || 'svg'; // use default extension 'svg'

  if (!isOutputExtension(extension)) {
    throw `extension ${extension} is not supported. ${OUTPUT_EXTENSIONS.join(', ')} are supported.`;
  }

  const renderer = disableBrowser 
    ? new OpenTypeSharpRenderer({src, config, font: opentype.loadSync(fontFile || DEFAULT_FONT_PATH)})
    : new PuppeteerRenderer({src, config});

  let resultBuffer: Buffer;
  switch (extension) {
    case 'svg': {
      resultBuffer = await renderer.renderSvg();
      break;
    }
    case 'png': {
      resultBuffer = await renderer.renderPng();
      break;
    }
    case 'jpg': {
      resultBuffer = await renderer.renderJpeg();
      break;
    }
    case 'jpeg': {
      resultBuffer = await renderer.renderJpeg();
      break;
    }
    default: {
      const _: never = extension;
      throw `invalid extension: ${_}`;
    }
  }

  // NOTE: output file '1' means stdout.
  fs.writeFileSync(outputFile || 1, resultBuffer, 'binary');
  return resultBuffer;
}

export {
  CommandArguments,
  parseArgs,
  main,
  DEFAULT_FONT_PATH,
};
