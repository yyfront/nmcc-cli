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
const child_process_1 = require("child_process");
const path = require("path");
const logger_service_1 = require("../../logger/logger.service");
const color_service_1 = require("../../logger/color.service");
const file_system_utils_1 = require("../../utils/file-system.utils");
class GitRepository {
    constructor(logger = logger_service_1.LoggerService.getLogger()) {
        this.logger = logger;
    }
    clone(remote, local, showList = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.gitClone(remote, local);
            yield this.removeGitFolder(local);
            yield this.removeGitIgnoreFile(local);
            yield this.listCreatedFiles(local, showList);
        });
    }
    gitClone(remote, local) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => child_process_1.exec(`git clone ${remote} ${local}`, (error) => {
                if (error !== undefined && error !== null) {
                    reject();
                }
                else {
                    resolve();
                }
            }));
        });
    }
    removeGitFolder(local) {
        return __awaiter(this, void 0, void 0, function* () {
            const gitFolderPath = path.resolve(local, '.git');
            yield file_system_utils_1.FileSystemUtils.rmdir(gitFolderPath);
        });
    }
    removeGitIgnoreFile(local) {
        return __awaiter(this, void 0, void 0, function* () {
            const gitIgnorePath = path.resolve(local, '.gitignore');
            try {
                yield file_system_utils_1.FileSystemUtils.rm(gitIgnorePath);
            }
            catch (e) { }
        });
    }
    listCreatedFiles(local, showList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!showList)
                return;
            const files = yield file_system_utils_1.FileSystemUtils.readdir(path.join(process.cwd(), local));
            files.forEach((file) => this.logger.info(color_service_1.ColorService.green('create'), file));
        });
    }
}
exports.GitRepository = GitRepository;
