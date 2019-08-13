function write(filename, data, db, collectionName) {

    console.log("NEW coll", collectionName);
    const collection = db.collection(collectionName);
    // delete collection if present
    return collection.insertMany(data);
}

module.exports = write;