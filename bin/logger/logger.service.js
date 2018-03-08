"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_logger_1 = require("./console.logger");
class LoggerService {
    static setLogger(logger) {
        LoggerService.logger = logger;
    }
    static getLogger() {
        return (LoggerService.logger === undefined || LoggerService.logger === null) ? new console_logger_1.ConsoleLogger() : LoggerService.logger;
    }
}
exports.LoggerService = LoggerService;
