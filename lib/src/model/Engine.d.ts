import { ICompileOptions } from '../interfaces/ICompileOptions';
/**
 * Engine translator class
 */
export declare class Engine {
    private readonly glob;
    private readonly compiler;
    private readonly translator;
    constructor();
    /**
     * Transform a translations array in a js string
     * @param fileTranslations Array of translations objects
     */
    getJSTranslation({ yamlLangContent }: {
        yamlLangContent: string;
    }): Promise<string>;
    /**
     * Transform a translations array in a json string
     * @param fileTranslations Array of translations objects
     */
    getJSONTranslation({ yamlLangContent }: {
        yamlLangContent: string;
    }): Promise<string>;
    /**
     * @method yamlCompile Does the actual yaml to js/json translation
     * @param globAsync Glob style path where to find the yaml files
     * @param outputDirectory Directory to output the translations
     * @param options Compile options
     */
    compile({ globPath, outputDirectory, options }?: {
        globPath?: string;
        outputDirectory?: string;
        options?: ICompileOptions;
    }): Promise<void>;
    private cleanOutputDir;
}
