import * as prettier from 'prettier';
import { FormatOptions } from '../enums/FormatOptions';
import { FileSystemWrapper } from '../wrappers/FileSystemWrapper';

/**
 * Compiler class receives the translations object array and compiles to js/json files
 */
export class Compiler {
  private readonly fileSystemWrapper: FileSystemWrapper;

  constructor() {
    this.fileSystemWrapper = new FileSystemWrapper();
  }

  public async compileTranslations({
    fileTranslations,
    outputDirectory,
    splitFiles,
    format
  }: {
    fileTranslations: object[];
    outputDirectory: string;
    splitFiles: boolean;
    format: FormatOptions;
  }): Promise<void> {
    if (splitFiles) {
      await this.compileToMultipleFiles({
        fileTranslations,
        outputDirectory,
        format
      });
    } else {
      await this.compileToSingleFile({
        fileTranslations,
        outputDirectory,
        format
      });
    }
  }

  private async compileToMultipleFiles({
    fileTranslations,
    outputDirectory,
    format
  }: {
    fileTranslations: object[];
    outputDirectory: string;
    format: FormatOptions;
  }): Promise<void> {
    await Promise.all(
      fileTranslations.map((fileTranslation: object) => {
        const languageKey = Object.keys(fileTranslation)[0];

        let fileExtension = 'json';
        let content = `${JSON.stringify(
          fileTranslation[languageKey],
          undefined,
          '\t'
        )}`;

        if (format === FormatOptions.JS) {
          fileExtension = 'js';
          content = `module.exports = ${content}`;
          content = prettier.format(content, {
            parser: 'babel',
            singleQuote: false,
            trailingComma: 'none'
          });
        }

        return this.fileSystemWrapper.writeFileAsync({
          filePath: `${outputDirectory}/${languageKey}.${fileExtension}`,
          content
        });
      })
    );
  }

  private async compileToSingleFile({
    fileTranslations,
    outputDirectory,
    format
  }: {
    fileTranslations: object[];
    outputDirectory: string;
    format: FormatOptions;
  }): Promise<void> {
    const translationResult = {};
    fileTranslations.forEach((fileTranslation: object) => {
      const languageKey = Object.keys(fileTranslation)[0];
      translationResult[languageKey] = {
        ...fileTranslation[languageKey]
      };
    });

    let fileExtension = 'json';
    let content = `${JSON.stringify(translationResult, undefined, '\t')}`;

    if (format === FormatOptions.JS) {
      fileExtension = 'js';
      content = `module.exports = ${content}`;
      content = prettier.format(content, {
        parser: 'babel',
        singleQuote: false,
        trailingComma: 'none'
      });
    }

    await this.fileSystemWrapper.writeFileAsync({
      filePath: `${outputDirectory}/translations.${fileExtension}`,
      content
    });
  }
}
