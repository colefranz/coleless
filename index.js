'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = module.exports.app = exports.app = express();
const port = process.argv[2] || 3000;

// if asked for a file, look for it in app
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

// if that file isn't found serve up the html as we want
// the app the handle every other route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/summoners', function(req, res) {
  console.log(req.body);
  if (req.body.name === undefined) {
    res.status(400).send({msg: 'Summoner name was empty.'});

    return;
  }
   res.setHeader('Content-Type', 'application/json');

  riotApi.getSummonerId(req.body.name)
    .then(function(summoner) {
      return riotApi.getCurrentGame(summoner.id);
    })
    .then(function(currentGame) {
      res.json(currentGame);
    }, function(status) {
      res.status(status || 500).send();
    });
});

app.listen(port, function() {
  console.log('Listening on ' + port);
});
