#!/usr/bin/env node
const VERSION = require('./package.json').version;
//require('./bin/index').NestCliApplication.start(VERSION);

require("ts-node/register");
require("./src/index").NestCliApplication.start(VERSION);


