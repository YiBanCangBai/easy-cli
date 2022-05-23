#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const create = require('./lib/create')
const process = require('process')
const { windir, HOME, USERPROFILE } = process.env
// 区分windows与mac
let file_path = windir ? USERPROFILE : HOME
// 如果本地没有执行bind命令绑定配置文件，走默认配置
if (!fs.existsSync(`${file_path}/easyConfig.js`)) {
  file_path = '.'
}

const templates = require(`${file_path}/easyConfig.js`)
const download = require('./lib/download')
const overwrite = require('./lib/overwrite')
const merge = require('./lib/merge')
const fetch = require('./lib/fetch')
// const { log } = console

program
	.version('1.3.0')

program
	.command('create <template> <project>')
	.description('Generate local project template')
	.action(async (templateName, projectName) =>{
		try {
			const res = await create(projectName)
			if (!res) return
			const { downloadUrl, name } = templates[templateName]
			const sourceDir = path.resolve(name)
			const targetDir = path.resolve(projectName || '.')
			download(downloadUrl, name, projectName)
			switch(res.action) {
				case 'overwrite':
					overwrite(sourceDir, targetDir, projectName)
					break;
				case 'merge':
					merge(sourceDir, targetDir, name, projectName)
					break;
				default:
					break;
			}
		} catch (err) {
			console.log(`${chalk.cyan(err)}`)
		}
	})

program
	.command('bind <url>')
	.description('Fetching remote config file')
	.action(async(url) => {
		await fetch(url)
	})

program
	.command('list')
	.description('All available templates here')
	.action(() => {
		for(let key in templates) {
			ora(`${chalk.green(key)} ${chalk.cyan(templates[key].description)}`).succeed()
		}
	})

program
	.parse(process.argv)

