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
const file_system_utils_1 = require("../../utils/file-system.utils");
class TemplateLoader {
    constructor() { }
    load(type, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const templateFileNames = yield file_system_utils_1.FileSystemUtils.readdir(path.resolve(__dirname, `templates/${type}`));
            return templateFileNames
                .filter((filename) => filename.indexOf(language) !== -1)
                .reduce((templates, filename) => __awaiter(this, void 0, void 0, function* () { return templates.then((templates) => __awaiter(this, void 0, void 0, function* () { return yield this.addFileContent(type, filename, templates); })); }), Promise.resolve([]));
        });
    }
    addFileContent(type, filename, templates) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield file_system_utils_1.FileSystemUtils.readFile(path.resolve(__dirname, `templates/${type}`, filename));
            templates.push({
                name: filename,
                content: content
            });
            return templates;
        });
    }
}
exports.TemplateLoader = TemplateLoader;
