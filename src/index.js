const express = require('express');
const bodyParser = require('body-parser')

const { PORT } = require("./config/server.config");
const errorHandler = require("./utils/error.handler");
const apiRouter = require('./routes');
const connectToDB = require('./config/db.config');

const app = express();

// parse data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())

//if any re comes with rute /api, map to apiRouter
app.use("/api", apiRouter)

app.get("/ping", (req, res)=>{
    return res.json({message: "Problem service is alive"})
}) 

//its the last middleware: if any error comes, just redirect to errorHandler
//In problem controller, we have used next(error) to redirect to errorHandler
app.use(errorHandler)

app.listen(PORT,async ()=>{
    console.log(`Server is listening at PORT: ${PORT}`)

    //now connect to db
    await connectToDB();
    console.log("Successfully connected to db");

    // throw new BaseError("Some Error",404,{errorMessage: "Something went wrong"})

})
