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
const logger_service_1 = require("../../logger/logger.service");
class ModuleLoader {
    constructor(logger = logger_service_1.LoggerService.getLogger()) {
        this.logger = logger;
    }
    load(asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const directory = yield this.findModuleDirectoryFrom(asset.directory, asset.filename);
            const files = yield this.read(directory);
            const filename = files.find((filename) => filename.indexOf('module') !== -1);
            const content = yield this.getModuleContent(path.join(directory, filename));
            return {
                type: 'module',
                name: '',
                template: {
                    name: '',
                    content: content
                },
                directory: directory,
                filename: filename
            };
        });
    }
    findModuleDirectoryFrom(directory, assetFilename) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.read(directory);
            if (files.find((filename) => this.isAModule(filename) && filename !== assetFilename) !== undefined) {
                return directory;
            }
            else {
                const parent = this.computeParentPathFrom(directory);
                return this.findModuleDirectoryFrom(parent, assetFilename);
            }
        });
    }
    read(directory) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                fs.readdir(directory, (error, files) => {
                    resolve(files);
                });
            });
        });
    }
    isAModule(filename) {
        return filename.indexOf('module') !== -1;
    }
    computeParentPathFrom(directory) {
        const elements = directory.split(path.sep);
        elements.pop();
        return elements.join(path.sep);
    }
    getModuleContent(moduleFilename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(moduleFilename, (error, buffer) => {
                    if (error !== undefined && error !== null) {
                        return reject(error);
                    }
                    return resolve(buffer.toString());
                });
            });
        });
    }
}
exports.ModuleLoader = ModuleLoader;
