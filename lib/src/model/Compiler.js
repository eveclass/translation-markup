"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prettier = require("prettier");
const FormatOptions_1 = require("../enums/FormatOptions");
const FileSystemWrapper_1 = require("../wrappers/FileSystemWrapper");
class Compiler {
    constructor() {
        this.fileSystemWrapper = new FileSystemWrapper_1.FileSystemWrapper();
    }
    compileTranslations({ fileTranslations, outputDirectory, splitFiles, format }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (splitFiles) {
                yield this.compileToMultipleFiles({
                    fileTranslations,
                    outputDirectory,
                    format
                });
            }
            else {
                yield this.compileToSingleFile({
                    fileTranslations,
                    outputDirectory,
                    format
                });
            }
        });
    }
    compileToMultipleFiles({ fileTranslations, outputDirectory, format }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all(fileTranslations.map((fileTranslation) => {
                const languageKey = Object.keys(fileTranslation)[0];
                let fileExtension = 'json';
                let content = `${JSON.stringify(fileTranslation[languageKey], undefined, '\t')}`;
                if (format === FormatOptions_1.FormatOptions.JS) {
                    fileExtension = 'js';
                    content = `module.exports = ${content}`;
                    content = prettier.format(content, {
                        parser: 'babel',
                        singleQuote: false,
                        trailingComma: 'none'
                    });
                }
                return this.fileSystemWrapper.writeFileAsync({
                    filePath: `${outputDirectory}/${languageKey}.${fileExtension}`,
                    content
                });
            }));
        });
    }
    compileToSingleFile({ fileTranslations, outputDirectory, format }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const translationResult = {};
            fileTranslations.forEach((fileTranslation) => {
                const languageKey = Object.keys(fileTranslation)[0];
                translationResult[languageKey] = Object.assign({}, fileTranslation[languageKey]);
            });
            let fileExtension = 'json';
            let content = `${JSON.stringify(translationResult, undefined, '\t')}`;
            if (format === FormatOptions_1.FormatOptions.JS) {
                fileExtension = 'js';
                content = `module.exports = ${content}`;
                content = prettier.format(content, {
                    parser: 'babel',
                    singleQuote: false,
                    trailingComma: 'none'
                });
            }
            yield this.fileSystemWrapper.writeFileAsync({
                filePath: `${outputDirectory}/translations.${fileExtension}`,
                content
            });
        });
    }
}
exports.Compiler = Compiler;
//# sourceMappingURL=Compiler.js.map