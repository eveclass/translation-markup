"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//const lodashAssign = require('lodash.assign');
const lodash_assign_1 = tslib_1.__importDefault(require("lodash.assign"));
const prettier = tslib_1.__importStar(require("prettier"));
const FormatOptions_1 = require("../enums/FormatOptions");
const FileSystemWrapper_1 = require("../wrappers/FileSystemWrapper");
/**
 * Compiler class receives the translations object array and compiles to js/json files
 */
class Compiler {
    constructor() {
        this.fileSystemWrapper = new FileSystemWrapper_1.FileSystemWrapper();
    }
    /**
     * Compile the translations array to a file
     * @param filesTranslations Array of translations objects
     * @param outputDirectory The directory to output the translation files
     * @param splitFiles Generate translations in one or multiple files
     * @param format Generate translations in JS or JSON
     */
    compileTranslations({ filesTranslations, outputDirectory, splitFiles, format, outputName }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (splitFiles) {
                yield this.compileToMultipleFiles({
                    filesTranslations,
                    outputDirectory,
                    format
                });
            }
            else {
                yield this.compileToSingleFile({
                    filesTranslations,
                    outputDirectory,
                    format,
                    outputName
                });
            }
        });
    }
    compileToMultipleFiles({ filesTranslations, outputDirectory, format }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const translationResult = {};
            filesTranslations.forEach((fileTranslation) => {
                const languageKey = Object.keys(fileTranslation)[0];
                if (!translationResult[languageKey]) {
                    translationResult[languageKey] = {};
                }
                lodash_assign_1.default(translationResult[languageKey], fileTranslation[languageKey]);
            });
            const writeFilesPromises = [];
            Object.keys(translationResult).forEach((languageKey) => {
                let fileExtension = 'json';
                let content = `${JSON.stringify(translationResult[languageKey], undefined, '\t')}`;
                if (format === FormatOptions_1.FormatOptions.JS ||
                    format === FormatOptions_1.FormatOptions.JS_EXPORT_DEFAULT ||
                    format === FormatOptions_1.FormatOptions.TS) {
                    fileExtension = format === FormatOptions_1.FormatOptions.TS ? 'ts' : 'js';
                    content =
                        format === FormatOptions_1.FormatOptions.JS
                            ? `module.exports = ${content}`
                            : `export default ${content}`;
                    content = prettier.format(content, {
                        parser: 'babel',
                        singleQuote: false,
                        trailingComma: 'none'
                    });
                }
                writeFilesPromises.push(this.fileSystemWrapper.writeFileAsync({
                    filePath: `${outputDirectory}/${languageKey}.${fileExtension}`,
                    content
                }));
            });
            yield Promise.all(writeFilesPromises);
        });
    }
    compileToSingleFile({ filesTranslations, outputDirectory, format, outputName }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const translationResult = {};
            filesTranslations.forEach((fileTranslation) => {
                const languageKey = Object.keys(fileTranslation)[0];
                if (!translationResult[languageKey]) {
                    translationResult[languageKey] = {};
                }
                lodash_assign_1.default(translationResult[languageKey], fileTranslation[languageKey]);
            });
            let fileExtension = 'json';
            let content = `${JSON.stringify(translationResult, undefined, '\t')}`;
            if (format === FormatOptions_1.FormatOptions.JS ||
                format === FormatOptions_1.FormatOptions.JS_EXPORT_DEFAULT ||
                format === FormatOptions_1.FormatOptions.TS) {
                fileExtension = format === FormatOptions_1.FormatOptions.TS ? 'ts' : 'js';
                content =
                    format === FormatOptions_1.FormatOptions.JS
                        ? `module.exports = ${content}`
                        : `export default ${content}`;
                content = prettier.format(content, {
                    parser: 'babel',
                    singleQuote: false,
                    trailingComma: 'none'
                });
            }
            yield this.fileSystemWrapper.writeFileAsync({
                filePath: `${outputDirectory}/${outputName}.${fileExtension}`,
                content
            });
        });
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map