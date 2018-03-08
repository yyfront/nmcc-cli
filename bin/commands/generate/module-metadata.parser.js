"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../logger/logger.service");
class ModuleMetadataParser {
    constructor(logger = logger_service_1.LoggerService.getLogger()) {
        this.logger = logger;
        this.METADATA_REGEX = new RegExp('@Module\\(([\\s\\S]*?)\\)');
    }
    parse(content) {
        return JSON.parse(this.format(this.extractMetadataText(content)));
    }
    format(content) {
        const contentFormat = content
            .replace(/([a-zA-Z]+)/g, '"$1"')
            .replace(/(,)(\n})/, '$2');
        return contentFormat;
    }
    extractMetadataText(content) {
        const text = this.METADATA_REGEX.exec(content)[1];
        return text;
    }
}
exports.ModuleMetadataParser = ModuleMetadataParser;
