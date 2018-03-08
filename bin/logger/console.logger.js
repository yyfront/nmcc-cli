"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConsoleLogger {
    debug(...messages) {
        this.flush(messages);
    }
    error(...messages) {
        this.flush(messages);
    }
    info(...messages) {
        this.flush(messages);
    }
    log(...messages) {
        this.flush(messages);
    }
    warn(...messages) {
        this.flush(messages);
    }
    flush(...messages) {
        console.log(messages.reduce((previous, current) => {
            return previous.concat(' ').concat(current);
        }).join(' '));
    }
}
exports.ConsoleLogger = ConsoleLogger;
