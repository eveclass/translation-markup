"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require('glob');
class GlobWrapper {
    globAsync({ pattern }) {
        return new Promise((resolve, reject) => {
            glob(pattern, (error, data) => {
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