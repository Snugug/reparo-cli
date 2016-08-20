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

    request.post({
      url: api,
      formData: {
        labels,
        user: args.user,
        repo: args.repo,
        token: args.token,
      },
    }, (err, response, body) => {
      if (err) {
        rej(err);
      }

      res(body.message);
    });
  });
};

module.exports = send;
