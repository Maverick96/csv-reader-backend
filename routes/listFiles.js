const listCollections = require('../utils/listCollections');
function listFiles(req, res) {
    const db = req.app.locals.collections;

    listCollections(db)
        .then(data => {
            res.json({
                error_code: 0,
                data
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                error_code: 500,
                error_desc: 'Listing Failed'
            });
        });

}

module.exports = listFiles;