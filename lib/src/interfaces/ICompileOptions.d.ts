import { FormatOptions } from '../enums/FormatOptions';
/**
 * Interface representing the compiler options.
 */
export interface ICompileOptions {
    /**
     * The format of the output files. Either 'JS' (for JavaScript) or 'JSON'.
     */
    format?: FormatOptions;
    /**
     * Whether to split different languages across multiple files.
     */
    splitFiles?: boolean;
    /**
     * Name of the output file, without the file extension.
     * If splitFiles is true, this option is silently ignored.
     */
    outputName?: string;
}
