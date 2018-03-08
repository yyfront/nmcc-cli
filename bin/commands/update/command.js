"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_service_1 = require("../../logger/logger.service");
const handler_1 = require("./handler");
class UpdateCommand {
    constructor() { }
    init(program) {
        return __awaiter(this, void 0, void 0, function* () {
            program
                .command('update', 'Update the Nest project')
                .action((args, options, logger) => __awaiter(this, void 0, void 0, function* () {
                logger_service_1.LoggerService.setLogger(logger);
                yield new handler_1.UpdateHandler().handle();
            }));
        });
    }
}
exports.UpdateCommand = UpdateCommand;
