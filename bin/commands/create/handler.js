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
const git_repository_1 = require("./git.repository");
const logger_service_1 = require("../../logger/logger.service");
class CreateHandler {
    constructor(logger = logger_service_1.LoggerService.getLogger(), repository = new git_repository_1.GitRepository()) {
        this.logger = logger;
        this.repository = repository;
        this.DEFAULT_REMOTE = 'https://github.com/yyfront/nmcc-app.git';
    }
    handle(args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.clone(this.computeRepository(options), args.name);
        });
    }
    computeRepository(options) {
        if ((options !== undefined && options !== null) && (options.repository !== undefined && options.repository !== null)) {
            return options.repository;
        }
        else {
            return this.DEFAULT_REMOTE;
        }
    }
}
exports.CreateHandler = CreateHandler;
