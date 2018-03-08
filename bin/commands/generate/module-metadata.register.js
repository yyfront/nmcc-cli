"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_metadata_parser_1 = require("./module-metadata.parser");
const logger_service_1 = require("../../logger/logger.service");
class ModuleMetadataRegister {
    constructor(logger = logger_service_1.LoggerService.getLogger(), parser = new module_metadata_parser_1.ModuleMetadataParser()) {
        this.logger = logger;
        this.parser = parser;
    }
    register(asset, module) {
        const metadata = this.parser.parse(module.template.content);
        const updatedMetadata = this.updateMetadata(Object.assign({}, metadata), asset);
        return this.updateModule(updatedMetadata, Object.assign({}, module));
    }
    updateMetadata(metadata, asset) {
        let type = asset.type;
        if (asset.type === 'all') {
            type = this.extractAllType(asset.template.name);
        }
        if (type === 'controller') {
            metadata.controllers = metadata.controllers !== undefined ? [...metadata.controllers, asset.className] : [asset.className];
        }
        else if (type === 'module') {
            metadata.modules = metadata.modules !== undefined ? [...metadata.modules, asset.className] : [asset.className];
        }
        else if (type === 'service' || type === 'component') {
            metadata.components = metadata.components !== undefined ? [...metadata.components, asset.className] : [asset.className];
        }
        return metadata;
    }
    extractAllType(name) {
        return name.split('.')[0];
    }
    updateModule(updatedMetadata, module) {
        module.template.content = module.template.content.replace(this.parser.METADATA_REGEX, `@Module(${JSON.stringify(updatedMetadata, null, 2).replace(/"/g, '')})`);
        return module;
    }
}
exports.ModuleMetadataRegister = ModuleMetadataRegister;
