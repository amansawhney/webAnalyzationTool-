module.exports = app => {
  const bodyParser = require('body-parser');
  const timeout = require('connect-timeout'); //express v4

  app.use(timeout('100000s'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //cleans up posted URL
  app.use(function(req, res, next) {
    if (req.body.url) {
      req.body.url = req.body.url
        .replace('http://', '')
        .replace('www.', '')
        .replace('https://', '');
    }
    next();
  });
};
