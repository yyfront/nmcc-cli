"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../logger/logger.service");
class ModuleImportRegister {
    constructor(logger = logger_service_1.LoggerService.getLogger()) {
        this.logger = logger;
    }
    register(asset, module) {
        const lines = module.template.content.split('\n');
        const insertIndex = lines.findIndex((line) => line === '');
        const toInsert = this.buildLineToInsert(asset, module);
        lines.unshift(toInsert);
        module.template.content = lines.join('\n');
        return module;
    }
    buildLineToInsert(asset, module) {
        return `import { ${asset.className} } from './${this.removeExtension(asset.filename)}';`;
    }
    removeExtension(filename) {
        return filename.replace(/.(js|ts)/, '');
    }
}
exports.ModuleImportRegister = ModuleImportRegister;
