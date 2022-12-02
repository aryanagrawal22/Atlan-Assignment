const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const Slang = require("../models/slang.model")
const translate = require("translate");
translate.engine = "google";
translate.key = process.env.translateKey;


async function slang(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  try {
    if ( userId && taskId ) {

      const translated = await translate(response.original, 'hi');

      // Create a new converted entry
      const newSlang = await Slang.create({
        taskId: taskId,
        userId: userId,
        original: response.original,
        translate: translated,
      });

      logger.info("Slang conversion complete");

    } else {
      errorLogger.info("Invalid data received, send valid data");
    }
  } catch (err) {
    errorLogger.info(err.message);
  }
}

module.exports = {
    slang,
};