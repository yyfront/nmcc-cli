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
const handler_1 = require("./handler");
const logger_service_1 = require("../../logger/logger.service");
class CreateCommand {
    constructor() { }
    init(program) {
        return __awaiter(this, void 0, void 0, function* () {
            program
                .command('new', 'Create a new nmcc application')
                .argument('<name>', 'nmcc application name')
                .argument('[destination]', 'Where the nmcc application will be created')
                .option('-r, --repository <repository>', 'Github repository where the project template is')
                .action((args, options, logger) => __awaiter(this, void 0, void 0, function* () {
                logger_service_1.LoggerService.setLogger(logger);
                yield new handler_1.CreateHandler().handle(args, options);
            }));
        });
    }
}
exports.CreateCommand = CreateCommand;
