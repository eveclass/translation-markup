import { FormatOptions } from '../enums/FormatOptions';
/**
 * Compiler class receives the translations object array and compiles to js/json files
 */
export declare class Compiler {
    private readonly fileSystemWrapper;
    constructor();
    /**
     * Compile the translations array to a file
     * @param filesTranslations Array of translations objects
     * @param outputDirectory The directory to output the translation files
     * @param splitFiles Generate translations in one or multiple files
     * @param format Generate translations in JS or JSON
     */
    compileTranslations({ filesTranslations, outputDirectory, splitFiles, format, outputName }: {
        filesTranslations: object[];
        outputDirectory: string;
        splitFiles: boolean;
        format: FormatOptions;
        outputName: string;
    }): Promise<void>;
    private compileToMultipleFiles;
    private compileToSingleFile;
}
