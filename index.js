#! /usr/local/bin/node

'use strict';

const args = require('./lib/args');
const send = require('./lib/send');

args().then(arg => {
  return send(arg);
}).then(message => {
  console.log(message); // eslint-disable-line no-console
  process.exitCode = 0;
}).catch(e => {
  console.error(e); // eslint-disable-line no-console
  process.exitCode = 1;
});
