const log = console.log
const ora = require('ora')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs-extra')
const path = require('path')

module.exports = (downloadUrl, projectName) => {
	const spinner = ora(`Loading template for ${chalk.cyan(projectName)}...`).start()
	try {
		shell.exec(`git clone ${downloadUrl}`)
		spinner.succeed(`${chalk.green('Success')}`)
	} catch (err) {
		spinner.fail(`${chalk.red('下载模板失败!')}`)
		log(err)
	}
}
