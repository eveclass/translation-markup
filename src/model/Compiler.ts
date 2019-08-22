//const lodashAssign = require('lodash.assign');
import lodashAssign from 'lodash.assign';
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

  /**
   * Compile the translations array to a file
   * @param filesTranslations Array of translations objects
   * @param outputDirectory The directory to output the translation files
   * @param splitFiles Generate translations in one or multiple files
   * @param format Generate translations in JS or JSON
   */
  public async compileTranslations({
    filesTranslations,
    outputDirectory,
    splitFiles,
    format,
    outputName
  }: {
    filesTranslations: object[];
    outputDirectory: string;
    splitFiles: boolean;
    format: FormatOptions;
    outputName: string;
  }): Promise<void> {
    if (splitFiles) {
      await this.compileToMultipleFiles({
        filesTranslations,
        outputDirectory,
        format
      });
    } else {
      await this.compileToSingleFile({
        filesTranslations,
        outputDirectory,
        format,
        outputName
      });
    }
  }

  private async compileToMultipleFiles({
    filesTranslations,
    outputDirectory,
    format
  }: {
    filesTranslations: object[];
    outputDirectory: string;
    format: FormatOptions;
  }): Promise<void> {
    const translationResult = {};
    filesTranslations.forEach((fileTranslation: object) => {
      const languageKey = Object.keys(fileTranslation)[0];

      if (!translationResult[languageKey]) {
        translationResult[languageKey] = {};
      }

      lodashAssign(
        translationResult[languageKey],
        fileTranslation[languageKey]
      );
    });

    const writeFilesPromises = [];

    Object.keys(translationResult).forEach((languageKey: string) => {
      let fileExtension = 'json';
      let content = `${JSON.stringify(
        translationResult[languageKey],
        undefined,
        '\t'
      )}`;

      if (
        format === FormatOptions.JS ||
        format === FormatOptions.JS_EXPORT_DEFAULT ||
        format === FormatOptions.TS
      ) {
        fileExtension = format === FormatOptions.TS ? 'ts' : 'js';
        content =
          format === FormatOptions.JS
            ? `module.exports = ${content}`
            : `export default ${content}`;
        content = prettier.format(content, {
          parser: 'babel',
          singleQuote: false,
          trailingComma: 'none'
        });
      }

      writeFilesPromises.push(
        this.fileSystemWrapper.writeFileAsync({
          filePath: `${outputDirectory}/${languageKey}.${fileExtension}`,
          content
        })
      );
    });

    await Promise.all(writeFilesPromises);
  }

  private async compileToSingleFile({
    filesTranslations,
    outputDirectory,
    format,
    outputName
  }: {
    filesTranslations: object[];
    outputDirectory: string;
    format: FormatOptions;
    outputName: string;
  }): Promise<void> {
    const translationResult = {};
    filesTranslations.forEach((fileTranslation: object) => {
      const languageKey = Object.keys(fileTranslation)[0];

      if (!translationResult[languageKey]) {
        translationResult[languageKey] = {};
      }

      lodashAssign(
        translationResult[languageKey],
        fileTranslation[languageKey]
      );
    });

    let fileExtension = 'json';
    let content = `${JSON.stringify(translationResult, undefined, '\t')}`;

    if (
      format === FormatOptions.JS ||
      format === FormatOptions.JS_EXPORT_DEFAULT ||
      format === FormatOptions.TS
    ) {
      fileExtension = format === FormatOptions.TS ? 'ts' : 'js';
      content =
        format === FormatOptions.JS
          ? `module.exports = ${content}`
          : `export default ${content}`;
      content = prettier.format(content, {
        parser: 'babel',
        singleQuote: false,
        trailingComma: 'none'
      });
    }

    await this.fileSystemWrapper.writeFileAsync({
      filePath: `${outputDirectory}/${outputName}.${fileExtension}`,
      content
    });
  }
}
