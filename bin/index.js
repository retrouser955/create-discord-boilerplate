#! /usr/bin/env node
const yargs = require("yargs")
const chalk = require('chalk')
// const utils = require('./utils.js')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const { execSync } = require('node:child_process')
const usage = "\n Usage <app_name> create a boilerplate code for discord.js"
const process = require('node:process')
const dirName = yargs
    .usage(usage)
    .option("d", { alias: "dir", describe: "File you want to create", type: "string", demandOption: true })
    .help(true)
    .argv;
const extraPkg = yargs
    .usage(usage)
    .option('p', { alias: "packages", describe: "Packges you want", type: "string", demandOption: false })
    .help(true)
    .argv;
(async () => {
    console.log(chalk.blue('Starting to clone from github into ' + yargs.argv.d))
    execSync(`git clone https://github.com/retrouser955/discord.js-boilerplate.git ${yargs.argv.d}`)
    console.log(chalk.blue(`Installing packages`))
    execSync(`cd ${process.cwd()}/${yargs.argv.d} && npm install`)
    console.log(chalk.green(`Finished installing packages!`))
    if(!yargs.argv.p) return console.log(chalk.green(`Process finished! Code is generated at '${yargs.argv.d}'`))
    console.log(chalk.blue(`Started installing extra packages`))
    execSync(`cd ${process.cwd()}/${yargs.argv.d} && npm install ${yargs.argv.p}`)
    console.log(chalk.green(`Process finished! Code is generated at '${yargs.argv.d}'`))
})()