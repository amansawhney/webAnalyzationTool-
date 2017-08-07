const express = require('express');
const app = express();
const psi = require('psi');

//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/psi', (req, res) => {
  psi('theverge.com').then(data => {
    res.json(data.ruleGroups)
  });
});

app.listen(3000);
