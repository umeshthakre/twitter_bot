const express = require('express');

require("dotenv").config();
const {PORT} = process.env;


const app = express();

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(PORT,(req,res)=>{
    console.log("running at port "+PORT);
});