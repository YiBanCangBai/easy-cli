const log = console.log
const ora = require('ora')
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs-extra')
const path = require('path')
const { windir } = process.env

module.exports = (downloadUrl, sourceName, projectName) => {
	const spinner = ora(`Loading template for ${chalk.cyan(projectName)}...`).start()
  log('sourceName~~', sourceName)
	try {
		if (!shell.which('git')) {
			shell.echo('抱歉，请先安装git！');
			shell.exit(1);
		}
		shell.exec(`git clone ${downloadUrl}`)
    if (!windir) {
      shell.exec(`rm -rf ${sourceName}/.git`)
    } else {
      shell.exec(`rmdir /s ${sourceName}/.git`)
    }
		spinner.succeed(`${chalk.green('下载完成!')}`)
	} catch (err) {
		spinner.fail(`${chalk.red('下载模板失败!')}`)
		log(err)
	}
}
