const request = require('request');
const check = require('httpcheck');
const cheerio = require('cheerio');

exports.getVersion = (req, res, next) => {
  request(
    {
      url: 'https://' + req.body.url + '/feed',
      rejectUnauthorized: false,
    },
    function(error, response, body) {
      if (error) {
        next(error);
      }
      if (!body) {
        res.send({ version: 'false' });
      } else if (body.lastIndexOf('https://wordpress.org/?') < 0) {
        res.send({ version: 'false' });
      } else {
        var currentVersion = body
          .substring(
            body.lastIndexOf('https://wordpress.org/?') + 25,
            body.lastIndexOf('https://wordpress.org/?') + 30,
          )
          .replace('</', '');
        var latestVersion = 'hi';
        request(
          {
            url: 'https://wordpress.org/news/category/releases/',
            rejectUnauthorized: false,
          },
          function(error, response, body) {
            if (!error) {
              var $ = cheerio.load(body);
              $(
                '#pagebody > div > div > table > tbody > tr:nth-child(1) > td > a',
              ).filter(function() {
                var data = $(this);
                latestVersion = data['0'].attribs.href
                  .substring(
                    data['0'].attribs.href.lastIndexOf('wordpress-') + 10,
                    data['0'].attribs.href.lastIndexOf('wordpress-') + 15,
                  )
                  .replace(/-/g, '.')
                  .replace('/[A-Za-z]/g', '');
                res.json({
                  version: currentVersion,
                  latest: latestVersion,
                  isOnLatestVersion: currentVersion == latestVersion,
                });
              });
            }
          },
        );
      }
    },
  );
};
