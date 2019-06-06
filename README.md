# Translate-Compile

This is a JS/TS lib designed to transform YAML translation files into JS or JSON to be used translation libs, faciliting the process of translation.

A YAML translation file begins with the declaration of all supported languages of your application. A custom numeric code (key) must be assigned to each one of the declared languages. Then, you declare each translation, based on the initial languages index.

## Getting Started

### Install

TODO: npm etc etc

## Examples

### Compile to single JS file.

YAML File:

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

### Compile to multiple JS files.

YAML File:

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

enUS.js

```
module.exports = {
  CREDIT_CARD: {
    NAME: "Credit Card"
  }
};
```

ptBR.js

```
module.exports = {
  CREDIT_CARD: {
    NAME: "Cartão de Crédito"
  }
};

```

### Compile to single JSON file

YAML File:

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

translations.json

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

YAML File:

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

enUS.json

```
{
	"CREDIT_CARD": {
		"NAME": "Credit Card"
	}
}
```

ptBR.json

```
{
	"CREDIT_CARD": {
		"NAME": "Cartão de Crédito"
	}
}
```

### Same translation for multiple languages

If you have the same translation for more than one language, you can separate their indexes by `_` in the translation key so you don't have to repeat it.

YAML file:

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

## API Reference

This lib exposes three classes to assist you in the YAML to JS/JSON translation.

## Classes

### Engine

#### `engine.yamlCompileToFiles([options])`

Does the full YAML to JS/JSON files compilation.

- options `<object>`
  - globPath `<string>` [Glob](https://www.npmjs.com/package/glob) style path where to find the yaml files. **Default**: './\*_/_.yaml'
  - outputDirectory `<string>` Directory to output the translations. **Default**: './translations'
  - options `<ICompileOptions>` Compile options. **Default**: `{ format: FormatOptions.JSON, slitFiles: true, outputName: 'translations'}`
- **Returns**: `Promise<void>`

#### `engine.getJSTranslationsString(input)`

Receives the translations array of objects and transforms into a JS string.

- input `<object>`
  - fileTranslations `<object[]>` Array of translations objects.
- **Returns**: `<string>` Returns a string with the all the traslations and a 'module.exports = ' in the beggining to be used for export.

#### `engine.getJSONTranslationsString(input)`

Receives the translations array of objects and transforms into a JSON string.

- input `<object>`
  - fileTranslations `<object[]>` Array of translations objects.
- **Returns**: `<string>` Returns a string with all the traslations in a JSON format.

### Translator

##### `translator.generateYamlFileTranslationsArray(yamlData)`

Does the actual YAML to JS translation.

- yamlData `<{filePath: string} | {fileContent: string}>` Object containing the yaml filePath or yaml fileContent, if you provide both, the fileContent will always take precedent.
- **Returns** `Promise<object[]>` Returns a array of JS objects containing the translations obtained from the YAML file or YAML content.

### Compiler

#### `compiler.compileTranslations(options)`

Receives the translations array of objects and compiles to files.

- options `<object>`
  - fileTranslations `<object[]>` Array of translations objects.
  - outputDirectory `<string>` Directory to output the translations.
  - splitFiles `<boolean>` Generate translations into one or multiple files.
  - format `<FormatOptions>` Generate translations in JS or JSON.
- **Returns**: `Promise<void>`

## Interfaces

### ICompileOptions

    interface ICompileOptions {
      /**
       * The format of the output files. Either 'JS' (for JavaScript) or 'JSON'.
       */
      format?: FormatOptions;
      /**
       * Whether to split different languages across multiple files.
       */
      splitFiles?: boolean;
      /**
       * Name of the output file, without the file extension.
       * If splitFiles is true, this option is silently ignored.
       */
      outputName?: string;
     }

## Enums

### FormatOptions

```
enum FormatOptions {
  JSON = 'JSON',
  JS = 'JS'
}
```
