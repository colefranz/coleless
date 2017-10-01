'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = module.exports.app = exports.app = express();
const port = process.argv[2] || 3000;
const riotApi = require('./server/riotApi');

// if asked for a file, look for it in app
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

// if that file isn't found serve up the html as we want
// the app the handle every other route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/currentgame', function(req, res) {
  const name = req.body.name;

  if (name === undefined) {
    res.status(400).send({msg: 'Summoner name was empty.'});

    return;
  }
  res.setHeader('Content-Type', 'application/json');

  console.log('getting current game for:', name);
  riotApi.getSummonerId(name)
    .then(function(summoner) {
      const id = summoner.id;

      console.log('got id of ', id, ' for', name);
      console.log('now fetching current game for:', id);

      return riotApi.getCurrentGame(id);
    })
    .then(function(currentGame) {
      console.log('found current game for', name);

      res.json(currentGame);
    }, function(status) {
      console.log('failed finding current game for', name, 'with status', status);
      res.status(status || 500).send();
    });
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});
