const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const { google } = require("googleapis");

// Multiple write access keys to increase write limit to 120 write / minute as each key can write 60 writes / minute
// NOTE: Max keys = 5 as max write / minute is 300
let keys = ["./src/config/keys1.json", "./src/config/keys2.json"]

async function sheet(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  // Rotate keys to write maximum time (Limit: 60 writes per key per project per minute)
  const key = keys.shift();
  keys.push(key);

  //Authorization
  const auth = new google.auth.GoogleAuth({
        keyFile: key,
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

  try {
    if ( userId && taskId ) {

      //Auth client Object
      const authClientObject = await auth.getClient();

      //Google sheets instance
      const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

      //Spreadsheet ID (Text betweeen /d/ and /edit in the link)
      //Link - https://docs.google.com/spreadsheets/d/1osflvmAJBWT0-R02zmzOx7zD3ziSHV9NvzsU6ACiL4U/edit#gid=0
      const spreadsheetId = process.env.SHEET_ID;

      //Get metadata about spreadsheet
      const sheetInfo = await googleSheetsInstance.spreadsheets.get({
          auth,
          spreadsheetId,
      });

      //Write on the spreadsheet
      await googleSheetsInstance.spreadsheets.values.append({
          auth, //auth object
          spreadsheetId, //spreadsheet id
          range: "Sheet1!A:C", //sheet name and range of cells
          valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
          resource: {
              values: [[response.name, response.income, response.age]]
          },
      });

      console.log("Response submitted");

      logger.info(`Sheet write complete of task: ${data.taskId} `);

      return "Complete";

    } else {
      errorLogger.info("Invalid data received, send valid data");
      return "Failed";
    }
  } catch (err) {
    errorLogger.info(err.message);
    return "Failed";
  }
}

module.exports = {
    sheet,
};