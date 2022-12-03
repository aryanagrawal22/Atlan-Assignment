const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const { google } = require("googleapis");


async function sheet(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  //Authorization
  const auth = new google.auth.GoogleAuth({
        keyFile: "./src/config/keys.json",
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