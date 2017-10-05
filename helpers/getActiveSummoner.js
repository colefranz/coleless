const key = require('../server/env/apiKey');
const getUrl = require('../server/fetchUtils').getUrl;

getUrl('https://na1.api.riotgames.com/lol/spectator/v3/featured-games?api_key=' + key)
.then(function(data) {
  console.log(data.gameList[0].participants[0].summonerName);
});
