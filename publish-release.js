/* eslint no-console: "off" */
/* eslint import/no-extraneous-dependencies: "off" */

const fs = require('fs');
const path = require('path');
const request = require('request-promise');

const USER_AGENT = 'publish-release-script-1';
const GH_API_ENDPOINT = 'https://api.github.com';
const GH_UPLOAD_URL = id => `https://uploads.github.com/repos/lmammino/norrisbot/releases/${id}/assets`;

const token = process.argv[2];
const repo = process.argv[3];
const release = process.argv[4];
const buildFolder = process.argv[5] || './build';

console.log(`Creating release "${release}" from "${buildFolder}"`);

const uploadFile = releaseId => file => new Promise((resolve, reject) => {
  console.log('attaching', file.path);
  return fs.readFile(file.path, (error, buffer) => {
    if (error) {
      return reject(error);
    }

    return resolve(request.post({
      body: buffer,
      url: `${GH_UPLOAD_URL(releaseId)}?name=${file.name}`,
      headers: {
        'User-Agent': USER_AGENT,
        'Content-Type': 'application/zip',
        Authorization: `token ${token}`,
      },
    }));
  });
});

let releaseId;

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
  releaseId = data.id;
  console.log(`Created release: ${data.url}`);

  return new Promise((resolve, reject) => {
    fs.readdir(buildFolder, (err, items) => {
      if (err) {
        return reject(err);
      }

      return resolve(items.map(item => ({
        name: item,
        path: path.resolve(path.join(buildFolder, item)),
      })));
    });
  });
})
.then(files => Promise.all(files.map(uploadFile(releaseId))))
.then(() => {
  console.log('✅  Done');
})
.catch((err) => {
  console.error('Failed to create release', err);
  process.exit(1);
});
