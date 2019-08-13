function fetchData(req, res) {
    const db = req.app.locals.collections;
    const fileName = req.body.fileName;
    const collection = db.collection(fileName);
    collection.find().toArray((err, data) => {
        if (err) {
            res.json({
                error_code: 500,
                error_desc: "Couldn't read data"
            });
            return;
        }
        res.json({
            error_code: 0,
            data
        });
    })

}


module.exports = fetchData;