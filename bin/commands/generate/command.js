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
const path = require("path");
const handler_1 = require("./handler");
const file_system_utils_1 = require("../../utils/file-system.utils");
const logger_service_1 = require("../../logger/logger.service");
class GenerateCommand {
    constructor() { }
    init(program) {
        return __awaiter(this, void 0, void 0, function* () {
            const assets = yield file_system_utils_1.FileSystemUtils.readdir(path.resolve(__dirname, 'templates'));
            program
                .command('generate', 'Generate a new Nest asset')
                .alias('g')
                .argument('<name>', 'The generated asset name / path')
                .argument('[type]', 'The generated asset type', assets, 'all')
                .action((args, options, logger) => __awaiter(this, void 0, void 0, function* () {
                logger_service_1.LoggerService.setLogger(logger);
                return yield new handler_1.GenerateHandler().handle(args);
            }));
        });
    }
}
exports.GenerateCommand = GenerateCommand;
