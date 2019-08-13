function write(filename, data, db) {
    const fileName = filename.substring(0, filename.length - 4);
    console.log("NEW data", data);
    const collection = db.collection(fileName);
    // delete collection if present
    return collection.insertMany(data);
}

module.exports = write;