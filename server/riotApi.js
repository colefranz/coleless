(function(exports) {
  'use strict';

  const getUrl = require('./fetchUtils').getUrl;
  const key = 'RGAPI-df6d1c81-9a0e-42a0-8562-66465c298648';
  const https = require('https');
  const staticData = require('./staticData');

  var champData,
      getChampImageUrl,
      itemData,
      version;

  staticData.getChampData(key).then(function(data) {
    champData = data;
  });

  staticData.getItemData(key).then(function(data) {
    itemData = data;
  });

  exports.getCurrentGame = function(id, region) {
    return getUrl('https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + id + '?api_key=' + key)
    .then(function(currentGame) {
      currentGame.participants.forEach(function(participant) {
        participant.champ = {
          icon: getChampImageUrl(participant.championId),
          name: champData[participant.championId].name
        };
      });

      return currentGame;
    });
  };

  exports.getSummonerId = function(name, region) {
    return getUrl('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name + '?api_key=' + key);
  };

  function getItemImageUrl(id) {
    let name = itemData[id].image.full,
        group = itemData[id].image.group;

    return 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/' + group + '/' + name;
  }

  function getChampImageUrl(id) {
    console.log(champData);
    let name = champData[id].image.full,
        group = champData[id].image.group;

    return 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/' + group + '/' + name;
  }

  })(exports);
