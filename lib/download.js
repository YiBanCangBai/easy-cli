const download = require('download-git-repo')
const log = console.log
const ora = require('ora')
const chalk = require('chalk')

module.exports = (downloadUrl,projectName) => {
	const spinner = ora(`Loading template for ${chalk.cyan(projectName)}...`).start()
	download(downloadUrl, projectName, {clone: true}, (err)=> {
		if (!err) {
			spinner.succeed(`${chalk.green('Success')}`)
		} else {
			spinner.fail(`${chalk.red('下载模板失败!')}`)
			log(err)
		}
	})
}
