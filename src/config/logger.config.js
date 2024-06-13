const winston = require("winston")
const { LOG_DB_URL } = require('./server.config');
require('winston-mongodb')

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