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
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
class FileSystemUtils {
    static rmdir(name) {
        return this.fsrmdir(name)
            .catch(() => {
            return this.readdir(name)
                .then((files) => {
                return files.reduce((previous, current) => {
                    const filename = path.join(name, current);
                    return previous
                        .then(() => {
                        return this.rm(filename);
                    })
                        .catch(() => {
                        return this.rmdir(filename);
                    });
                }, Promise.resolve(''));
            })
                .then(() => {
                return this.rmdir(name);
            });
        });
    }
    static fsrmdir(dirname) {
        return new Promise((resolve, reject) => {
            fs.rmdir(dirname, (error) => {
                if (!util_1.isNullOrUndefined(error))
                    reject(error);
                else
                    resolve(dirname);
            });
        });
    }
    static mkdir(target) {
        return target
            .split(path.sep)
            .reduce((previous, child) => {
            return previous.then(parent => {
                const current = path.resolve(parent, child);
                return this.mkdirProcess(current);
            });
        }, Promise.resolve(''));
    }
    static mkdirProcess(target) {
        return this.stat(target)
            .then(() => target)
            .catch(() => this.fsmkdir(target).then(() => target));
    }
    static fsmkdir(target) {
        return new Promise((resolve, reject) => {
            fs.mkdir(target, (error) => {
                if (!util_1.isNullOrUndefined(error))
                    reject(error);
                else
                    resolve();
            });
        });
    }
    static stat(filename) {
        return new Promise((resolve, reject) => {
            fs.stat(filename, (error, stats) => {
                if (!util_1.isNullOrUndefined(error))
                    reject(error);
                else
                    resolve(stats);
            });
        });
    }
    static readdir(dirname) {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, (error, files) => {
                if (!util_1.isNullOrUndefined(error))
                    reject(error);
                else
                    resolve(files);
            });
        });
    }
    static rm(filename) {
        return new Promise((resolve, reject) => {
            fs.unlink(filename, (error) => {
                if (!util_1.isNullOrUndefined(error))
                    reject(error);
                else
                    resolve();
            });
        });
    }
    static readFile(filename) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (error, data) => {
                if (!util_1.isNullOrUndefined(error))
                    reject(error);
                else
                    resolve(data.toString());
            });
        });
    }
    static writeFile(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.appendFile(filename, content, (error) => {
                    if (error !== undefined && error !== null) {
                        return reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
}
exports.FileSystemUtils = FileSystemUtils;
