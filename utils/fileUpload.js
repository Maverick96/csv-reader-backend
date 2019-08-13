const Busboy = require('busboy');
const createExcel = require('./createExcel');
const path = require('path');
function upload(req, res, cb) {
    const busboy = new Busboy({ headers: req.headers });
    const fileSize = req.headers['content-length'];

    let newName = '';
    let orgName = '';
    let saveTo = '';
    const datetimestamp = Date.now();
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        orgName = filename;
        // create temp name to store the file
        newName = 'file' + '-' + datetimestamp + '.' + filename.split('.')[filename.split('.').length - 1];
        // path to where the file needs to be saved
        saveTo = path.join(global.appRoot, '/uploaded_files/' + newName);
        createExcel(file, fileSize, saveTo, cb);

    });
    busboy.on('finish', function () {
        console.log("Finish", orgName)
        setTimeout(function () {
            cb(null, orgName, saveTo)
        },
            1000
        )
    })
    req.pipe(busboy);

}

module.exports = upload;