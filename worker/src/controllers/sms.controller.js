const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const fast2sms = require('fast-two-sms')

async function sms(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  try {
    if ( userId && taskId ) {

      //Authorization
      const options = { authorization: process.env.SMS_API_KEY, message: ` Your Receipt Details :\n Email ID :${response.email}\n Name : ${response.name}\n has been verified ` , numbers: response.mobile };

      //Send the message
      const message = await fast2sms.sendMessage(options); //Asynchronous Function.

      logger.info(`SMS Sent of task: ${data.taskId}`);

      return("Complete");

    } else {
      errorLogger.info("Invalid data received, send valid data");
      return("Failed");
    }
  } catch (err) {
    errorLogger.info(err.message);
    return("Failed");
  }
}

module.exports = {
    sms,
};