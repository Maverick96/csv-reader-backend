function verifyData(data) {

    // check for empty file
    if (data.length === 0) {
        return {
            verified: false,
            desc: 'Empty File'
        }
    }

    // number of rows of file should not be more than 20000
    if (data.length > 20000) {
        return {
            verified: false,
            desc: "File has more than 20000 rows"
        }
    }
    let row = {};
    for (let i = 0; i < data.length; i++) {
        row = data[i];
        // 'Forecast' value should be positive
        if (row['Forecast'] < 0) {
            return {
                verified: false,
                desc: "Values in columns are incorrect"
            }
        }
    }

    return {
        verified: true
    }

}

module.exports = verifyData;