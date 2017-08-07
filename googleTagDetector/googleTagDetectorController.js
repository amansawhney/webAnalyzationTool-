const gtmd = require('google-tag-manager-detection');

exports.getGADATA = (req, res) => {
  gtmd.checkUrlForGaViaGtm('https://www.' + req.body.url, function(result) {
    res.send(result);
  });
};
