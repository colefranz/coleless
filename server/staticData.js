
const fs = require('fs');
const q = require('q');

const getUrl = require('./fetchUtils').getUrl;

const champUrl = 'https://na1.api.riotgames.com/lol/static-data/v3/champions?tags=image&dataById=true&api_key=';
const itemUrl = 'https://na1.api.riotgames.com/lol/static-data/v3/items?tags=image&api_key=';
const champFile = 'champ.json';
const itemFile = 'item.json';

function getData(file, url) {
  return function(key) {
    const deferred = q.defer();

    fs.readFile(file, function(err, data) {
      // could not find file
      if (err) {
        console.log ("Fetching data from", url);
        getUrl(url + key).then(function(res) {
          let data = res.data;
          fs.writeFile(file, JSON.stringify(data));

          deferred.resolve(data);
        }, function(e) {deferred.reject(e)});
      } else {
        console.log ("Returning data from", file);
        deferred.resolve(JSON.parse(data));
      }
    });

    return deferred.promise;
  }
}

module.exports = {
  getChampData: getData(champFile, champUrl),
  getItemData: getData(itemFile, itemUrl)
}
