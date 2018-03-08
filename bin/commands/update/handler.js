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
const logger_service_1 = require("../../logger/logger.service");
const color_service_1 = require("../../logger/color.service");
const git_repository_1 = require("../create/git.repository");
const file_system_utils_1 = require("../../utils/file-system.utils");
const fse = require("fs-extra");
const path = require("path");
class UpdateHandler {
    constructor(logger = logger_service_1.LoggerService.getLogger(), repository = new git_repository_1.GitRepository()) {
        this.logger = logger;
        this.repository = repository;
        this.DEFAULT_REMOTE = 'https://github.com/yyfront/nmcc-app.git';
        this.TEMP_UPDATE_FOLDER = 'tempUpdate';
        this.MODULE_LOCATION = 'src/modules';
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.clone(this.DEFAULT_REMOTE, this.TEMP_UPDATE_FOLDER, false);
            yield this.deleteOldModule();
            yield this.updateModule();
            yield this.deleteTempUpdate();
            this.logger.info(color_service_1.ColorService.blue('update success'));
        });
    }
    deleteTempUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fse.remove(path.resolve(this.TEMP_UPDATE_FOLDER));
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    filterModule(src, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const originModule = path.resolve(src);
            let moduleArr = yield file_system_utils_1.FileSystemUtils.readdir(originModule);
            return moduleArr.filter((item) => item.indexOf(filter) >= 0);
        });
    }
    deleteOldModule() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const originModule = path.resolve(this.MODULE_LOCATION);
                    let moduleArr = yield this.filterModule(originModule, '$');
                    for (let module of moduleArr) {
                        yield fse.remove(path.resolve(this.MODULE_LOCATION, module));
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
    updateModule() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const updateModule = path.resolve(this.TEMP_UPDATE_FOLDER, this.MODULE_LOCATION);
                    const originModule = path.resolve(this.MODULE_LOCATION);
                    let moduleArr = yield this.filterModule(updateModule, '$');
                    for (let module of moduleArr) {
                        const destination = path.resolve(this.TEMP_UPDATE_FOLDER, this.MODULE_LOCATION, module);
                        const updateDes = path.resolve(originModule, module);
                        yield fse.copy(destination, updateDes);
                        this.logger.info(color_service_1.ColorService.yellow('update'), updateDes);
                    }
                    resolve();
                }
                catch (err) {
                    reject(err);
                }
            }));
        });
    }
}
exports.UpdateHandler = UpdateHandler;
