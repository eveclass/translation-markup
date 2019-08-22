"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const prettier = tslib_1.__importStar(require("prettier"));
const FormatOptions_1 = require("../enums/FormatOptions");
const GlobWrapper_1 = require("../wrappers/GlobWrapper");
const Compiler_1 = require("./Compiler");
const Translator_1 = require("./Translator");
/**
 * Engine translator class
 */
class Engine {
    constructor() {
        this.compiler = new Compiler_1.Compiler();
        this.glob = new GlobWrapper_1.GlobWrapper();
        this.translator = new Translator_1.Translator();
    }
    /**
     * Transform a translations array in a js string
     * @param fileTranslations Array of translations objects
     */
    getJSTranslation({ yamlLangContent }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const translationsArray = yield this.translator.generateYamlFileTranslationsArray({
                fileContent: yamlLangContent
            });
            const translationResult = {};
            translationsArray.forEach((fileTranslation) => {
                const languageKey = Object.keys(fileTranslation)[0];
                translationResult[languageKey] = Object.assign({}, fileTranslation[languageKey]);
            });
            const content = `module.exports = ${JSON.stringify(translationResult, undefined, '\t')}`;
            return prettier.format(content, {
                parser: 'babel',
                singleQuote: false,
                trailingComma: 'none'
            });
        });
    }
    /**
     * Transform a translations array in a json string
     * @param fileTranslations Array of translations objects
     */
    getJSONTranslation({ yamlLangContent }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const translationsArray = yield this.translator.generateYamlFileTranslationsArray({
                fileContent: yamlLangContent
            });
            const translationResult = {};
            translationsArray.forEach((fileTranslation) => {
                const languageKey = Object.keys(fileTranslation)[0];
                translationResult[languageKey] = Object.assign({}, fileTranslation[languageKey]);
            });
            return `${JSON.stringify(translationResult, undefined, '\t')}`;
        });
    }
    /**
     * @method yamlCompile Does the actual yaml to js/json translation
     * @param globAsync Glob style path where to find the yaml files
     * @param outputDirectory Directory to output the translations
     * @param options Compile options
     */
    compile({ globPath = './**/*.lang.yaml', outputDirectory = './translations', options = {} } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (options.format === undefined) {
                options.format = FormatOptions_1.FormatOptions.JSON;
            }
            if (options.splitFiles === undefined) {
                options.splitFiles = true;
            }
            if (options.outputName === undefined) {
                options.outputName = 'translations';
            }
            //Get every yaml translations file path
            const filePaths = yield this.glob.globAsync({
                pattern: globPath
            });
            const outDir = this.cleanOutputDir({ outputDirectory });
            const filesTranslations = [];
            for (const path of filePaths) {
                const pathTranslations = yield this.translator.generateYamlFileTranslationsArray({
                    filePath: path
                });
                filesTranslations.push(...pathTranslations);
            }
            yield this.compiler.compileTranslations({
                filesTranslations,
                outputDirectory: outDir,
                splitFiles: options.splitFiles,
                format: options.format,
                outputName: options.outputName
            });
        });
    }
    cleanOutputDir({ outputDirectory }) {
        let outputDir = outputDirectory;
        if (outputDirectory.substr(-1) === '/' && outputDirectory.length > 1) {
            outputDir = outputDirectory.slice(0, outputDirectory.length - 1);
        }
        return outputDir;
    }
}
exports.Engine = Engine;
//# sourceMappingURL=Engine.js.map