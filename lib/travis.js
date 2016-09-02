'use strict';

const travis = (options) => {
  return new Promise((res, rej) => {
    const run = options.branch;
    const branch = process.env.TRAVIS_BRANCH;
    const pr = process.env.TRAVIS_PULL_REQUEST;

    // Can force this to run
    if (options.force) {
      res(true);
    }

    if (typeof branch === 'undefined') {
      res(true);
    }
    else if (pr !== 'false') {
      rej(new Error('Reparo will not run on pull requests'));
    }
    else if (branch === run) {
      res(true);
    }
    else {
      rej(new Error(`Reparo will only run on branch '${run}'`));
    }
  });
};

module.exports = travis;
