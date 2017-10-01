
const fs = require('fs');
const q = require('q');
const path = require('path');

const getUrl = require('./fetchUtils').getUrl;

const champUrl = 'https://na1.api.riotgames.com/lol/static-data/v3/champions?tags=image&dataById=true&api_key=';
const itemUrl = 'https://na1.api.riotgames.com/lol/static-data/v3/items?tags=image&api_key=';
const versionsUrl = 'https://na1.api.riotgames.com/lol/static-data/v3/versions?api_key=';
const champFile = 'champ.json';
const itemFile = 'item.json';
const versionsFile = 'versions.json';

function getData(file, url, converter) {
  const filePath = path.resolve('server', 'staticData', file);

  converter = converter || function(data) { return data };

  return function(key) {
    const deferred = q.defer();

    fs.readFile(filePath, function(err, data) {
      // could not find file
      if (err) {
        console.log ("Fetching data from", url);
        getUrl(url + key).then(function(res) {
          let data = res.data;

          fs.writeFile(filePath, converter(data));

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
  getChampData: getData(champFile, champUrl, JSON.stringify),
  getItemData: getData(itemFile, itemUrl, JSON.stringify),
  getVersionsData: getData(versionsFile, versionsUrl)
}
