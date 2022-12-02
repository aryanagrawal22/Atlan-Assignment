const Bull = require("bull");

const redisUrl = process.env.redisUrl;

const taskQueue = new Bull("tasks", redisUrl);

// Redis Producer : Adds data to queue
function produceTask(data) {
  try{
    console.log("Producer adding task: ", data);
    taskQueue.add(data);
  }catch(err){
    console.log(err)
  }
}

module.exports = { taskQueue, produceTask };