const shell = require('shelljs')
const ora = require('ora')
const chalk = require('chalk')

module.exports = (sourceDir, targetDir, sourceFileName, targetFileName) => {
  const spinner = ora(`Merging files from ${chalk.cyan(sourceFileName)} to ${chalk.cyan(targetFileName)}...`).start()
  try {
    shell.exec(`rsync -a ${sourceDir}/* ${targetDir}`)
    spinner.succeed(`${chalk.green('文件合并结束!')}`)
    shell.exec(`rm -rf ${sourceDir}`)
  } catch(err) {
    spinner.fail(`${chalk.red('文件合并失败!')}`)
    console.error(err)
  }
}