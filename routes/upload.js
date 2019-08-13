// utils
const getEventEmitter = require('../utils/sendSSE');
const writeToDb = require('../utils/writeToDb');
const upload = require('../utils/fileUpload');
const excelToJson = require('../utils/excelToJson');
const deleteFile = require('../utils/deleteFile');

function uploadExcel(req, res) {

    upload(req, res, function (err, filename, path) {
        if (err) {
            res.json({ error_code: 1, error_desc: err.message });
            return;
        }

        const sendSSE = getEventEmitter();
        excelToJson(filename, path)
            .then(result => {

                console.log("REsult", result[0]);
                const data = {
                    error: false,
                    stage: 2,
                    msg: "Writing To Database"
                }

                //SSE denoting initialization of the writing to db
                sendSSE('myEvent', data);
                const db = req.app.locals.collections
                return writeToDb(filename, result, db);
            })
            .then(result => {
                // deleteFile(req.file.filename);
                const data = {
                    error: false,
                    stage: 3,
                    msg: "Completed Writing To Datbase"
                };
                //SSE denoting end of the writing to db
                sendSSE('myEvent', data);
                res.json({
                    error_code: 0
                })
            })
            .catch(err => {
                // deleteFile(req.file.filename);
                const data = {
                    error: true,
                    stage: 0,
                    msg: "Error In Writing To Database"
                };
                //SSE denoting error in writing to db
                sendSSE('myEvent', data);
                console.log(err);
                res.json({
                    error_code: 1,
                    error_desc: err.message
                })
            })
    })
}

module.exports = uploadExcel;





// function uploadData(req, res) {
//     const sse = generateSSE();
//     const client = req.app.locals.collections;
//     const db = client.db('forecast-data');
//     const fileName = req.body.fileName.substring(0, req.body.fileName.length - 4);
//     const collection = db.collection(fileName);
//     const data = req.body.data;
//     sse('write', 'writing to database');
//     collection.insertMany(data, (err, result) => {
//         if (err) {
//             console.log(err);
//             sse('complete', 'Failed to write data to database');
//             res.json({
//                 error_code: 500,
//                 error_desc: 'Insertion Failed'
//             });
//             return;
//         }
//         sse('complete', 'Completed writing to database');
//         res.json({
//             error_code: 0,
//             msg: 'Success'
//         });
//     })
// }

// module.exports = uploadData;