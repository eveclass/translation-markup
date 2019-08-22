"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const glob_1 = tslib_1.__importDefault(require("glob"));
/**
 * Wrapper class to use glob methods as promises
 */
class GlobWrapper {
    /**
     * Perform a asynchronus file glob search
     * @param {string} pattern Glob path pattern
     */
    globAsync({ pattern }) {
        return new Promise((resolve, reject) => {
            glob_1.default(pattern, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
        });
    }
}
exports.GlobWrapper = GlobWrapper;
//# sourceMappingURL=GlobWrapper.js.map