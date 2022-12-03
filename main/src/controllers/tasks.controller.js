const Task = require("../models/task.model");
const { produceTask } = require("../utils/task.queue");
const errorLogger = require('../utils/error.log.util')


async function task(req, res) {
  const { userId, taskType, response } = req.body;
  try {

    // Check for userId and TaskType
    if ( userId && taskType ) {

      // Create a new Task when user clicks on Submit
      const newTask = await Task.create({
        userId: userId,
        taskType: taskType,
      });

      // Make object of the task with _id of DB as taskId
      const data = {
        userId: userId,
        taskType: taskType,
        response: response,
        taskId: newTask._id,
      };

      // Calling Redis to make Queue
      produceTask(data);

      res.status(200).send(newTask._id);

    } else {
      res.status(400).send("Invalid data received, send valid data");
    }
  } catch (err) {
    errorLogger.info("Err /tasks :", err.message);
    res.status(400).send(err.message);
  }
}

module.exports = {
    task,
};