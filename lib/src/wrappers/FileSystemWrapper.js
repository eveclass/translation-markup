"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
class FileSystemWrapper {
    readAsync({ filePath }) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { encoding: 'utf8' }, (error, data) => {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
        });
    }
    writeFileAsync({ filePath, content }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(filePath, content, (error) => {
                    if (error) {
                        if (error.errno === -2) {
                            fs.mkdir(filePath.slice(0, filePath.lastIndexOf('/')), { recursive: true }, (err) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                if (err) {
                                    reject(err);
                                }
                                this.writeFileAsync({ filePath, content }).then(resolve);
                            }));
                        }
                        else {
                            reject(error);
                        }
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}
exports.FileSystemWrapper = FileSystemWrapper;
//# sourceMappingURL=FileSystemWrapper.js.map