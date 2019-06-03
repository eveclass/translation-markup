"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const FormatOptions_1 = require("../enums/FormatOptions");
const GlobWrapper_1 = require("../wrappers/GlobWrapper");
const Compiler_1 = require("./Compiler");
const Translator_1 = require("./Translator");
class Engine {
    constructor() {
        this.compiler = new Compiler_1.Compiler();
        this.glob = new GlobWrapper_1.GlobWrapper();
        this.translator = new Translator_1.Translator();
    }
    yamlCompile({ globPath = './**/*.yaml', outputDirectory = './translations', options = {} } = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!options.format) {
                options.format = FormatOptions_1.FormatOptions.JSON;
            }
            if (!options.splitFiles) {
                options.splitFiles = true;
            }
            if (!options.outputName) {
                options.outputName = 'translations';
            }
            const filePaths = yield this.glob.globAsync({
                pattern: globPath
            });
            const outDir = this.cleanOutputDir({ outputDirectory });
            yield Promise.all(filePaths.map((path) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const fileTranslations = yield this.translator.generateYamlFileTranslationsArray({
                    filePath: path
                });
                return this.compiler.compileTranslations({
                    fileTranslations,
                    outputDirectory: outDir,
                    splitFiles: options.splitFiles,
                    format: options.format
                });
            })));
            return true;
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