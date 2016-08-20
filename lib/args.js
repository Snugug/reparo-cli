'use strict';

const args = () => {
  return new Promise((res, rej) => {
    const token = process.env.GH_TOKEN;
    const slug = process.env.REPO_SLUG || process.env.TRAVIS_REPO_SLUG;

    if (typeof token === 'undefined') {
      rej(new Error('GH_TOKEN not defined!'));
    }
    else if (typeof slug === 'undefined') {
      rej(new Error('REPO_SLUG not defined!'));
    }
    else if (slug.indexOf('/') < 0) {
      rej(new Error(`REPO_SLUG needs to contain user and repo name (e.g. 'snugug/reparo'). Set to '${slug}'`));
    }
    else {
      const user = slug.split('/').shift();
      const repo = slug.split('/').splice(-1, 1).join('/');

      res({
        token,
        user,
        repo,
      });
    }
  });
};

module.exports = args;
