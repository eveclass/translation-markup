import { ICompileOptions } from '../interfaces/ICompileOptions';
export declare class Engine {
    private glob;
    private compiler;
    private translator;
    constructor();
    yamlCompile({ globPath, outputDirectory, options }?: {
        globPath?: string;
        outputDirectory?: string;
        options?: ICompileOptions;
    }): Promise<boolean>;
    private cleanOutputDir;
}
