import { FormatOptions } from '../enums/FormatOptions';
export declare class Compiler {
    private readonly fileSystemWrapper;
    constructor();
    compileTranslations({ fileTranslations, outputDirectory, splitFiles, format }: {
        fileTranslations: object[];
        outputDirectory: string;
        splitFiles: boolean;
        format: FormatOptions;
    }): Promise<void>;
    private compileToMultipleFiles;
    private compileToSingleFile;
}
