import {
  parseArgs,
  CommandArguments,
  main,
} from '../src/main';
import {
  OUTPUT_EXTENSIONS,
} from '../src/common';

import FileType from 'file-type';

const SAMPLE_INPUT_FILE = 'test/sample-input.txt';
const SAMPLE_INPUT_INVALID_FILE = 'test/sample-input-invalid.txt';
const SAMPLE_CONFIG_FILE = 'test/sample-config.json';
const SAMPLE_CONFIG_INVALID_FILE = 'test/sample-config-invalid.json';
const VALID_ARGS: CommandArguments = {
  inputFile: SAMPLE_INPUT_FILE,
  configFile: SAMPLE_CONFIG_FILE,
};

///////////////////////////////////////
// positive
///////////////////////////////////////
test('cli argument parser', () => {
  expect(parseArgs(['', '', 'hoge']).inputFile).toEqual('hoge');
  expect(parseArgs(['', '', '--output-file', 'hoge']).outputFile).toEqual('hoge');
  expect(parseArgs(['', '', '-o', 'hoge']).outputFile).toBe('hoge');
  expect(parseArgs(['', '', '--config-file', 'hoge']).configFile).toEqual('hoge');
  expect(parseArgs(['', '', '-c', 'hoge']).configFile).toBe('hoge');
  expect(parseArgs(['', '', '--extension', 'hoge']).extension).toEqual('hoge');
  expect(parseArgs(['', '', '-e', 'hoge']).extension).toBe('hoge');
  expect(parseArgs(['', '', '--disable-browser']).disableBrowser).toBe(true);
  expect(parseArgs(['', '', '-d']).disableBrowser).toBe(true);
});

test('no extension -> output SVG', () => {
  return expect(
    main({
      ...VALID_ARGS,
    }).then((r) => r.toString())
  ).resolves.toMatch(/^<svg.*/);
});

test('"extension" have higher priority than "outputFile"', () => {
  return expect(
    main({
      ...VALID_ARGS,
      outputFile: 'tmp/output-actual-svg.png',
      extension: 'svg',
    }).then((r) => r.toString())
  ).resolves.toMatch(/^<svg.*/);
});

test('supported extension', () => {
  [false, true].forEach((disableBrowser) => {
    OUTPUT_EXTENSIONS.forEach((extension) => {
      const expected = {
        'svg': 'image/svg+xml',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
      }[extension];
      return expect((async () => {
        const buf = await main({
          ...VALID_ARGS,
          extension,
          outputFile: `tmp/output-disableBrowser-${disableBrowser}.${extension}`,
          disableBrowser,
        });
        if (extension === 'svg') {
          if (/^<svg.*/.test(buf.toString())) {
            return 'image/svg+xml';
          } else {
            throw 'invalid svg';
          }
        } else {
          return ((await FileType.fromBuffer(buf)) as any).mime;
        }
      })()).resolves.toMatch(expected);
    });
  });
});


///////////////////////////////////////
// negative
///////////////////////////////////////
test('not existsing input file', () => {
  return expect(
    main({
      ...VALID_ARGS,
      inputFile: './not-existsing-file',
    })
  ).rejects.toMatch('Cannot find input file "./not-existsing-file"');
});

test('invalid input file (pupeteer)', () => {
  return expect(
    main({
      ...VALID_ARGS,
      inputFile: SAMPLE_INPUT_INVALID_FILE,
    })
  ).rejects.toMatch('unexpected indent');
});

test('invalid input file (no pupeteer)', () => {
  // NOTE: in case of no pupeteer, TefchaError will be thrown
  return expect(
    main({
      ...VALID_ARGS,
      disableBrowser: true,
      inputFile: SAMPLE_INPUT_INVALID_FILE,
    })
  ).rejects.toMatchObject({
    msg: 'unexpected indent'
  });
});

test('not existsing config file', () => {
  return expect(
    main({
      ...VALID_ARGS,
      configFile: './not-existsing-file',
    })
  ).rejects.toMatch('Cannot find config file "./not-existsing-file"');
});

test('invalid config file', () => {
  return expect(
    main({
      ...VALID_ARGS,
      configFile: SAMPLE_CONFIG_INVALID_FILE,
    })
  ).rejects.toEqual(expect.any(SyntaxError)); // JSON parse error
});

test('not supported extension', () => {
  return expect(
    main({
      ...VALID_ARGS,
      extension: 'hoge',
    })
  ).rejects.toMatch('hoge is not supported.');
});

