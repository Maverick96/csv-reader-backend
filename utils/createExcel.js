const getEventEmitter = require('./sendSSE')
const path = require('path');
const fs = require('fs');
function createExcel(file, fileSize, saveTo, cb) {

    let uploadPercent = 0, uploadedSize = 0;
    // create createStream to the file path
    const writeStream = fs.createWriteStream(saveTo);
    // get the channel singleton
    const sendSSE = getEventEmitter();
    file.on('data', function (data) {
        // amount of the file uploaded
        uploadedSize = uploadedSize + data.length;
        // percentage of file uploaded
        uploadPercent = Math.floor((uploadedSize / fileSize) * 100)
        console.log(uploadPercent);
        const msg = {
            stage: 1,
            msg: uploadPercent,
            error: false
        }
        // send SSE to show file upload progress
        sendSSE('myEvent', msg);
        writeStream.write(data, 'base-64');
    });

    file.on('error', function (err) {
        return cb(err, null);

    });

    file.on('end', function () {
        console.log("end", saveTo)
        writeStream.end();
    });



}

module.exports = createExcel;