const Task = require("../models/task.model");
const { produceTask } = require("../utils/task.queue");


async function task(req, res) {
  const { userId, taskType, response } = req.body;
  try {
    if ( userId && taskType ) {

      // Create a new Task when user clicks on Submit
      const newTask = await Task.create({
        userId: userId,
        taskType: taskType,
      });

      // Making array of same submission but different test cases
      const data = {
        userId: userId,
        taskType: taskType,
        response: response,
        taskId: newTask._id,
      };

      // Calling Redis to make Queue
      produceTask(data);

      res.send(newTask._id);

    } else {
      res.status(400).send("Invalid data received, send valid data");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
    task,
};