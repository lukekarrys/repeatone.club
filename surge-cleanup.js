/* global Promise */

'use strict';

const cp = require('child_process').exec;

const getBranches = () => new Promise((resolve, reject) => cp('git ls-remote --heads', (err, stdout, stderr) => {
  if (err) return reject(err);

  return resolve(
    stdout
    .split('\n')
    .map((str) => str.trim())
    .filter(Boolean)
    .map((b) => b.split(/\t/)[1].replace('refs/heads/', ''))
  );
}));

const getProjects = (regex) => new Promise((resolve, reject) => cp('surge list', (err, stdout, stderr) => {
  if (err) return reject(err);

  if (stdout.indexOf('No Projects found.') > -1) {
    return reject(new Error('No projects could be found'));
  }

  const SURGE_PRFEIX_OUTPUT = 5; // Number of lines surge prefixes output with

  return resolve(
    stdout
    .split('\n')
    .slice(SURGE_PRFEIX_OUTPUT)
    .map((str) => str.trim())
    .filter(Boolean)
    .filter((p) => regex.test(p))
  );
}));

const PROJECT_REGEX = /-repeatoneclub\.surge\.sh$/;

Promise.all([
  getProjects(PROJECT_REGEX),
  getBranches()
]).then((parts) => {
  const [projects, branches] = parts;

  const projectHasMissingBranch = (p) => branches.every((b) => p.indexOf(b) === -1);
  const teardown = projects.filter(projectHasMissingBranch);

  // eslint-disable-next-line no-console
  console.log(teardown);
}).catch((err) => {
  throw err;
});
