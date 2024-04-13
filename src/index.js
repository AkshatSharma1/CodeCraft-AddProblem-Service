const express = require('express');
const bodyParser = require('body-parser')

const { PORT } = require("./config/server.config");
const BaseError = require('./errors/base.error');

const app = express();

// parse data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())


app.get("/ping", (req, res)=>{
    return res.json({message: "Problem service is alive"})
}) 

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT: ${PORT}`)

    // throw new BaseError("Some Error",404,{errorMessage: "Something went wrong"})
})
