const express = require('express');

require("dotenv").config();
const {PORT} = process.env;

const twit = require("./twit");
const app = express();

function getTweets  () {
    return new Promise((resolve, reject)=>{
        let params = {
            q:"code",
            count:10,
        }

        twit.get('search/tweets',params,(err,data)=>{
            if(err){
                return rejedct(err);
            }
            return resolve(data);
        })

    })
}

function postReTweets (id){
    return new Promise((resolve, reject)=>{
        let params = {
            id,
        };
        twit.post('statuses/retweet/:id',params,(err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
}

async function main(){
    
}


app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(PORT,(req,res)=>{
    console.log("running at port "+PORT);
});