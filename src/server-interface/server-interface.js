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
  }
}