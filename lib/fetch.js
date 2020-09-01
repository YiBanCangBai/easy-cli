const request = require('request')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const process = require('process')

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
    .pipe(fs.createWriteStream(`${process.env.HOME}/easyConfig.js`))
}