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
const logger_service_1 = require("../../logger/logger.service");
const color_service_1 = require("../../logger/color.service");
class ModuleEmitter {
    constructor(logger = logger_service_1.LoggerService.getLogger()) {
        this.logger = logger;
    }
    emit(module) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const filename = path.join(module.directory, module.filename);
                fs.writeFile(filename, module.template.content, (error) => {
                    this.logger.info(color_service_1.ColorService.yellow(' update'), filename);
                    resolve();
                });
            });
        });
    }
}
exports.ModuleEmitter = ModuleEmitter;
