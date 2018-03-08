"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorService {
    static white(message) {
        return `\x1b[37m${message}${this.RESET}`;
    }
    static green(message) {
        return `\x1b[32m${message}${this.RESET}`;
    }
    static yellow(message) {
        return `\x1b[33m${message}${this.RESET}`;
    }
    static red(message) {
        return `\x1b[31m${message}${this.RESET}`;
    }
    static blue(message) {
        return `\x1b[34m${message}${this.RESET}`;
    }
}
ColorService.RESET = '\x1b[0m';
exports.ColorService = ColorService;
