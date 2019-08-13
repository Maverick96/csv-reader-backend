require('dotenv').config()
// dependencies
const mongo = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mkdir = require('make-dir');


global.appRoot = path.resolve(__dirname)

// initialize express
const app = express();


// route handlers
const uploadFile = require('./routes/upload');
const fetchData = require('./routes/fetch');
const listFile = require('./routes/listFiles');
const bindClient = require('./routes/event').bindClient;

// env variables
const url = `${process.env.DB_URL}:${process.env.DB_PORT}`
const port = process.env.APP_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader(
        'Access-Control-Allow-Origin', '*'
    );
    next();
});

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
    // create a directory to store uploaded files
    (async () => {

        try {
            await mkdir('uploaded_files');
            console.log("Directory created successfully");
        }
        catch (e) {
            console.log("Error in creating directory");
            console.error(e)
        }

    })();
});