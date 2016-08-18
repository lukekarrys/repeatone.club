/* eslint no-magic-numbers:0 */
/* global Promise */

'use strict';

const childProcessExec = require('child_process').exec;
const stripAnsi = require('strip-ansi');
const escapeStringRegexp = require('escape-string-regexp');

const throwIt = (err) => {throw err;};

const cp = (command) => new Promise((resolve, reject) => childProcessExec(command, (err, stdout) => {
  if (err) {
    return reject(err);
  }

  return resolve(stripAnsi(stdout).split('\n').map((s) => s.trim()).filter(Boolean));
}));

const getBranches = () => cp('git ls-remote --heads').then((lines) => lines
  .map((b) => b.split(/\t/)[1].replace('refs/heads/', ''))
);

const getProjects = (regex) => cp('surge list').then((lines) => {
  if (lines.join(' ').indexOf('No Projects found.') > -1) {
    return Promise.reject(new Error('No projects found'));
  }

  return lines.slice(3).filter((p) => regex.test(p));
});

const teardownProject = (project) => {
  if (!project) {
    return Promise.reject(new Error('Must give a project to teardown'));
  }

  return cp(`surge teardown ${project}`).then((lines) => lines.slice(4));
};

const PROJECT_ENDS_WITH = process.argv.slice(2)[0];

if (!PROJECT_ENDS_WITH) {
  throwIt(new Error('Must pass an argument to match projects'));
}

Promise.all([
  getProjects(new RegExp(`${escapeStringRegexp(PROJECT_ENDS_WITH)}$`)),
  getBranches()
]).then((parts) => {
  const [projects, branches] = parts;

  const projectHasMissingBranch = (p) => branches.every((b) => p.indexOf(b) === -1);
  const teardown = projects.filter(projectHasMissingBranch);

  return Promise.all(teardown.map(teardownProject)).then((output) => {
    console.log(output.join('\n')); // eslint-disable-line no-console
  }).catch(throwIt);
}).catch(throwIt);
