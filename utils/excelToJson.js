const XLSX = require('xlsx');
const verifyData = require('./verifyData');

function excelToJson(filename, filePath) {
    console.log(filePath, " AA ", filename)
    return new Promise((resolve, reject) => {
        try {
            const workbook = XLSX.readFile(`${filePath}`);
            const first_sheet_name = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[first_sheet_name];
            const xlsArr = XLSX.utils.sheet_to_json(worksheet, { raw: false });
            console.log(xlsArr[1]);
            // if file contains columns, check if the columns are matching to the expected fields

            // matching only the columns for the first row
            const obj = xlsArr[1];
            // for (let column in columnsMapper) {
            //     if (obj[column] === undefined ||) {
            //         console.log(obj[column])
            //         return reject(new Error("Columns do not match in the uploaded file"));
            //     }
            // }
            // verify is the file adheres to all the requirements
            const result = verifyData(xlsArr);
            // write to database only if the file is verified
            if (result['verified']) {
                return resolve(xlsArr)
            } else {
                reject(new Error(result['desc']))
            }

        }
        catch (err) {
            reject(err);
            console.log("Caught", err)
        }
    });

}

module.exports = excelToJson;