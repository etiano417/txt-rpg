var moment = require("moment");

/**
 * Responsible for handling logging in a subsystem. There should be one 
 * logger per subsystem
 */
class Logger{
  /**
   * Create a new logger that labels all messages with the subsystemLabel.
   *
   * @param {string} subsystemLabel - A string to identify the subsystem the logger
   *    is being used in. This string will appear in all logged messages.
   */
  constructor(subsystemLabel){
    this.subsystemLabel = subsystemLabel
  }

  /**
   * Log a normal system event. 
   * @param {string} shortDescription - A brief description of the event that occured.
   * @param {string=} longDescription - A detailed description of the event that occured.
   */
  logEvent(shortDescription,longDescription=""){  
    console.log(`[${moment().format('MM[/]DD[/]YYYY[ ]HH:mm:ss')}] ${this.subsystemLabel}: ${shortDescription}`)
  }

  /**
   * Log an error. 
   * @param {string} shortDescription - A brief description of the error that occured.
   * @param {string=} longDescription - A detailed description of the error that occured.
   */
  logError(shortDescription, longDescription=""){
    error.log(`${Date.now()} ${this.subsystemLabel}: ${shortDescription}`)
  }

}

module.exports = Logger;
