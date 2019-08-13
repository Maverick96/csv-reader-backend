const fs = require('fs');
module.exports = function (fileName) {
    fs.unlink('./uploaded_files/' + fileName, (err) => {
        console.log("Done", err)
    })
}