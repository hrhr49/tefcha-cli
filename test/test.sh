#!/usr/bin/env bash

set -ux

# change directory to the location of this script
cd "$(dirname "$0")" || exit

# goto repository root directory
cd ..

mkdir -p tmp/

node bin/cli.js test/sample-input.txt > /dev/null \
&& node bin/cli.js -o tmp/output.svg test/sample-input.txt \
&& node bin/cli.js -o tmp/output.png test/sample-input.txt \
&& node bin/cli.js -o tmp/output.jpg test/sample-input.txt \
&& node bin/cli.js -o tmp/output.jpeg test/sample-input.txt 

if [ "$?" -ne 0 ]; then
  echo 'failed'
  exit 1
fi

if [[ "$(file tmp/output.svg)" =~ .*SVG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output.png)" =~ .*PNG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output.jpg)" =~ .*JPEG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output.jpeg)" =~ .*JPEG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi

node bin/cli.js test/sample-input.txt > tmp/output-from-stdout.svg \
&& node bin/cli.js -e svg test/sample-input.txt > tmp/output2-from-stdout.svg \
&& node bin/cli.js -e png test/sample-input.txt > tmp/output-from-stdout.png \
&& node bin/cli.js -e jpg test/sample-input.txt > tmp/output-from-stdout.jpg \
&& node bin/cli.js -e jpeg test/sample-input.txt > tmp/output-from-stdout.jpeg

if [ "$?" -ne 0 ]; then
  echo 'failed'
  exit 1
fi

if [[ "$(file tmp/output-from-stdout.svg)" =~ .*SVG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output2-from-stdout.svg)" =~ .*SVG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output-from-stdout.png)" =~ .*PNG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output-from-stdout.jpg)" =~ .*JPEG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi
if [[ "$(file tmp/output-from-stdout.jpeg)" =~ .*JPEG.* ]]; then
  echo 'ok'
else
  echo 'faild'
  exit 1
fi

node bin/cli.js --disable-browser -o tmp/output-tmp.svg test/sample-input.txt \
&& node bin/cli.js --disable-browser --font-file fonts/Noto/NotoSansCJKjp-Regular.otf -o tmp/output-tmp.svg test/sample-input.txt
if [ "$?" -ne 0 ]; then
  echo 'failed'
  exit 1
fi
