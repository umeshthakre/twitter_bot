require("dotenv").config();
const { response } = require("express");
const express = require('express');
const T = require("./twit");

const {PORT} = process.env;
const twit = require("./twit");
const app = express();

function getTweets  () {
    return new Promise((resolve, reject)=>{
        let params = {
            q:"narendra modi",
            tweet_mode:"extended",
            result_type:"recent",
            count:1,
        }

        twit.get('search/tweets',params,(err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        })

    })
}



async function postReply(userName,tweetId){
    return new Promise((resolve,reject)=>{
        T.post('statuses/update',{in_reply_to_status_id:tweetId,status:`@${userName} I am a bot dont mind me`},(err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
   
}

async function main(){
    let count = 1;
    try{
        const data = await getTweets();
        const tweets = data.statuses;
        console.log(data);
        for await (let tweet of tweets){
            try{
                const userName = tweet.user.screen_name;
                const tweetId = tweet.id_str;

                // await postReply(userName,tweetId)
                console.log(tweet)

            }catch(e){
                console.log("fail" )
            }
        }
    }catch(e){
        console.log(e)
    }
}


app.get("/",(req,res)=>{
    res.send("hi")
})

main();

app.listen(PORT,(req,res)=>{
    console.log("running at port "+PORT);
});