const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(4000,(req,res)=>{
    console.log("running at port 4000")
});