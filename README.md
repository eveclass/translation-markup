<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Translation-Markup-Compiler](#translation-markup-compiler)
  - [Getting Started](#getting-started)
    - [Install](#install)
  - [Output Examples](#output-examples)
    - [Compile to single JS file.](#compile-to-single-js-file)
    - [Compile to multiple JS files.](#compile-to-multiple-js-files)
    - [Compile to single JSON file](#compile-to-single-json-file)
    - [Compile to multiple JSON file](#compile-to-multiple-json-file)
    - [Same translation for multiple languages](#same-translation-for-multiple-languages)
    - [Multiple translation YAML files](#multiple-translation-yaml-files)
  - [Usage](#usage)
    - [`translationMarkupCompiler.compile()`](#translationmarkupcompilercompile)
      - [Default values.](#default-values)
      - [Using a more specific glob path to find the `.lang.yaml` files.](#using-a-more-specific-glob-path-to-find-the-langyaml-files)
      - [Changing the output directory of the translations file.](#changing-the-output-directory-of-the-translations-file)
      - [Changing the compile options.](#changing-the-compile-options)
      - [Using every option.](#using-every-option)
    - [`translationMarkupCompiler.getJSTranslation()`](#translationmarkupcompilergetjstranslation)
    - [`translationMarkupCompiler.getJSONTranslation()`](#translationmarkupcompilergetjsontranslation)
  - [API Reference](#api-reference)
    - [compile([{ globPath, outputDirectory, options }])](#compile-globpath-outputdirectory-options-)
      - [ICompileOptions](#icompileoptions)
    - [getJSTranslation({ yamlLangContent })](#getjstranslation-yamllangcontent-)
    - [getJSONTranslation({ yamlLangContent })](#getjsontranslation-yamllangcontent-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Translation-Markup-Compiler

This is a JS/TS lib designed to transform YAML translation files into JS or JSON to be used translation libs, faciliting the process of translation.

A YAML translation file is a `.lang.yaml` that begins with the declaration of all supported languages of your application. A custom numeric code (key) must be assigned to each one of the declared languages. Then, you declare each translation, based on the initial languages index.

**Atention** : We view as good pratice to use the `.lang.yaml` extension instead of the `.yaml`. This way you can separate the language files from other `.yaml` files you might be using in you project. This is not required though, just remember to manually specify the `.yaml` extension in the `globPath` property.

## Getting Started

### Install

TODO: npm etc etc

## Output Examples

### Compile to single JS file.

YAML Lang File:

`translations.lang.yaml`

```
LANGUAGES:
  1: enUS
  2: ptBR

CREDIT_CARD:
  NAME:
    1: Credit Card
    2: Cartão de Crédito
```

Compiles to:

`translations.js`

```
module.exports = {
  enUS: {
    CREDIT_CARD: {
      NAME: "Credit Card"
    }
  },
  ptBR: {
    CREDIT_CARD: {
      NAME: "Cartão de Crédito"
    }
  }
};
```

### Compile to multiple JS files

YAML Lang File:

`translations.lang.yaml`

```
LANGUAGES:
  1: enUS
  2: ptBR

CREDIT_CARD:
  NAME:
    1: Credit Card
    2: Cartão de Crédito
```

Compiles to:

`enUS.js`

```
module.exports = {
  CREDIT_CARD: {
    NAME: "Credit Card"
  }
};
```

`ptBR.js`

```
module.exports = {
  CREDIT_CARD: {
    NAME: "Cartão de Crédito"
  }
};

```

### Compile to single JSON file

YAML Lang File:

`translations.lang.yaml`

```
LANGUAGES:
  1: enUS
  2: ptBR

CREDIT_CARD:
  NAME:
    1: Credit Card
    2: Cartão de Crédito
```

Compiles to:

`translations.json`

```
{
	"enUS": {
		"CREDIT_CARD": {
			"NAME": "Credit Card"
		}
	},
	"ptBR": {
		"CREDIT_CARD": {
			"NAME": "Cartão de Crédito"
		}
	}
}
```

### Compile to multiple JSON file

YAML Lang File:

`translations.lang.yaml`

```
LANGUAGES:
  1: enUS
  2: ptBR

CREDIT_CARD:
  NAME:
    1: Credit Card
    2: Cartão de Crédito
```

Compiles to

`enUS.json`

```
{
	"CREDIT_CARD": {
		"NAME": "Credit Card"
	}
}
```

`ptBR.json`

```
{
	"CREDIT_CARD": {
		"NAME": "Cartão de Crédito"
	}
}
```

### Same translation for multiple languages

If you have the same translation for more than one language, you can separate their indexes by `_` in the translation key so you don't have to repeat it.

YAML Lang File:

`translations.lang.yaml`

```
LANGUAGES:
  1: enUS
  2: ptBR
  3: esES

CREDIT_CARD:
  NAME:
    1: Credit Card
    2: Cartão de Crédito
    3: Tarjeta de Crédito
  FLAG:
    VISA:
      1_2_3: Visa
    MASTERCARD:
      1_2_3: Mastercard
    AMEX:
      1_2_3: American Express
    DINERS:
      1_2_3: Diners
```

Compiles to (if compiling to single file JS):

`translations.js`

```
module.exports = {
  enUS: {
    CREDIT_CARD: {
      NAME: "Credit Card",
      FLAG: {
        VISA: "Visa",
        AMEX: "American Express",
        DINERS: "Diners",
        MASTERCARD: "Mastercard"
      }
    }
  },
  ptBR: {
    CREDIT_CARD: {
      NAME: "Cartão de Crédito",
      FLAG: {
        VISA: "Visa",
        AMEX: "American Express",
        DINERS: "Diners",
        MASTERCARD: "Mastercard"
      }
    }
  },
  esES: {
    CREDIT_CARD: {
      NAME: "Tarjeta de Crédito",
      FLAG: {
        VISA: "Visa",
        AMEX: "American Express",
        DINERS: "Diners",
        MASTERCARD: "Mastercard"
      }
    }
  }
};

```

### Multiple translation YAML files

If you have more than on `.lang.yaml` file in your project, the `compile()` method will translate the last one that it finds.

## Usage

### `translationMarkupCompiler.compile()`

#### Default values

```
import translationMarkupCompiler from 'translation-markup-compiler';

translationMarkupCompiler.compile();
```

#### Using a more specific glob path to find the `.lang.yaml` files

```
import translationMarkupCompiler from 'translation-markup-compiler';

translationMarkupCompiler.compile({
  globPath: './**/translations/*.lang.yaml'
});
```

#### Changing the output directory of the translations file

```
import translationMarkupCompiler from 'translation-markup-compiler';

translationMarkupCompiler.compile({
  outputDirectory: './src/translations'
});
```

#### Changing the compile options

```
import translationMarkupCompiler from 'translation-markup-compiler';

translationMarkupCompiler.compile({
 options: {
   format: 'JS',
   splitFiles: false,
   outputName: 'internationalization'
 }
});
```

#### Using every option

```
import translationMarkupCompiler from 'translation-markup-compiler';

translationMarkupCompiler.compile({
  globPath: './**/translations/*.lang.yaml',
  outputDirectory: './src/translations',
  options: {
   format: 'JS',
   splitFiles: false,
   outputName: 'internationalization'
 }
});
```

### `translationMarkupCompiler.getJSTranslation()`

```
import fs from 'fs';
import translationMarkupCompiler from 'translation-markup-compiler';

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
import translationMarkupCompiler from 'translation-markup-compiler';

fs.readFile('./translations.lang.yaml', (err, content) => {

  translationMarkupCompiler.getJSONTranslation({
    yamlLangContent: content
  })
  .then((jsonTranslationString) => {
    console.log(jsonTranslationString);
  });

});
```

## API Reference

This lib exposes three classes to assist you in the YAML to JS/JSON translation.

### compile([{ globPath, outputDirectory, options }])

Does the full YAML to JS/JSON file(s) compilation.

|      Param      |        Type         |                             Default                              |                                       Details                                       |
| :-------------: | :-----------------: | :--------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
|    globPath     |     `<string>`      |                       `'./**/*.lang.yaml'`                       | [Glob](https://www.npmjs.com/package/glob) style path where to find the yaml files. |
| outputDirectory |     `<string>`      |                        `'./translations'`                        |                        Directory to output the translations.                        |
|     options     | `<ICompileOptions>` | `{ format: 'JSON', slitFiles: true, outputName: 'translations'}` |                                  Compile options.                                   |

&rarr; Returns: `Promise<void>`

#### ICompileOptions

|   Param    |    Type     |     Default      |                                                   Details                                                    |
| :--------: | :---------: | :--------------: | :----------------------------------------------------------------------------------------------------------: |
|   format   | `<string>`  |     `'JSON'`     |                              Format of the output file, accepts 'JS' or 'JSON'.                              |
| splitFiles | `<boolean>` |      `true`      |                           Whether to compile translation in one or multiple files.                           |
| outputName | `<string>`  | `'translations'` | Name of the output file, without the file extension. If splitFiles is true, this option is silently ignored. |

### getJSTranslation({ yamlLangContent })

Return the JS style translation string base on the YAML lang file content.

|      Param      |    Type    |            Details             |
| :-------------: | :--------: | :----------------------------: |
| yamlLangContent | `<string>` | YAML lang file content string. |

&rarr; Returns: `Promise<string>`

### getJSONTranslation({ yamlLangContent })

Return the JSON style translation string base on the YAML lang file content.

|      Param      |    Type    |            Details             |
| :-------------: | :--------: | :----------------------------: |
| yamlLangContent | `<string>` | YAML lang file content string. |

&rarr; Returns: `Promise<string>`
