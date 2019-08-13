function listCollection(db) {
    return db.listCollections().toArray();
}

module.exports = listCollection;