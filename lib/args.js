'use strict';

const args = (opts) => {
  const options = opts || {};

  return new Promise((res, rej) => {
    const token = options.token || process.env.GH_TOKEN;
    const slug = options.slug || process.env.REPO_SLUG || process.env.TRAVIS_REPO_SLUG;
    const branch = options.branch || process.env.BRANCH || 'master';
    const force = options.force || false;

    if (typeof token === 'undefined') {
      rej(new Error('GitHub token not defined!'));
    }
    else if (typeof slug === 'undefined') {
      rej(new Error('Repository Slug not defined!'));
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
        branch,
        force,
      });
    }
  });
};

module.exports = args;
