#!/usr/bin/env node

'use strict';

const program = require('commander');

const args = require('./lib/args');
const send = require('./lib/send');
const travis = require('./lib/travis');

program
  .option('-t, --token <token>', 'GitHub Token')
  .option('-s, --slug <user/repo>', 'GitHub Repo Token (`user/repo`)')
  .option('-b, --branch <branch>', 'Branch to deploy on')
  .option('-f, --force', 'Force label generation')
  .parse(process.argv);

const options = {
  token: program.token,
  slug: program.slug,
  branch: program.branch,
  force: program.force,
};


args(options).then(opts => {
  return travis(opts).then(() => {
    return opts;
  });
}).then(opts => {
  return send(opts);
}).then(message => {
  console.log(message.message); // eslint-disable-line no-console
  process.exitCode = 0;
}).catch(e => {
  console.error(e.message); // eslint-disable-line no-console
  process.exitCode = 1;
});
