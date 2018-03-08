"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const os = require("os");
class StringUtils {
    static capitalize(expression) {
        const separator = this.computeSeparator(expression);
        return this.capitalizeWord(expression.split(separator).reduce((previous, current) => {
            return previous.concat(this.capitalizeWord(current));
        }));
    }
    static capitalizeWord(word) {
        return `${word.charAt(0).toUpperCase()}${word.slice(1, word.length)}`;
    }
    static computeSeparator(expression) {
        if (this.isDashSeparator(expression))
            return '-';
        else if (this.isPathSeparator(expression))
            return os.platform() === 'win32' ? path.win32.sep : path.posix.sep;
    }
    static isDashSeparator(expression) {
        return new RegExp('-').test(expression);
    }
    static isPathSeparator(expression) {
        if (os.platform() === 'win32')
            return new RegExp('\\'.concat(path.win32.sep)).test(expression);
        else
            return new RegExp(path.posix.sep).test(expression);
    }
}
exports.StringUtils = StringUtils;
