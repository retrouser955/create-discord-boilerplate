const { exec } = require('child_process')
async function createDiscordApp(folderName) {
    console.log('Cloning the github repository ... \n \n $ git clone https://github.com/retrouser955/discord.js-boilerplate.git ${folderName}')
    exec(`git clone https://github.com/retrouser955/discord.js-boilerplate.git ${folderName}`)
    console.log(`\n Finished Cloning the boilerplate github repo`)
}
module.exports = {
    createApp: createDiscordApp
}