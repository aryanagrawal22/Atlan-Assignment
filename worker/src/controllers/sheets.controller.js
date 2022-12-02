const errorLogger = require("../utils/error.log.util");
const logger = require("../utils/log.util");
const { google } = require("googleapis");



async function sheet(data) {

  const response = data.response;
  const taskId = data.taskId;
  const userId = data.userId;

  const auth = new google.auth.GoogleAuth({
        keyFile: "./src/config/keys.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

  try {
    if ( userId && taskId ) {


        const authClientObject = await auth.getClient();

        const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

        const spreadsheetId = process.env.SHEET_ID;

        const sheetInfo = await googleSheetsInstance.spreadsheets.get({
            auth,
            spreadsheetId,
        });

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

      logger.info("Sheet write complete");

    } else {
      errorLogger.info("Invalid data received, send valid data");
    }
  } catch (err) {
    errorLogger.info(err.message);
  }
}

module.exports = {
    sheet,
};