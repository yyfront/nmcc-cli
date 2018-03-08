"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_import_register_1 = require("./module-import.register");
const module_metadata_register_1 = require("./module-metadata.register");
const logger_service_1 = require("../../logger/logger.service");
class ModuleRegister {
    constructor(logger = logger_service_1.LoggerService.getLogger(), importRegister = new module_import_register_1.ModuleImportRegister(), metadataRegister = new module_metadata_register_1.ModuleMetadataRegister()) {
        this.logger = logger;
        this.importRegister = importRegister;
        this.metadataRegister = metadataRegister;
    }
    register(asset, module) {
        let toReturn = this.importRegister.register(asset, Object.assign({}, module));
        return this.metadataRegister.register(asset, toReturn);
    }
}
exports.ModuleRegister = ModuleRegister;
