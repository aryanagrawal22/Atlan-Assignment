const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const fast2sms = require('fast-two-sms')

async function sms(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  try {
    if ( userId && taskId ) {
        const options = { authorization: process.env.SMS_API_KEY, message: ` Your Details :\n Email ID :${response.email}\n Name : ${response.name}\n has been verified ` , numbers: response.mobile };
        const message = await fast2sms.sendMessage(options); //Asynchronous Function.

        logger.info("SMS Sent");

    } else {
      errorLogger.info("Invalid data received, send valid data");
    }
  } catch (err) {
    errorLogger.info(err.message);
  }
}

module.exports = {
    sms,
};