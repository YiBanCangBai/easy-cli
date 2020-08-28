const log = console.log
const ora = require('ora')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs-extra')
const path = require('path')

module.exports = (downloadUrl, sourceName, projectName) => {
	const spinner = ora(`Loading template for ${chalk.cyan(projectName)}...`).start()
	try {
		if (!shell.which('git')) {
			shell.echo('抱歉，请先安装git！');
			shell.exit(1);
		}
		shell.exec(`git clone ${downloadUrl}`)
		shell.exec(`rm -rf ${sourceName}/.git`)
		spinner.succeed(`${chalk.green('下载完成!')}`)
	} catch (err) {
		spinner.fail(`${chalk.red('下载模板失败!')}`)
		log(err)
	}
}
