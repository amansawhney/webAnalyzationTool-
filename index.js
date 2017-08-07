const express = require('express');
const app = express();

//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routers
const pageSpeedAnalysisRouter = require('./pageSpeedAnalysis/pageSpeedAnalysisRouter');
const ssllabsSiteSecurityTestRouter = require('./ssllabsSiteSecurityTest/ssllabsSiteSecurityTestRouter');
const tenonADATestRouter = require('./tenonADATest/tenonADATestRouter');
const brokenLinkTestRouter = require('./brokenLinkTest/brokenLinkTestRouter');

app.use('/psi', pageSpeedAnalysisRouter);
app.use('/ssl', ssllabsSiteSecurityTestRouter);
app.use('/ada', tenonADATestRouter);
app.use('/links', brokenLinkTestRouter);

app.get('/', (req, res) => {
  res.send("This is an API not an app, don't try and get me!");
});

app.listen(3000);
