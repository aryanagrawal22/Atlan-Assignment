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

      //Convert the text
      //Use this for production (Limited API calls remaining)

      // const translated = await translate(response.originalAnswer, 'hi');
      const translated = "Translated Text";

      // Create a new converted entry
      const newSlang = await Slang.create({
        taskId: taskId,
        userId: userId,
        question: response.question,
        originalAnswer: response.answer,
        translateAnswer: translated,
        translateCity: response.city
      });

      logger.info(`Slang conversion complete of task: ${data.taskId}`);

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
    slang,
};