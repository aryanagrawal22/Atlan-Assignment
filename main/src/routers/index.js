const Router = require("express").Router();
const TaskRouter = require("./task.router");

Router.get("", (req, res) => {
  res.send("Welcome to Atlan-Assignment");
});
Router.use("/task", TaskRouter);

module.exports = Router;