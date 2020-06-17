/**
 * Resolves textual user commands into an actionID relating 
 * subject and object entity IDs. Another subsystem will be responsible
 * for mapping these IDs with their particular referrants.
 */
class commandParser{
  /**
   * Creates a new commandParser that uses the logger provided.
   * @param {Logger} logger - the logger that will be used to log events 
   *    and errors
   */
  constructor(logger){
    this.logger = logger
  }

  /**
   * Interprets the given command and subject ID as establishing an 
   * action-based relationship between game world entities. Sends an 
   * actionID and the entityIDs it relates to each other to the subsystem
   * responsible for mapping these IDs to particular game-world objects
   * @param {string} subjectID - a string identifying
   * @param {string} message - the message to be interpreted as a command
   * @return {number | Problem} returns 0 if there is no issue with the 
   *    command. Returns a Problem otherwise.
   */
  issueCommand(subjectID, message){
    this.logger.logEvent(`${subjectID} has issued a command: ${message}`);
    return 0;
  }
}

module.exports = commandParser;
