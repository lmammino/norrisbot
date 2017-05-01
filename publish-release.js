const fs = require('fs');
const path = require('path');
const request = require('request-promise');

const USER_AGENT = 'publish-release-script-1';
const GH_API_ENDPOINT = 'https://api.github.com';
const GH_UPLOAD_URL = 'https://api.github.com/repos/lmammino/norrisbot/releases';

const token = process.argv[2];
const repo = process.argv[3];
const release = process.argv[4];
const buildFolder = process.argv[5] || './build';

console.log(`Creating release "${release}" from "${buildFolder}"`);

request({
  uri: `${GH_API_ENDPOINT}/repos/${repo}/releases`,
  method: 'POST',
  body: JSON.stringify({
    tag_name: release,
    name: `v${release}`,
  }),
  headers: {
    'User-Agent': USER_AGENT,
    'Content-Type': 'application/json',
    Authorization: `token ${token}`,
  },
})
.then((response) => {
  const data = JSON.parse(response);
  console.log(`Created release: ${data.url}`);

  const uploadUrl = `${GH_UPLOAD_URL}/${data.id}`;

  return new Promise((resolve, reject) => {
    fs.readdir(buildFolder, (err, items) => {
      if (err) {
        return reject(err);
      }

      return resolve(Promise.all(items.map((item) => {
        const file = fs.createReadStream(path.join(buildFolder, item));

        return request({
          uri: `${uploadUrl}?name=${item}`,
          method: 'POST',
          body: file,
          headers: {
            'User-Agent': USER_AGENT,
            'Content-Type': 'application/octet-stream',
            Authorization: `token ${token}`,
          },
        });
      })));
    });
  });
})
.then((data) => {
  console.log('✅  Done');

  console.log(data);
})
.catch((err) => {
  console.error('Failed to create release', err);
  process.exit(1);
});
