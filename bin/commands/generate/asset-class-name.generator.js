"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const string_utils_1 = require("../../utils/string.utils");
class AssetClassNameGenerator {
    constructor() { }
    generate(asset) {
        let type = asset.type;
        if (asset.type === 'all') {
            type = this.extractAllType(asset.template.name);
        }
        return `${string_utils_1.StringUtils.capitalize(this.extract(asset.name))}${string_utils_1.StringUtils.capitalize(type)}`;
    }
    extractAllType(name) {
        return name.split('.')[0];
    }
    extract(name) {
        if (name.indexOf(path.sep) !== -1) {
            return name.split(path.sep).pop();
        }
        else {
            return name;
        }
    }
}
exports.AssetClassNameGenerator = AssetClassNameGenerator;
