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
const program = require("caporal");
const command_1 = require("./commands/create/command");
const command_2 = require("./commands/generate/command");
const command_3 = require("./commands/update/command");
class NestCliApplication {
    constructor() { }
    static start(version) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.run(version);
        });
    }
    static run(version) {
        return __awaiter(this, void 0, void 0, function* () {
            program
                .version(version)
                .help('Node project CLI for using nmcc');
            yield new command_1.CreateCommand().init(program);
            yield new command_2.GenerateCommand().init(program);
            yield new command_3.UpdateCommand().init(program);
            program.parse(process.argv);
        });
    }
}
exports.NestCliApplication = NestCliApplication;
