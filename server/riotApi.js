(function(exports) {
  'use strict';

  const https = require('https');
  const q = require('q');
  const _ = require('lodash');
  const getUrl = require('./fetchUtils').getUrl;
  const key = require('./env/apiKey');
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

  staticData.getVersionsData(key).then(function(data) {
    version = data[0];
  });

  exports.getCurrentGame = function(id, region) {
    return getUrl('https://na1.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/' + id + '?api_key=' + key)
    .then(addChampInformationForGame)
    .then(addSummonerInformationForGame);
  };

  exports.getSummonerId = function(name, region) {
    return getUrl('https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + name + '?api_key=' + key);
  };

  function addSummonerInformationForGame(game) {
    return q.all(_.map(game.participants, function(participant) {
      return getSoloQInformation(participant.summonerId)
      .then(function(info) {
        _.assign(participant, info);
      });
    }))
    .then(function() { return game });
  }

  function addChampInformationForGame(game) {
    _.forEach(game.participants, function(participant) {
      participant.champ = {
        icon: getChampImageUrl(participant.championId),
        name: champData[participant.championId].name
      };
    });

    return game;
  }

  function getSoloQInformation(id) {
    if (id === undefined) {
      return q.defer().reject();
    }

    return getUrl('https://na1.api.riotgames.com/lol/league/v3/positions/by-summoner/' + id + '?api_key=' + key)
    .then(function(rankedInfo) {
      return _.find(rankedInfo, function(queue) {
        return queue.queueType === 'RANKED_SOLO_5x5';
      });
    });
  }

  function getItemImageUrl(id) {
    let name = itemData[id].image.full,
        group = itemData[id].image.group;

    return 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/' + group + '/' + name;
  }

  function getChampImageUrl(id) {
    let name = champData[id].image.full,
        group = champData[id].image.group;

    return 'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/' + group + '/' + name;
  }

  })(exports);
