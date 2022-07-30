const fs = require("fs");
const { exec } = require("child_process");
const {getRandom} = require('../lib/functions')
async function execute(bosco, msg, match) {
var quoted = msg.quoted ? msg.quoted : msg
if (isQuotedVideo || isQuotedAudio) {
let media = await bosco.downloadAndSaveMediaMessage(quoted);
let ran = getRandom('.mp3')
exec(`ffmpeg -i ${media} -vn ${ran}`, async (err) => {
fs.unlinkSync(media)
if (err) return reply(`_Err: ${err}_`)
let buffer453 = fs.readFileSync(ran)
bosco.sendMessage(msg.key.remoteJid, {document: buffer453, mimetype: 'audio/mpeg', fileName: `${bot_name}.mp3`}, { quoted : msg })
fs.unlinkSync(ran)
})
} else {
reply('_Reply to a video/audio_')
}
}

module.exports = { 
    command: "tomp3", 
    Type: "convert", 
    isDependent: false, 
    desc: "used to convert video/audio to mp3", 
    execute,
};
