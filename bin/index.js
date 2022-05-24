#! /usr/bin/env node
const yargs = require("yargs")
// const utils = require('./utils.js')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const { exec } = require('node:child_process')
const usage = "\n Usage <app_name> create a boilerplate code for discord.js"
const options = yargs
    .usage(usage)
    .option("i", { alias: "input", describe: "File you want to create", type: "string", demandOption: true })
    .help(true)
    .argv;
(async () => {
    exec(`git clone https://github.com/retrouser955/discord.js-boilerplate.git ${yargs.argv.i}`)
    await delay(4000)
    exec(`cd ${yargs.argv.i}`)
    const data = exec(`npm install`)
    data.stdout.on('data', (data) => { console.log(data) })
})()