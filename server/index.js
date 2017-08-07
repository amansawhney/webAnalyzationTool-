const express = require('express');
const app = express();
const psi = require('psi');
const keys = require('../keys');

//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers
const pageSpeedAnalysisRouter = require('./pageSpeedAnalysis/pageSpeedAnalysisRouter');

app.use('/psi', pageSpeedAnalysisRouter);

app.listen(3000);
