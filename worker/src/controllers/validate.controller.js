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

        if (response.monthly_income < response.monthly_savings) {
            valid=false;
        }

      // Create a new valid or not entry
      const newValidity = await Valid.create({
        taskId: taskId,
        userId: userId,
        valid: valid,
      });

      logger.info("Validation check complete");

    } else {
      errorLogger.info("Invalid data received, send valid data");
    }
  } catch (err) {
    errorLogger.info(err.message);
  }
}

module.exports = {
    validate,
};