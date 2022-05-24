const { exec } = require('child_process')
async function createDiscordApp(folderName) {
    console.log('Cloning the github repository ...')
    const cloning =  exec(`git clone https://github.com/retrouser955/discord.js-boilerplate.git ${folderName}`)
    cloning.stdout.on('data', (data) => {
        console.log(data)
    })
}
module.exports = {
    createApp: createDiscordApp
}