const Router = require("express").Router();

Router.get("", (req, res) => {
  res.send("Welcome to Atlan-Assignment");
});

module.exports = Router;