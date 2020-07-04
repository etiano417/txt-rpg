WebsocketClient = require("websocket").client;
/**
 * Interfaces with the game server to make changes and bring updates to the players
 */
class ServerInterface{
  /**
   * Server Interface constructor
   * @param {Logger} logger - The logger that will be used to log events 
   *    and errors in the Server Interface
   * @param {string} serverAddress - The address used to connect to the web server
   */
  constructor(logger, serverAddress){
    this.logger = logger;
    this.serverAddress = serverAddress;
    this.playerClientMap = {};
  }
  
  /**
   * logs into the server
   * @param player - some object uniquely identifying the player
   * @param responseFunction - the function responsible for communicating
   *    information to the user
   *    true - connection succeeded
   *    false - connection failed
   */
  login(player, responseFunction){
    if(!this.playerClientMap[player]){
      let client = new WebsocketClient();
      client.on("connect", this.logConnectionFactory(player,this.serverAddress, responseFunction));
      this.playerClientMap[player] = player;
      client.connect(`ws://${this.serverAddress}`);
    } else {
      responseFunction(false);
    }
  }
  
  logout(player){
    this.logger.logEvent(`logged out ${player}`)
  }
   
  logConnectionFactory(player, serverAddress, responseFunction){
    return (connection) => {
      this.logger.logEvent(`Connected ${player} to game server at ${serverAddress}`);
      responseFunction(true);
    }
    
  }
  
  logConnectionFailure(error){
    this.logger.logError('Connect Error: ' + error.toString());
  }
  
}

module.exports = ServerInterface;