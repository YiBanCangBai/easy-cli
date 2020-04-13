#!/usr/bin/env node

const program = require('commander')
const create = require('./lib/create')
const templates = require('./lib/templates')
const download = require('./lib/download')
const chalk = require('chalk')
const ora = require('ora')

program
	.version('1.0.0')

program
	.command('create <template> <project>')
	.description('自动创建项目模板')
	.action(async (templateName, projectName) =>{
		await create(projectName)
		const { downloadUrl } = templates[templateName]
		download(downloadUrl, projectName)
	})

program
	.command('list')
	.description('所有可用模板都在这里')
	.action(() => {
		for(let key in templates) {
			ora(`${chalk.green(key)} ${chalk.cyan(templates[key].description)}`).succeed()
		}
	})

program
	.parse(process.argv)

