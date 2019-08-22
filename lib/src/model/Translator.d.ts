/**
 * Translator class does the yaml -> json translation
 */
export declare class Translator {
    private readonly fileSystemWrapper;
    constructor();
    /**
     * Generates a translation array from yaml file
     * @method generateYamlFileTranslationsArray
     * @param  yamlData object containing yaml filePath or yaml fileContent, if you provide both, the fileContent will always take precedent
     */
    generateYamlFileTranslationsArray(yamlData: {
        filePath: string;
    } | {
        fileContent: string;
    }): Promise<object[]>;
    private getLanguageResultArrayFromYamlContent;
}
