"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Engine_1 = require("./model/Engine");
const engine = new Engine_1.Engine();
function compile({ globPath = './**/*.lang.yaml', outputDirectory = './translations', options = {} } = {}) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return engine.compile({ globPath, outputDirectory, options });
    });
}
exports.compile = compile;
function getJSTranslation({ yamlLangContent }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return engine.getJSTranslation({ yamlLangContent });
    });
}
exports.getJSTranslation = getJSTranslation;
function getJSONTranslation({ yamlLangContent }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return engine.getJSONTranslation({ yamlLangContent });
    });
}
exports.getJSONTranslation = getJSONTranslation;
//# sourceMappingURL=index.js.map