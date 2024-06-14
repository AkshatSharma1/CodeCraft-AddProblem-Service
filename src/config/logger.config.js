const winston = require("winston")
const { LOG_DB_URL } = require('./server.config');
require('winston-mongodb')

const { Writable } = require("stream")
const {logToCosmosDB} = require("../client_api's/cosmosClient")

const allowedTransports = [];

//transport configuration for console based printing
allowedTransports.push(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:MM:SS'
        }),
        winston.format.printf((log)=>`${log.timestamp} [${log.level.toUpperCase()}] : ${log.message} `)
    )
}))

//tranposrt for mongodb based 
allowedTransports.push(new winston.transports.MongoDB({
    level: 'error', //oly erorr log will be saved
    db: LOG_DB_URL,
    collection: 'logs',
}))

// The below transport configuration enables logging in a file
allowedTransports.push(new winston.transports.File({
    filename: `app.log`
}))

//connecting to cosmos db using streams since direct connection not available
const customStream = new Writable({
    write(chunk, encoding, callback){
        const message = chunk.toString();
        console.log("Log intercepted in custom transport", message);
        logToCosmosDB("error", message);
        callback(); //write completed
    }
})

allowedTransports.push(new winston.transports.Stream({
    stream: customStream
}))

const logger = winston.createLogger({
    //we are going to create our own format, default is json
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:MM:SS'
        }),
        winston.format.printf((log)=>`${log.timestamp} [${log.level.toUpperCase()}] : ${log.message} `)
    ),
    //transports argument
    transports: allowedTransports,
})

module.exports = logger;