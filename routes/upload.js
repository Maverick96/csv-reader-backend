// utils
const getEventEmitter = require('../utils/sendSSE');
const writeToDb = require('../utils/writeToDb');
const upload = require('../utils/fileUpload');
const excelToJson = require('../utils/excelToJson');
const listCollections = require('../utils/listCollections');

function uploadExcel(req, res) {

    upload(req, res, function (err, filename, path, collectionName) {
        if (err) {
            res.json({ error_code: 1, error_desc: err.message });
            return;
        }

        const sendSSE = getEventEmitter();
        const db = req.app.locals.collections
        listCollections(db)
            .then(names => {
                console.log("names", names);
                // list collections to check if the collection already exists
                const col = names.find(collection => collection.name === collectionName);
                if (col) {
                    throw new Error('File Already Exists');
                }
                return excelToJson(filename, path)
            })
            .then(result => {
                console.log("REsult", result[0]);
                const data = {
                    error: false,
                    stage: 2,
                    msg: "Writing To Database"
                }

                //SSE denoting initialization of the writing to db
                sendSSE('myEvent', data);
                return writeToDb(filename, result, db, collectionName);
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