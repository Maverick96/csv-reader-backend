# csv-reader-backend

## Prerequisite

[Install node version >= 12.7.0](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[Install mongod db >= 3.3.0-beta2](https://docs.mongodb.com/v3.2/administration/install-community/) 

**make sure that the mongodb service is running**

## Project Setup

> npm i

## Start Server


### Dev Mode

> npm run dev

## Production Mode

> npm start

## Environment Configuration

```
DB_URL=mongodb://localhost -- url to mongodb client
DB_PORT=27017   -- port on which db is listening to
DB_NAME=forecast-data  -- database to be used
APP_PORT=3001   -- port on which the server is running

```
