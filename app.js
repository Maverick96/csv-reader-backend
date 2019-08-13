require('dotenv').config()
const mongo = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

global.appRoot = path.resolve(__dirname)

const app = express();


// route handlers
const uploadFile = require('./routes/upload');
const fetchData = require('./routes/fetch');
const listFile = require('./routes/listFiles');
const bindClient = require('./routes/event').bindClient;

const url = `${process.env.DB_URL}:${process.env.DB_PORT}`
const port = process.env.APP_PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader(
        'Access-Control-Allow-Origin', '*'
    );
    next();
})

app.post('/upload', uploadFile);

app.post('/fetch', fetchData);

app.get('/list-files', listFile);

app.get('/event', bindClient);



mongo.connect(url, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    // share mongo clinet to manage all requests
    app.locals.collections = client.db('forecast-data');
    app.listen(port, () => console.log("server started at port " + port));

});