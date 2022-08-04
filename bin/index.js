#! /usr/bin/env node
const yargs = require("yargs")
const chalk = require('chalk')
const fs = require('node:fs')
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
console.log(chalk.blue(`Starting the process to create files`))
const code = `const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js')
const config = require('./config.json')
const { Routes, InteractionType } = require('discord-api-types/v10')
const { REST } = require('@discordjs/rest')
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    partials: [Partials.Channel]
})
const commands = new Collection()
const fs = require('fs')
const slash = []
const rest = new REST({ version: '10' }).setToken(config.token)
const commandFiles = fs.readdirSync(\`\${__dirname}/commands\`)
for(const file of commandFiles) {
    const command = require(\`./commands/\${file}\`)
    commands.set(command.name, command)
    slash.push(command.data.toJSON())
}
(async () => {
    console.log('Registering slash commands')
    try {
        await rest.put(
            Routes.applicationCommands(config.id),
            { body: slash }
        )
        console.log('Finishing registering slash commands')
    } catch (error) {
        console.log(error)
    }
})()
client.on('interactionCreate', async (ctx) => {
    if(ctx.type !== InteractionType.ApplicationCommand) return
    try {
        commands.get(ctx.commandName).run(client, ctx)
    } catch (e) {
        console.log(e)
        if(!ctx.replied) return ctx.reply('There was an error while executing that command!')
        ctx.channel.send('There was an error while executing that command!')
    }
})
.on('ready', () => {
    console.log(\`\${client.user.tag} is ready!\`)
})

client.login(config.token)
`
fs.mkdirSync(`${process.cwd()}/${yargs.argv.d}`)
fs.writeFileSync(`${process.cwd()}/${yargs.argv.d}/index.js`, code)
console.clear()
console.log(`Created file: ${process.cwd()}/${yargs.argv.d}/index.js`)
const configFile = {
    "token": "Discord Bot Token",
    "id": "Discord Bot Id"
}
const configJson = JSON.stringify(configFile, null, 4)
fs.writeFileSync(`${process.cwd()}/${yargs.argv.d}/config.json`, configJson)
console.clear()
console.log(`Created file: ${process.cwd()}/${yargs.argv.d}/config.json`)
const packageJson = {
    "name": "javascript-bot",
    "version": "0.0.1",
    "scripts": {
      "start": "node .",
      "dev": "nodemon ."
    },
    "dependencies": {
      "@discordjs/rest": "^1.0.1",
      "discord-api-types": "^0.36.3",
      "discord.js": "^14.0.3"
    }
}
fs.writeFileSync(`${process.cwd()}/${yargs.argv.d}/package.json`, JSON.stringify(packageJson, null, 4))
console.clear()
console.log(`Created file ${process.cwd()}/${yargs.argv.d}/config.json`)
const pingCmdCode = `const { SlashCommandBuilder } = require("discord.js")
module.exports = {
    name: 'help',
    description: 'Check if the bot is alive or not',
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if the bot is alive or not'),
    async run(client, ctx) {
        ctx.reply(\`🏓 Pong! My ping is \${client.ws.ping} ms\`)
    }
}
`
fs.mkdirSync(`${process.cwd()}/${yargs.argv.d}/commands`)
fs.writeFileSync(`${process.cwd()}/${yargs.argv.d}/comands/ping.js`, pingCmdCode)
console.clear()
console.log(`Created file: ${process.cwd()}/${yargs.argv.d}/commands/ping.js`)
console.log(`Installing discord.js, discord-api-types and @discordjs/rest`)
execSync(`cd ${process.cwd()}/${yargs.argv.d} && npm install`)
console.log(`Finished installing discord.js, discord-api-types and @discordjs/rest`)
if(!yargs.argv.p) return console.log(chalk.green(`Process finished! Code is generated at '${yargs.argv.d}'`))
console.log(chalk.blue(`Started installing extra packages`))
execSync(`cd ${process.cwd()}/${yargs.argv.d} && npm install ${yargs.argv.p}`)
console.log(chalk.green(`Process finished! Code is generated at '${yargs.argv.d}'`))