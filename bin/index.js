#! /usr/bin/env node
const yargs = require("yargs")
const chalk = require('chalk')
// const utils = require('./utils.js')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const { execSync } = require('node:child_process')
const usage = "\n Usage <app_name> create a boilerplate code for discord.js"
const options = yargs
    .usage(usage)
    .option("i", { alias: "input", describe: "File you want to create", type: "string", demandOption: true })
    .help(true)
    .argv;
(async () => {
    console.log(chalk.blue('Starting to clone from github into ' + yargs.argv.i))
    execSync(`git clone https://github.com/retrouser955/discord.js-boilerplate.git ${yargs.argv.i}`)
    execSync(`cd ${yargs.argv.i}`)
    console.log(chalk.blue(`Installing packages`))
    execSync(`npm install`)
    console.log(chalk.green(`Finished installing packages! Your bot is now ready`))
})()