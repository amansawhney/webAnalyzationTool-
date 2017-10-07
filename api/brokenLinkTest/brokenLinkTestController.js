const blc = require('broken-link-checker');

exports.getBrokenLinks = (req, res, next) => {
  var data = {
    sucessUrls: [],
    faliureUrls: [],
    numberOfFailed: 0,
    finished: false,
  };
    setTimeout(endSearch, 15000);
    var siteChecker = new blc.SiteChecker(
    {
      maxSocketsPerHost: 1000,
      excludedSchemes: [
        'data',
        'geo',
        'javascript',
        'mailto',
        'sms',
        'tel',
        'pdf',
      ],
      excludedKeywords: ['pdf'],
    },
    {
      robots: function(robots, customData) {},
      html: function(tree, robots, response, pageUrl, customData) {},
      junk: function(result, customData) {},
      link: function(result, customData) {
        if (!result.broken) {
          data.sucessUrls.push(result.url.resolved);
        } else {
          data.faliureUrls.push(result.url.resolved);
        }
        if (data.finished) {
          sendData(data, res);
            data.finished = false;
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
        if (!data.finished) {
          sendData(data, res);
        }

        console.log('done');
      },
    },
  );
  siteChecker.enqueue('http://' + req.body.url, {});
    function endSearch() {
        data.finished = true;
    }

};

function sendData(data, res) {
  res.send({
    numberOfFailed: data.numberOfFailed,
    faliureUrls: data.faliureUrls,
    numberChecked: data.sucessUrls.length + data.faliureUrls.length,
  });
}

