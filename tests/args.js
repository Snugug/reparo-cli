import test from 'ava';
import args from '../lib/args';

test('No Token', t => {
  return args().then(() => {
    t.fail('Should Not Pass');
  }).catch(e => {
    t.is(e.message, 'GH_TOKEN not defined!');
  });
});

test('No Slug', t => {
  process.env.GH_TOKEN = '12345';

  return args().then(() => {
    t.fail('Should Not Pass');
  }).catch(e => {
    t.is(e.message, 'REPO_SLUG not defined!');
  });
});

test('Bad Slug', t => {
  process.env.GH_TOKEN = '12345';
  process.env.REPO_SLUG = 'snugug';

  return args().then(() => {
    t.fail('Should Not Pass');
  }).catch(e => {
    t.is(e.message, 'REPO_SLUG needs to contain user and repo name (e.g. \'snugug/reparo\'). Set to \'snugug\'');
  });
});

test('Good Response', t => {
  process.env.GH_TOKEN = '12345';
  process.env.REPO_SLUG = 'snugug/reparo-cli';

  const expected = {
    token: '12345',
    user: 'snugug',
    repo: 'reparo-cli',
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
  };

  return args().then((result) => {
    t.deepEqual(result, expected);
  });
});
