// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

var uiLogger = null;
var commandParser = null

/**
 * Command constructor.
 * @param {function} runFunction - the function responsible for the 
 *      command's functionality
 * @param {string} parameters - a string representation of what is 
 *      expected in the arguments of the command. Use "<>" around 
 *      required parameters and "[]" around optional parameters. If
 *      the function does not take parameters , this should be left as 
 *      an empty string.
 *       - Ex: "<first parameter> [optional second parameter]"
 * @param {string} description - a plaintext description of the 
 *      Command
 */
function Command(runFunction, parameters, description){
  return {
    run: runFunction,
    parameters: parameters,
    description: description
  };
}

// Commands mapped to their functions
const commands = {
  "!help": new Command(help, "", "view available commands"),
  "!join": new Command(join,"", "join the game"),
  "!leave": new Command(leave,"", "leave the game"),
}

/**
 * Starts the discord bot that handles user interactions
 * @param {string} appToken - a Discord application token to log in with
 * @param {CommandParser} parser - the subsystem responsible for parsing 
 *      plaintext commands
 * @param {Logger} logger - the subsystem responsible for logging 
 *      occurances
 */
function userInterface(appToken, parser, server, logger){
  commandParser = parser;
  serverInterface = server;
  uiLogger = logger;

  client.on('ready', function(){
    uiLogger.logEvent('I am ready');
  });

  // Create an event listener for messages
  client.on('message', function(message) {
    parseMessage(message); 
  });

  client.login(appToken);
}

/**
 * Parses user messages and runs appropriate operations, including
 * responding in the appropriate Discord channel.
 * @param {Message} message - the Discord message received
 */
function parseMessage(message){
  //stores the first word in message
  let commandName = message.content.split(" ")[0];
  //stores the rest of the message
  let args = message.content.slice(commandName.length);
  
  let user = message.author;
  
  if(commands[commandName]){
    let command = commands[commandName];

    command.run(args, user, message.channel);
    uiLogger.logEvent(`parsing message "${message.content}" from ${user.tag}`);
  }
}

/**
 * Lists the commands available to the user, including proper usage and a 
 * brief description of each command
 */
function help(args, user, channel){
  let outputContent = [];
  commandNames = Object.keys(commands);
  commandNames.sort();
  outputContent.push("List of commands\n");
  for(let commandName of commandNames){
    command = commands[commandName];
    outputContent.push(`${commandName} ${command.parameters}`);
    outputContent.push(`\t\t\t\t${command.description}`);
  }
  channel.send(outputContent.join("\n"));
}

/**
 * Places a character for the player into the game world
 */
function join(args, user, channel){
  
  responseFunction = (response) => {
      if(response){
        channel.send(`${user} joined the game!`);
      } else {
        channel.send(`You're already playing ${user}.`);
      }
  };
  serverInterface.login(user.toString(),responseFunction);
}

/**
 * Removes a player's character from the game world
 */
function leave(args, user, channel){
  serverInterface.logout(user.toString());
  uiLogger.logEvent(`${user} failed to leave server`);
  channel.send(`${user} you weren't playing in the first place.`)
}


/**
 * @callback Command~runFunction{}
 * @param {string} args
 * @param {User} user - the user who called the command
 * @param {Channel} channel - the Discord channel the command was 
 *      called from
 */

/**
 * @callback sendMessage
 * @param {string} the message to be sent
 */

module.exports = userInterface;
