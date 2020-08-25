const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')

module.exports = (sourceDir, targetDir, targetFileName) => {
  const spinner = ora(`Loading template for ${chalk.cyan(targetFileName)}...`).start()
  if (fs.existsSync(sourceDir)) {
		try {
			fs.copySync(sourceDir, targetDir)
      spinner.succeed(`${chalk.green('模板拷贝已完成!')}`)
      fs.removeSync(sourceDir)
		} catch (err) {
			console.error(err)
		}
	} else {
		spinner.fail(`${chalk.red('模板拷贝失败!')}`)
	}
}