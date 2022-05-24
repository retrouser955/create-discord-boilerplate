#! /usr/bin/env node
const yargs = require("yargs")
const utils = require('./utils.js')
const usage = "\n Usage <app_name> create a boilerplate code for discord.js"
const options = yargs
    .usage(usage)
    .option("i", { alias: "input", describe: "File you want to create", type: "string", demandOption: true })
    .help(true)
    .argv;
utils.createApp(yargs.argv.i)