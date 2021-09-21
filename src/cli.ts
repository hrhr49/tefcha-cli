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
    if (process.env.NODE_ENV === 'develop') {
      console.error(e);
    } else {
      console.error(typeof e === 'string' ? e : e.message);
    }
    process.exitCode = 1;
    // throw e;
  }
})();
