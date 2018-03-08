"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../logger/logger.service");
const asset_class_name_generator_1 = require("./asset-class-name.generator");
const asset_directory_name_generator_1 = require("./asset-directory-name.generator");
const asset_file_name_generator_1 = require("./asset-file-name.generator");
class AssetGenerator {
    constructor(logger = logger_service_1.LoggerService.getLogger(), className = new asset_class_name_generator_1.AssetClassNameGenerator(), directory = new asset_directory_name_generator_1.AssetDirectoryNameGenerator(), filename = new asset_file_name_generator_1.AssetFileNameGenerator()) {
        this.logger = logger;
        this.className = className;
        this.directory = directory;
        this.filename = filename;
    }
    generate(asset) {
        return Object.assign({
            className: this.className.generate(asset),
            directory: this.directory.generate(asset),
            filename: this.filename.generate(asset)
        }, asset);
    }
}
exports.AssetGenerator = AssetGenerator;
