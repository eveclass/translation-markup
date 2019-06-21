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

`translation-markup`, is a compiler that takes one or more yaml files (with the translation markup) and output them as `json` or `js` translation files, with the structure you already use in your projects.

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

---> `enUS.js`

```json
{
  "CREDIT_CARD": {
    "NAME": "Credit Card"
  }
};
```

---> `ptBR.js`

```json
{
  "CREDIT_CARD": {
    "NAME": "Cartão de Crédito"
  }
};
```

## Install

**NPM:**

```sh
npm install translation-markup
```

**Yarn:**

```sh
yarn add translation-markup
```

PS: Install it globally if you intend to use the cli.

## Usage with Webpack

If you're looking to use use it with webpack, don't bother installing this lib. Take a look at the **[translation-compiler-loader](todo-link)** for webpack.

## Usage with Node

Import or require

```js
import translationMarkupCompiler from "translation-markup";
```

### Simple usage

Default configs will take `'./**/*.lang.yaml'` [glob pattern](https://github.com/isaacs/node-glob) as input and output them as `json` files to `'./translations'` directory.

```js
translationMarkupCompiler.compile();
```

### Custom input

You may override the input pattern with the `globPath` option:

```js
translationMarkupCompiler.compile({
  globPath: "./**/translations/*.lang.yaml"
});
```

### Custom output path

You may override the output directory with the `outputDirectory` option:

```js
translationMarkupCompiler.compile({
  outputDirectory: "./src/translations"
});
```

### Custom output options

You may override the output type (JS or JSON) and choose to split files per language or output all translations to a single file.

```js
translationMarkupCompiler.compile({
  options: {
    format: "JS", // defaults to JSON
    splitFiles: false, // defaults to true
    outputName: "internationalization" // defaults to translations (name of translation file, applicable only when splitFiles=false)
  }
});
```

#### Using every option

```js
translationMarkupCompiler.compile({
  globPath: "./**/translations/*.lang.yaml",
  outputDirectory: "./src/translations",
  options: {
    format: "JS",
    splitFiles: false,
    outputName: "internationalization"
  }
});
```

### `translationMarkupCompiler.getJSTranslation()`

```
import fs from 'fs';
import translationMarkupCompiler from 'translation-markup';

fs.readFile('./translations.lang.yaml', (err, content) => {

  translationMarkupCompiler.getJSTranslation({
    yamlLangContent: content
  })
  .then((jsTranslationString) => {
    console.log(jsTranslationString);
  });

});
```

### `translationMarkupCompiler.getJSONTranslation()`

```
import fs from 'fs';
import translationMarkupCompiler from 'translation-markup';

fs.readFile('./translations.lang.yaml', (err, content) => {

  translationMarkupCompiler.getJSONTranslation({
    yamlLangContent: content
  })
  .then((jsonTranslationString) => {
    console.log(jsonTranslationString);
  });

});
```
