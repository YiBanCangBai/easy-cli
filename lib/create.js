const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { windir } = process.env

async function create (projectName, options={}) {

  const inCurrent = projectName === '.'
	const targetDir = path.resolve(projectName || '.')

	console.log(
		chalk.green(`即将生成项目的目录: ${targetDir}\n该目录是否已存在: ${fs.existsSync(targetDir)}`)
	)

  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
			return {
				action: 'overwrite'
			}
    } else {
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
          }
        ])
        if (!ok) {
          return
        }
        return {
          action: 'merge'
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
          await fs.remove(targetDir)
					return {
						action: 'overwrite'
					}
        } else if (action === 'merge'){
					return {
						action: 'merge'
					}
				}
      }
    }
  } else {
		return {
			action: 'overwrite'
		}
	}
}

module.exports = create
