const express = require('express');
const bodyParser = require('body-parser')

const { PORT } = require("./config/server.config")

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
})
