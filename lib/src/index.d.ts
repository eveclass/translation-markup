import { ICompileOptions } from './interfaces/ICompileOptions';
export declare function compile({ globPath, outputDirectory, options }?: {
    globPath?: string;
    outputDirectory?: string;
    options?: ICompileOptions;
}): Promise<void>;
export declare function getJSTranslation({ yamlLangContent }: {
    yamlLangContent: string;
}): Promise<string>;
export declare function getJSONTranslation({ yamlLangContent }: {
    yamlLangContent: string;
}): Promise<string>;
