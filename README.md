# Tefcha
CLI tool of "Tefcha".
Convert text to flowchart.

## See

[Tefcha](https://github.com/hrhr49/tefcha)

## Installation

```
npm install tefcha-cli
```

## Usage

```
Usage: tefcha [options] [file]

Convert pseudo code to flowchart. If input file is not given, use stdin instead.

Options:
  -V, --version               output the version number
  -o --output-file <file>     Output file name. (svg, png, jpg, jpeg are
                              available. If it is not given, output svg text to
                              stdout).
  -c --config-file <file>     Optional: JSON configuration file for tefcha.
  -e --extension <extension>  Optional: specify output format (svg, png, jpg,
                              jpeg)
  -d --disable-browser        Optional: browser(pupeteer) is not used. NOTE: If
                              output is SVG, text is converted to <path> tag.
  -f --font-file <file>       Optional: path of font file (wof, otf, ttf).
                              NOTE: this option is available if
                              --disable-browser option is specified.
  -h, --help                  display help for command
```


## Author

hrhr49

hiro49410@gmail.com

## License
MIT

