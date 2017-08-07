const express = require('express');
const app = express();

//middleWare
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cleans up posted URL
app.use(function(req, res, next) {
    req.body.url = req.body.url.replace('http://', '').replace('www.', '').replace('https://', '');
  next();
});

//routers
const pageSpeedAnalysisRouter = require('./pageSpeedAnalysis/pageSpeedAnalysisRouter');
const ssllabsSiteSecurityTestRouter = require('./ssllabsSiteSecurityTest/ssllabsSiteSecurityTestRouter');
const tenonADATestRouter = require('./tenonADATest/tenonADATestRouter');
const brokenLinkTestRouter = require('./brokenLinkTest/brokenLinkTestRouter');
const googleTagDetectorRouter = require('./googleTagDetector/googleTagDetectorRouter');

app.use('/psi', pageSpeedAnalysisRouter);
app.use('/ssl', ssllabsSiteSecurityTestRouter);
app.use('/ada', tenonADATestRouter);
app.use('/links', brokenLinkTestRouter);
app.use('/tags', googleTagDetectorRouter);

app.get('/', (req, res) => {
  res.send("This is an API not an app, don't try and get me!");
});

// Detect Google Analytics for a given page with GTM (does everything)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
