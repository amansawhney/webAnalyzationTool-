const blc = require('broken-link-checker');

exports.getBrokenLinks = (req, res, next) => {
  var data = {
    sucessUrls: [],
    faliureUrls: [],
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
        console.log(data.sucessUrls.length);
        if (!result.broken) {
          data.sucessUrls.push(result.url.resolved);
        } else {
          data.faliureUrls.push(result.url.resolved);
        }
        if (data.sucessUrls.length + data.faliureUrls.length === 200) {
          res.send({
            numberOfFailed: data.numberOfFailed,
            faliureUrls: data.faliureUrls,
          });
        }
      },
      page: function(error, pageUrl, customData) {
        if (error) {
          console.log(error);
          next(error);
        }
      },
      site: function(error, siteUrl, customData) {
        if (error) {
          console.log(error);
          next(error);
        }
      },
      end: function() {
        data.numberOfFailed = data.faliureUrls.length;
        if (data.sucessUrls.length + data.faliureUrls.length < 200) {
          res.send({
            numberOfFailed: data.numberOfFailed,
            faliureUrls: data.faliureUrls,
          });
        }
        console.log('done');
      },
    },
  );
  siteChecker.enqueue('http://' + req.body.url, {});
};
