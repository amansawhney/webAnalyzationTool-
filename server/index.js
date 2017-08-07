const express = require('express');
const app = express();
const psi = require('psi');
const keys = require('../keys');

//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/psi', (req, res) => {
  var data = {
    moblieSpeed: '',
    moblieUsability: '',
    Speed: '',
  };
  psi(req.body.url, {
    strategy: 'mobile',
  }).then(moblie => {
    console.log(moblie);
    data.moblieSpeed = moblie.ruleGroups.SPEED.score;
    data.moblieUsability = moblie.ruleGroups.USABILITY.score;
    psi(req.body.url, {
      strategy: 'desktop',
    }).then(desktop => {
      console.log(req.body.url);
      console.log(desktop);
      data.Speed = desktop.ruleGroups.SPEED.score;
      res.send(data);
    });
  });
});

app.listen(3000);
