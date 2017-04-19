import test from 'ava';
import args from '../lib/args';

test('Bad Slug', t => {
  process.env.GH_TOKEN = '12345';
  process.env.REPO_SLUG = 'snugug';

  return args().then(() => {
    t.fail('Should Not Pass');
  }).catch(e => {
    t.is(e.message, 'Repository Slug needs to contain user and repo name (e.g. \'snugug/reparo\'). Set to \'snugug\'');
  });
});

test('Good Response', t => {
  process.env.GH_TOKEN = '12345';
  process.env.REPO_SLUG = 'snugug/reparo-cli';

  const expected = {
    token: '12345',
    user: 'snugug',
    repo: 'reparo-cli',
    branch: 'master',
    force: false,
  };

  return args().then((result) => {
    t.deepEqual(result, expected);
  });
});

test('Good Response, Travis Token', t => {
  process.env.GH_TOKEN = '12345';
  process.env.TRAVIS_REPO_SLUG = 'snugug/reparo-cli';

  const expected = {
    token: '12345',
    user: 'snugug',
    repo: 'reparo-cli',
    branch: 'master',
    force: false,
  };

  return args().then((result) => {
    t.deepEqual(result, expected);
  });
});
