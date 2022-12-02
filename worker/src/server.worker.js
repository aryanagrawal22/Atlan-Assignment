const express = require("express");
const dotenv = require("dotenv").config();
const connect = require("./db/connect");
const cors = require("cors");
const Bull = require("bull");
const {slang} = require("./controllers/slag.controller")
const {validate} = require("./controllers/validate.controller")
const {sms} = require("./controllers/sms.controller")
const {sheet} = require("./controllers/sheets.controller")


const redisUrl = process.env.redisUrl;

const taskQueue = new Bull("tasks", redisUrl);

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let port = process.env.PORT;

//Start at PORT 8000 by default
if (port == null || port == "") {
  port = 8000;
}

taskQueue.process(async (job, done) =>{

    console.log('Consuming task:', job.data);

    if(job.data.taskType==1) slang(job.data);

    if(job.data.taskType==2) validate(job.data);

    if(job.data.taskType==3) sheet(job.data);

    if(job.data.taskType==4) sms(job.data);

    done();

});



app.listen(port, function () {
  console.log("Worker is up and running at port:", port);
});