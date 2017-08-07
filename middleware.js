module.exports = app => {
  const bodyParser = require('body-parser');
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
