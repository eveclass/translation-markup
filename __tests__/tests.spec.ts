import { FormatOptions } from '../src/enums/FormatOptions';
import { Compiler } from '../src/model/Compiler';
import { Engine } from '../src/model/Engine';
import { Translator } from '../src/model/Translator';
import { FileSystemWrapper } from '../src/wrappers/FileSystemWrapper';

describe('test the translator class', () => {
  const translator = new Translator();

  test('test generateYamlFileTranslationsArray method', async () => {
    const translationArray = await translator.generateYamlFileTranslationsArray(
      {
        filePath: './__tests__/inputs/test.lang.yaml'
      }
    );

    const expectedArray = [
      {
        enUS: {
          SPAIN: {
            NAME: 'Spain',
            LANGUAGE: 'Spanish'
          },
          CREDIT_CARD: {
            NAME: 'Credit Card',
            FLAG: {
              VISA: 'Visa',
              AMEX: 'American Express',
              DINERS: 'Diners',
              MASTERCARD: 'Mastercard'
            }
          }
        }
      },
      {
        ptBR: {
          SPAIN: {
            NAME: 'Spanien',
            LANGUAGE: 'Spanisch'
          },
          CREDIT_CARD: {
            NAME: 'Cartão de Crédito',
            FLAG: {
              VISA: 'Visa',
              AMEX: 'American Express',
              DINERS: 'Diners',
              MASTERCARD: 'Mastercard'
            }
          }
        }
      },
      {
        esES: {
          SPAIN: {
            NAME: 'España',
            LANGUAGE: 'Español'
          },
          CREDIT_CARD: {
            NAME: 'Tarjeta de Crédito',
            FLAG: {
              VISA: 'Visa',
              AMEX: 'American Express',
              DINERS: 'Diners',
              MASTERCARD: 'Mastercard'
            }
          }
        }
      }
    ];

    expect(translationArray).toEqual(expect.arrayContaining(expectedArray));
  });
});

describe('test the compiler class', () => {
  const compiler = new Compiler();
  const translator = new Translator();
  const fileSystemWrapper = new FileSystemWrapper();

  describe('test compileTranslations method', () => {
    test('format: JSON, splitFiles: false', async () => {
      const translationArray = await translator.generateYamlFileTranslationsArray(
        {
          filePath: './__tests__/inputs/test.lang.yaml'
        }
      );

      await compiler.compileTranslations({
        fileTranslations: translationArray,
        outputDirectory: './__tests__/results',
        format: FormatOptions.JSON,
        splitFiles: false,
        outputName: 'translations'
      });

      const [compiledTranslation, expectedTranslation] = await Promise.all([
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/translations.json'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/translations-expected.json'
        })
      ]);

      expect(JSON.parse(compiledTranslation)).toEqual(
        JSON.parse(expectedTranslation)
      );
    });

    test('format: JSON, splitFiles: true', async () => {
      const translationArray = await translator.generateYamlFileTranslationsArray(
        {
          filePath: './__tests__/inputs/test.lang.yaml'
        }
      );

      await compiler.compileTranslations({
        fileTranslations: translationArray,
        outputDirectory: './__tests__/results',
        format: FormatOptions.JSON,
        splitFiles: true,
        outputName: 'translations'
      });

      const expectedTranslations: string[] = await Promise.all([
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/enUS-expected.json'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/esES-expected.json'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/ptBR-expected.json'
        })
      ]);
      const objectExpectedTranslations: object[] = expectedTranslations.map(
        (translation: string) => JSON.parse(translation)
      );

      const compiledTranslations: string[] = await Promise.all([
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/enUS.json'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/esES.json'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/ptBR.json'
        })
      ]);
      const objectCompiledTranslations: object[] = compiledTranslations.map(
        (translation: string) => JSON.parse(translation)
      );

      objectCompiledTranslations.forEach(
        (translation: object, index: number) => {
          expect(translation).toMatchObject(objectExpectedTranslations[index]);
        }
      );
    });

    test('format: JS, splitFiles: false', async () => {
      const translationArray = await translator.generateYamlFileTranslationsArray(
        {
          filePath: './__tests__/inputs/test.lang.yaml'
        }
      );

      await compiler.compileTranslations({
        fileTranslations: translationArray,
        outputDirectory: './__tests__/results',
        format: FormatOptions.JS,
        splitFiles: false,
        outputName: 'translations'
      });

      const [compiledTranslation, expectedTranslation] = await Promise.all([
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/translations.js'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/translations-expected.js'
        })
      ]);

      const expectedObjectStringTranslation = expectedTranslation.substring(
        17,
        expectedTranslation.length - 2
      );

      const compiledObjectStringTraslation = compiledTranslation.substring(
        17,
        compiledTranslation.length - 2
      );

      expect(expectedObjectStringTranslation).toEqual(
        compiledObjectStringTraslation
      );
    });

    test('format: JS, splitFiles: true', async () => {
      const translationArray = await translator.generateYamlFileTranslationsArray(
        {
          filePath: './__tests__/inputs/test.lang.yaml'
        }
      );

      await compiler.compileTranslations({
        fileTranslations: translationArray,
        outputDirectory: './__tests__/results',
        format: FormatOptions.JS,
        splitFiles: true,
        outputName: 'translations'
      });

      const expectedTranslations: string[] = await Promise.all([
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/enUS-expected.js'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/esES-expected.js'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/expected/ptBR-expected.js'
        })
      ]);

      const compiledTranslations: string[] = await Promise.all([
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/enUS.js'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/esES.js'
        }),
        fileSystemWrapper.readAsync({
          filePath: './__tests__/results/ptBR.js'
        })
      ]);

      compiledTranslations.forEach((translation: string, index: number) => {
        expect(translation.trim()).toMatch(expectedTranslations[index].trim());
      });
    });
  });
});

describe('test the Engine class', () => {
  const engine = new Engine();
  const fileSystemWrapper = new FileSystemWrapper();

  test('test the yamlCompile method', async () => {
    const res = await engine.compile({
      outputDirectory: './__tests__/results'
    });

    expect(res).toBeUndefined();
  });

  test('test the getJSTranslationsString', async () => {
    const yamlContent = await fileSystemWrapper.readAsync({
      filePath: './__tests__/inputs/test.lang.yaml'
    });

    const translationsString = await engine.getJSTranslation({
      yamlLangContent: yamlContent
    });

    const expectedTranslation = await fileSystemWrapper.readAsync({
      filePath: './__tests__/expected/translations-expected.js'
    });

    expect(translationsString).toMatch(expectedTranslation);
  });

  test('test the getJSONTranslationsString', async () => {
    const yamlContent = await fileSystemWrapper.readAsync({
      filePath: './__tests__/inputs/test.lang.yaml'
    });

    const translationsString = await engine.getJSONTranslation({
      yamlLangContent: yamlContent
    });
    const objectTranslation = JSON.parse(translationsString);

    const expectedTranslation = await fileSystemWrapper.readAsync({
      filePath: './__tests__/expected/translations-expected.json'
    });
    const objectExpectedTranslation = JSON.parse(expectedTranslation);

    expect(objectTranslation).toMatchObject(objectExpectedTranslation);
  });
});
