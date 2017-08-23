const blc = require('broken-link-checker');

exports.getBrokenLinks = (req, res, next) => {
  var data = {
    sucessUrls: [],
    faliureUrls: [],
    numberOfSucess: 0,
    numberOfFailed: 0,
  };
  var siteChecker = new blc.SiteChecker(
    {
      'user-agent': 'node-spider',
      rejectUnauthorized: false,
    },
    {
      robots: function(robots, customData) {},
      html: function(tree, robots, response, pageUrl, customData) {},
      junk: function(result, customData) {},
      link: function(result, customData) {
        console.log(result);
        if (!result.broken) {
          data.sucessUrls.push(result.url.resolved);
        } else {
          data.faliureUrls.push(result.url.resolved);
        }
      },
      page: function(error, pageUrl, customData) {},
      site: function(error, siteUrl, customData) {},
      end: function() {
        data.numberOfFailed = data.faliureUrls.length;
        data.numberOfSucess = data.sucessUrls.length;
        res.send(data);
        console.log('done');
      },
    },
  );
  siteChecker.enqueue('http://' + req.body.url, {
    'user-agent': 'node-spider',
  });
};
