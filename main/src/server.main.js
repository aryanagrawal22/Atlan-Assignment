const express = require("express");
const dotenv = require("dotenv").config();
const connect = require("../src/db/connect");
const Router = require("./routers");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Route to /api (URL: http://localhost:5000/api)
app.use("/api", Router);

let port = process.env.PORT;

//Start at PORT 5000 by default
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, function () {
  console.log("Main Server is up and running at port:", port);
});