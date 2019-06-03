import { FormatOptions } from '@/enums/FormatOptions';
export interface ICompileOptions {
    format?: FormatOptions;
    splitFiles?: boolean;
    outputName?: string;
}
