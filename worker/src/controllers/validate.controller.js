const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const Valid = require("../models/validate.model");


async function validate(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  try {
    if ( userId && taskId ) {

      let valid = true;

      //Validate data
      if (response.monthly_income < response.monthly_savings) {
          valid=false;
      }

      // Create a new valid or not entry
      const newValidity = await Valid.create({
        taskId: taskId,
        userId: userId,
        valid: valid,
      });

      logger.info(`Validation check complete of task: ${data.taskId}`);

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
    validate,
};