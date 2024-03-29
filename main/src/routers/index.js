const Router = require("express").Router();
const TaskRouter = require("./task.router");

Router.get("", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    response: process.hrtime(),
    message: "OK",
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
});
Router.use("/task", TaskRouter);

module.exports = Router;
