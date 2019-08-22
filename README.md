# Translation Markup

Write faster and more maintainable translations.

Writing JSON based translations? Managing multiple files, adding keys everywhere, that’s boring.. that’s harsh! You shouldn’t have to do that. You won’t, not anymore! **Meet Translation Markup.**

## Features

**🔑 One translation key**
No more searching across files for the right spot and keys. All languages translations resides in the same and only key declaration.

**🚀 No JSON boilerplate**
No more braces and quotes, type translations faster with YAML.

**⚡️ Combine Keys**
There are often cases which a key translates equally among languages. For those, type the value just once.

**❤️ Multiple translation files**
Stop organizing files by language and start organizing them by feature, module or the way you see fit.

![translation markup usage example](/assets/example.png)

## Getting Started

`translation-markup` is a compiler that takes one or more yaml files (with the translation markup) and output them as `json` or `js` translation files, with the same structure you already use in your projects.

Take this simple example:

**Input:** `translations.lang.yaml`

```yaml
LANGUAGES:
  1: enUS
  2: ptBR

CREDIT_CARD:
  NAME:
    1: Credit Card
    2: Cartão de Crédito
```

**Output:** 2 Files

---> `enUS.json`

```json
{
  "CREDIT_CARD": {
    "NAME": "Credit Card"
  }
};
```

---> `ptBR.json`

```json
{
  "CREDIT_CARD": {
    "NAME": "Cartão de Crédito"
  }
};
```

Do you want more output examples of what you can be achieved? Take a look at **[more ouput examples](output-examples.md)**.

### Languages Key

At the top of each translation file should be defined the `LANGUAGES` key, with all languages mapping. In the example above `1: enUs` maps number `1` as language `enUS` and number `2` as `ptBR`.

Resulting files respect these mappings. In this case, 2 files would be output: `enUs.json` and `ptBr.json`.

## Install

**NPM:**

```sh
npm install @shiftcode/translation-markup
```

**Yarn:**

```sh
yarn add @shiftcode/translation-markup
```

PS: Install it globally if you intend to use the cli.

## Usage with Webpack

If you're looking to use use it with webpack, don't bother installing this lib. Take a look at the **[translation-compiler-loader](https://github.com/shift-code/translation-markup-loader)** for webpack.

## Usage with Node

Import or require

```js
import translationMarkup from "@shiftcode/translation-markup";
```

### Simple usage

Default configs will take `'./**/*.lang.yaml'` [glob pattern](https://github.com/isaacs/node-glob) as input and output them as `json` files to `'./translations'` directory.

```js
translationMarkup.compile();
```

### Custom input

You may override the input pattern with the `globPath` option:

```js
translationMarkup.compile({
  globPath: "./**/translations/*.lang.yaml"
});
```

### Custom output path

You may override the output directory with the `outputDirectory` option:

```js
translationMarkup.compile({
  outputDirectory: "./src/translations"
});
```

### Custom output options

You may override the output type (JS, TS or JSON) and choose to split files per language or output all translations to a single file.

```js
translationMarkup.compile({
  options: {
    format: "JS", // JS (module.exports), JS_EXPORT_DEFAULT (export default), TS or JSON
    splitFiles: false,
    outputName: "internationalization"
  }
});
```

### Customize everything

```js
translationMarkup.compile({
  globPath: "./**/translations/*.lang.yaml", // defaults to './**/*.lang.yaml'
  outputDirectory: "./src/translations", // defaults to './translations'
  options: {
    format: "JS", // defaults to 'JSON'
    splitFiles: false, // defaults to true
    outputName: "internationalization" // defaults to 'translations' (name of the single translation file, applicable only when splitFiles=false)
  }
});
```

## API Reference

### -> `compile([{ globPath, outputDirectory, options }])`

Takes a `globPath` as input and output translations files to the `outputDirectory` directory, with given `options` config.

|      Param      |                                Type                                |                              Default                              |                                       Details                                       |
| :-------------: | :----------------------------------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
|    globPath     |                             `<string>`                             |                       `'./**/*.lang.yaml'`                        | [Glob](https://www.npmjs.com/package/glob) style path where to find the yaml files. |
| outputDirectory |                             `<string>`                             |                        `'./translations'`                         |                        Directory to output the translations.                        |
|     options     | `{ format: <string>, splitFiles: <boolean>, outputName: <string>}` | `{ format: 'JSON', splitFiles: true, outputName: 'translations'}` |                           Output type and split options.                            |

**&rarr; Returns: `Promise<void>`**

## CLI

The compiler also contains a **CLI** to generate translations files directly from the terminal. You should install this lib as a global dependency if you intend to use it's CLI:

```sh
npm install -g @shiftcode/translation-markup
```

### CLI Usage

```
# Compiles with the default values
tmc

# Compiles with diferent globPath
tmc --gb './**/translations/*.lang.yaml'

# Compiles with diferent output directory
tmc --outDir './src/translations'

# Compiles with diferent format
tmc --format JS

# Compiles into one file
tmc --spitFiles false

# Compiles with diferent output name
tmc --splitFiles false --outputName test
```

### CLI Options

|            Option             |                                                   Details                                                    |        Default        |
| :---------------------------: | :----------------------------------------------------------------------------------------------------------: | :-------------------: |
|          `--version`          |                                                 Show version                                                 |         -----         |
|      `--gb, --globPath`       |                              Glob style path where to find the yaml lang files                               | `"./\*_/_.lang.yaml"` |
| `--outDir, --outputDirectory` |                                     Directory to output the translations                                     |  `"./translations"`   |
|      `--fmrt, --format`       |                                    Compile output format ("JSON" or "JS")                                    |       `"JSON"`        |
|    `--split, --splitFiles`    |                                 Compile to one file or separate by language                                  |        `true`         |
|   `--outName, --outputName`   | Name of the output file, without the file extension. If splitFiles is true, this option is silently ignored. |   `"translations"`    |
|           `--help`            |                                                  Show help                                                   |         -----         |
