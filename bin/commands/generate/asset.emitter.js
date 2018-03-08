"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const logger_service_1 = require("../../logger/logger.service");
const color_service_1 = require("../../logger/color.service");
class AssetEmitter {
    constructor(logger = logger_service_1.LoggerService.getLogger()) {
        this.logger = logger;
    }
    emit(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createRecursiveDirectory(asset.directory);
            yield this.emitFile(asset);
        });
    }
    createRecursiveDirectory(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resovle, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fse.mkdirs(folder);
                    resovle();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    emitFile(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const filename = path.join(asset.directory, asset.filename);
                fs.writeFile(filename, asset.template.content, (error) => {
                    if (error !== undefined && error !== null) {
                        return reject(error);
                    }
                    else {
                        this.logger.info(color_service_1.ColorService.green(' create'), filename);
                        return resolve();
                    }
                });
            });
        });
    }
}
exports.AssetEmitter = AssetEmitter;
