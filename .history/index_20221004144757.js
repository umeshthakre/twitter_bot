const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(process.env.PORT,(req,res)=>{
    console.log("running at port "+process.env.PORT)
});