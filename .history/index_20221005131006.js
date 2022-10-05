require("dotenv").config();
const { response } = require("express");
const express = require('express');
const T = require("./twit");

const {PORT} = process.env;
const twit = require("./twit");
const app = express();

function getTweets  (searchParam,textToTweet,numberOFTweets,) {
    return new Promise((resolve, reject)=>{
        let params = {
            q:searchParam,
            tweet_mode:"extended",
            result_type:"recent",
            count:numberOFTweets,
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
        T.post('statuses/update',{in_reply_to_status_id:tweetId,status:`@${userName} `+textToTweet},(err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
   
}

async function main(){
    try{
        const data = await getTweets();
        const tweets = data.statuses;
        for await (let tweet of tweets){
            try{
                const userName = tweet.user.screen_name;
                const tweetId = tweet.id_str;

                await postReply(userName,tweetId)
                console.log(tweet)

            }catch(e){
                console.log(e)
            }
        }
    }catch(e){
        console.log(e)
    }
}


app.get("/",(req,res)=>{
    res.send("hi")
})

app.post("/tweetreply",(req,res)=>{
    try {
        main()
    } catch (error) {
        console.log(error)
    }
    
})

main();

app.listen(PORT,(req,res)=>{
    console.log("running at port "+PORT);
});