const { task } = require("../controllers/tasks.controller");
const TaskRouter = require("express").Router();

TaskRouter.post("/", task);

module.exports = TaskRouter;