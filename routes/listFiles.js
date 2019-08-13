function listFiles(req, res, next) {
    const db = req.app.locals.collections;
    db.listCollections().toArray(function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                error_code: 500,
                error_desc: 'Listing Failed'
            });
            return;
        }
        res.json({
            error_code: 0,
            data
        });
    });

}

module.exports = listFiles;