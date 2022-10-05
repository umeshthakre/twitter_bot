require("dotenv").config();
const { response } = require("express");
const express = require('express');

const T = require("./twit");
var bodyParser = require('body-parser')
const path = require("path")
const {PORT} = process.env;
const twit = require("./twit");
const app = express();
app.use(bodyParser.json())
app.set('views',path.join(__dirname,"views"));
app.use(express.static(__dirname + "/views"));



function getTweets  (searchParam,textToTweet,numberOFTweets) {
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



async function postReply(userName,tweetId,textToTweet){
    return new Promise((resolve,reject)=>{
        T.post('statuses/update',{in_reply_to_status_id:tweetId,status:`@${userName} `+textToTweet},(err,data)=>{
            if(err){
                return reject(err);
            }
            return resolve(data);
        })
    })
   
}

async function main(searchParam,textToTweet,numberOFTweets){
    try{
        const data = await getTweets(searchParam,textToTweet,numberOFTweets);
        const tweets = data.statuses;
        for await (let tweet of tweets){
            try{
                const userName = tweet.user.screen_name;
                const tweetId = tweet.id_str;

                 postReply(userName,tweetId,textToTweet).then((data,err)=>{
                    if(err){
                        return res.send("error");
                    }
                    console.log(tweet);
                })
                

            }catch(e){
                console.log(e)
                
            }
        }
    }catch(e){
        console.log(e)
    }
}


app.get("/",(req,res)=>{
    res.render("form.ejs");
})

app.post("/tweetreply",async (req,res)=>{
    try {
        console.log(req.body)
        const {searchParam,textToTweet,numberOFTweets} = req.data;
        await main(searchParam,textToTweet,numberOFTweets).then((err,data)=>{

        })
        res.send("tweets sent successfully");
    } catch (error) {
        console.log(error)
    }
})


app.listen(PORT,(req,res)=>{
    console.log("running at port "+PORT);
});