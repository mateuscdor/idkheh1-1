const fs = require('fs')
async function execute(bosco, msg) {
const reply = (teks) => {
           bosco.sendMessage(msg.key.remoteJid, { text: teks, contextInfo:{"externalAdReply": {"title": ` botname`,"body": `ownername`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync(`./media/anime.jpg`),"sourceUrl": `https://youtu.be/LlDZeuFLqCw`}}}, { quoted: msg})
        }
reply('alive')
        }

module.exports = { 
    command: "alive", 
    Type: "misc", 
    isDependent: false, 
    desc: "check the bot is alive or not", 
    execute,
};
