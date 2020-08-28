const shell = require('shelljs')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')

module.exports = (sourceDir, targetDir, sourceFileName, targetFileName) => {
  const spinner = ora(`Merging files from ${chalk.cyan(sourceFileName)} to ${chalk.cyan(targetFileName)}...`).start()
  try {
    shell.exec(`rsync -a ${sourceDir}/ ${targetDir}`)
    // shell.exec(`cp -R ${sourceDir}/ ${targetDir}`)
    spinner.succeed(`${chalk.green('文件合并结束!')}`)
    shell.exec(`rm -rf ${sourceDir}`)
    let gitDir = path.resolve('.git');
    if (targetFileName !== '.') {
      gitDir = path.resolve(targetFileName, '.git')
      shell.cd(targetFileName)
    }
    if(!fs.existsSync(gitDir)) {
      shell.exec(`git init`, {silent: true})
      spinner.succeed(`${chalk.green('git初始化完成!')}`)
    }
  } catch(err) {
    spinner.fail(`${chalk.red('文件合并失败!')}`)
    console.error(err)
  }
}