const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const shell = require('shelljs')
const { windir } = process.env

module.exports = (sourceDir, targetDir, targetFileName) => {
  const spinner = ora(`Loading template for ${chalk.cyan(targetFileName)}...~~~~~${sourceDir}`).start()
		try {
			fs.copySync(sourceDir, targetDir)
      spinner.succeed(`${chalk.green('模板拷贝已完成!')}`)
      if(!windir) {
        fs.removeSync(sourceDir)
      } else {
        shell.exec(`rmdir /s ${sourceDir}`)
      }
			shell.cd(targetFileName)
			shell.exec(`git init`, {silent: true})
      spinner.succeed(`${chalk.green('git初始化完成!')}`)
		} catch (err) {
      spinner.fail(`${chalk.red('模板拷贝失败!')}`)
			console.error(err)
		}
}