"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
class AssetDirectoryNameGenerator {
    constructor() { }
    generate(asset) {
        return path.join(process.cwd(), 'src/modules', asset.name);
    }
}
exports.AssetDirectoryNameGenerator = AssetDirectoryNameGenerator;
