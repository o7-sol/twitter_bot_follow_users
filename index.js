require('dotenv').config()

const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});
 
const params = {screen_name: 'YOUR USER SCREEN NAME'};

const followUser = (arr, delay, incr = 0) => {
    if(arr.length > incr) {
        incr = incr + 1;

        setTimeout( () => {
            client.post('friendships/create', {user_id: arr[incr]}, function(error, tweets, response){
                console.log(`User ${arr[incr]} followed.`);
            })
            followUser(arr, delay, incr);
        }, delay)
    }
}

client.get('friends/ids', params, function(error, tweets, response) {
  if (!error) {
      const friends = JSON.parse(response.body);
      let friendsIds = friends.ids.slice(0, 400);
      followUser(friendsIds, 2000, 0);
  }
});