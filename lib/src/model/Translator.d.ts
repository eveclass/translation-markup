export declare class Translator {
    private readonly fileSystemWrapper;
    constructor();
    generateYamlFileTranslationsArray({ filePath }: {
        filePath: string;
    }): Promise<object[]>;
    private getLanguageResultArrayFromYamlContent;
}
