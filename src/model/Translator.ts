import * as flat from 'flat';
import * as jsYaml from 'js-yaml';
import { FileSystemWrapper } from '../wrappers/FileSystemWrapper';

/**
 * Translator class does the yaml -> json translation
 */
export class Translator {
  private readonly fileSystemWrapper: FileSystemWrapper;

  constructor() {
    this.fileSystemWrapper = new FileSystemWrapper();
  }

  public async generateYamlFileTranslationsArray({
    filePath
  }: {
    filePath: string;
  }): Promise<object[]> {
    const yamlContent = await this.fileSystemWrapper.readAsync({ filePath });

    const languagesResults = this.getLanguageResultArrayFromYamlContent({
      yamlContent
    });

    return languagesResults;
  }

  private getLanguageResultArrayFromYamlContent({
    yamlContent
  }: {
    yamlContent: string;
  }): object[] {
    //Transform yamlContent into 2 objects
    const { LANGUAGES: languages, ...yamlObject } = jsYaml.safeLoad(
      yamlContent
    );

    //flaten yamlObject
    const flatYamlObject = flat(yamlObject);

    //Get every possible flat yaml object key in a array
    const objectKeys = Object.keys(flatYamlObject);

    //Save every language translation object in a array
    const result: object[] = Object.keys(languages).map((key: string) => {
      //Get every key that contains this language translation
      const languageKeys = objectKeys.filter((objKey: string) =>
        objKey.includes(key)
      );

      //Save every language result and ajust the key removing the number and adding the language
      const languageResult = {};
      languageKeys.forEach((languageKey: string) => {
        //Remove key number and add language
        const resultLanguageKey = `${languages[key]}.${languageKey.slice(
          0,
          languageKey.lastIndexOf('.')
        )}`;

        //save result object
        languageResult[resultLanguageKey] = flatYamlObject[languageKey];
      });

      //apeend unflattened languageResult to result array
      return flat.unflatten(languageResult);
    });

    return result;
  }
}
