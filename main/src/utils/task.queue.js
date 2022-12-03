const Bull = require("bull");
const errorLogger = require("../utils/error.log.util")

const redisUrl = process.env.redisUrl;

const taskQueue = new Bull("tasks", redisUrl);

// Producer : Adds data to queue to be consumed at worker
function produceTask(data) {
  try{
    console.log("Producer adding task: ", data);
    taskQueue.add(data);
  }catch(err){
    errorLogger.info("Err /queue :", err.message);
    console.log("Err /queue Check Logs")
  }
}

module.exports = { taskQueue, produceTask };