#!/usr/bin/env node
import {
  parseArgs,
  main,
} from './main';

(async () => {
  try {
    const args = parseArgs();
    await main(args);
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
    // throw e;
  }
})();
