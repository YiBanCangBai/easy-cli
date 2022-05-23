const request = require('request')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const process = require('process')

const { windir, HOME, USERPROFILE } = process.env
// 区分windows与mac
let file_path = windir ? USERPROFILE : HOME

module.exports = (url) => {
  request
    .get(url)
    .on('error', function (err) {
      console.log(err)
    })
    .on('response', function (res) {
      console.log(
        chalk.green(`statusCode: ${res.statusCode}`)
      )
      console.log(
        chalk.green(`content-type: ${res.headers['content-type']}`)
      )
    })
    .pipe(fs.createWriteStream(`${file_path}/easyConfig.js`))
}