'use strict';

const request = require('request');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const url = require('url');

const reparo = process.env.REPARO || 'https://reparo.herokuapp.com/';
const api = url.resolve(reparo, 'api/labels');

const send = args => {
  return new Promise((res, rej) => {
    // Read Labels
    let labels = fs.readFileSync(path.join(process.cwd(), '.github', 'labels.yml'));
    labels = yaml.safeLoad(labels);

    const options = {
      url: api,
      method: 'POST',
      json: {
        labels,
        user: args.user,
        repo: args.repo,
        token: args.token,
      },
    };

    request(options, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        res(body);
      }
      else {
        rej(err);
      }
    });
  });
};

module.exports = send;
