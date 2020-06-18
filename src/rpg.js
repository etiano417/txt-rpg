'use strict';

//configuration file for the game
var config = require("./config");
var Logger = require("./logger/logger");
var userInterface = require("./user-interface/user-interface");

console.log("loading configuation: " + config.configName);

/*
let cpLogger = new Logger("CP");
let commandParser = new CommandParser(cpLogger);
*/
let commandParser = {};

let uiLogger = new Logger("UI");
userInterface(config.appToken, commandParser, uiLogger);
