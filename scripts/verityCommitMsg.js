/** @format */

const chalk = require('chalk');
const msgPath = process.env.HUSKY_GIT_PARAMS || process.env.GIT_PARAMS || '.git/COMMIT_EDITMSG';
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(revert:)?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release|workflow)(\(.+\))?:.{1,50}/;

if (!commitRE.test(msg)) {
  console.log('git commit信息校验不通过');
  console.error(`git commit的信息格式不对`, `比如 fix: xxbug`, `具体校验逻辑看 scripts/verifyCommit.js`);
  process.exit(1);
}
