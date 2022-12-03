const express = require("express");
const dotenv = require("dotenv").config();
const connect = require("./db/connect");
const cors = require("cors");
const Bull = require("bull");
const {slang} = require("./controllers/slag.controller")
const {validate} = require("./controllers/validate.controller")
const {sms} = require("./controllers/sms.controller")
const {sheet} = require("./controllers/sheets.controller")
const Task = require("./models/task.model");
const Router = require("./routers");

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

    let status;

    // TaskType 1 = Convert to desired slang
    if(job.data.taskType==1) status = await slang(job.data);

    // TaskType 2 = Validate the data
    if(job.data.taskType==2) status = await validate(job.data);

    // TaskType 3 = Write data on google sheets
    if(job.data.taskType==3) status = await sheet(job.data);

    // TaskType 4 = Send SMS as a receipt
    if(job.data.taskType==4) status = await sms(job.data);

    // Update the Task's status
    await Task.updateOne({_id: job.data.taskId}, {status: status});

    done();

});

app.use("/api", Router);

app.listen(port, function () {
  console.log("Worker is up and running at port:", port);
});