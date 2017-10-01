
const q = require('q');
const https = require('https');

module.exports = {
  getUrl: getUrl
};

function getUrl(url) {
  let deferred = q.defer();

  console.log('fetching', url);
  https.get(url, function(res) {
    console.log('got status of', res.statusCode, 'from', url);
    if (res.statusCode !== 200) {
      deferred.reject(res.statusCode);
    }

    let rawData = '';

    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
      try {
        console.log('fetch complete sucessfully');
        deferred.resolve(JSON.parse(rawData));
      } catch (e) {
        console.log('fetch complete failure');
        deferred.reject(e.message);
      }
    });
  }, function(e) {
    console.log('fetch complete failure');
    deferred.reject(e);
  });

  return deferred.promise;
}
