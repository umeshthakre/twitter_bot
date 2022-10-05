const express = require('express');
const app = express();
require("dotenv").config();
const {PORT} = process.env;

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(PORT,(req,res)=>{
    console.log("running at port "+PORT);
});