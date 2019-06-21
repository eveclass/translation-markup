# Output Examples

## Compile to single JS file.

YAML Lang File:

`translations.lang.yaml`

```yaml
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

```js
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

## Compile to multiple JS files

YAML Lang File:

`translations.lang.yaml`

```yaml
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

```js
module.exports = {
  CREDIT_CARD: {
    NAME: "Credit Card"
  }
};
```

`ptBR.js`

```js
module.exports = {
  CREDIT_CARD: {
    NAME: "Cartão de Crédito"
  }
};
```

## Compile to single JSON file

YAML Lang File:

`translations.lang.yaml`

```yaml
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

```json
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

## Compile to multiple JSON file

YAML Lang File:

`translations.lang.yaml`

```yaml
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

```json
{
  "CREDIT_CARD": {
    "NAME": "Credit Card"
  }
}
```

`ptBR.json`

```json
{
  "CREDIT_CARD": {
    "NAME": "Cartão de Crédito"
  }
}
```

## Same translation for multiple languages

If you have the same translation for more than one language, you can separate their indexes by `_` in the translation key so you don't have to repeat it.

YAML Lang File:

`translations.lang.yaml`

```yaml
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

```js
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
