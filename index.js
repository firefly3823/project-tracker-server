require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/conncetion')
//create an express application
const ptServer = express()
// use cors
ptServer.use(cors())
ptServer.use(express.json())
ptServer.use(router)
const PORT = 4000 || process.env.PORT

ptServer.listen(PORT, ()=>{
    console.log(`Project Server started at ${PORT} and waiting for request`);
})

ptServer.get('/',(req,res)=>{
    res.send(`<h1>Project Tracker server started and waiting for Client request</h1>`)
})
