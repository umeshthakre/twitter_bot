const twit = require("twit");
const T = new twit({
    consumer_key:process.env.API_KEY,
    consumer_secret:process.env.API_SECRET,
    access_token:process.env.ACCESS_TOKEN,
    access_token_secret:process.env.ACCESS_TOKEN_SECRET,
})
