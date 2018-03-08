"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class AssetFileNameGenerator {
    constructor() { }
    generate(asset) {
        let type = asset.type;
        if (asset.type === 'all') {
            type = this.extractAllType(asset.template.name);
        }
        return `${this.extractName(asset.name)}.${type}${this.addSpec(asset.template.name)}${this.extractLanguage(asset.template.name)}`;
    }
    extractName(name) {
        if (name.indexOf(path.sep) !== -1) {
            return name.split(path.sep).pop();
        }
        else {
            return name;
        }
    }
    addSpec(name) {
        return name.indexOf('spec') !== -1 ? '.spec.' : '.';
    }
    extractAllType(name) {
        return name.split('.')[0];
    }
    extractLanguage(name) {
        return name.indexOf('ts') !== -1 ? 'ts' : 'js';
    }
}
exports.AssetFileNameGenerator = AssetFileNameGenerator;
