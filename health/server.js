const express = require("express");
const dotenv = require("dotenv").config();
var cron = require("node-cron");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

(function () {
  cron.schedule("*/10 * * * * *", async () => {
    await axios
      .get("http://atlan-main:5000/api")
      .then(function (response) {
        // handle success
        console.log("Main: ", response.data);
        if (response.status != 200) {
          // Alert
          console.log("Main server down");
        }
      })
      .catch(function (error) {
        // Alert
        console.log("Main server down");
      });
    const worker = await axios
      .get("http://atlan-worker:8000/api")
      .then(function (response) {
        // handle success
        console.log("Worker: ", response.data);
        if (response.status != 200) {
          // Alert
          console.log("Worker down");
        }
      })
      .catch(function (error) {
        // Alert
        console.log("Worker down");
      });
    console.log(main);
  });
})();

let port = process.env.PORT;

//Start at PORT 9000 by default
if (port == null || port == "") {
  port = 9000;
}

app.listen(port, function () {
  console.log("Health check is up: ", port);
});
