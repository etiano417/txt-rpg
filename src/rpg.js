'use strict';

//configuration file for the game
var config = require("./config");
var Logger = require("./logger/logger");
var userInterface = require("./user-interface/user-interface");
var ServerInterface = require("./server-interface/server-interface");

console.log("loading configuation: " + config.configName);

/*
let cpLogger = new Logger("CP");
let commandParser = new CommandParser(cpLogger);
*/
let commandParser = {};

let uiLogger = new Logger("UI");
let siLogger = new Logger("SI");

let si = new ServerInterface(siLogger, config.serverAddress)

userInterface(config.appToken, commandParser, si, uiLogger);
