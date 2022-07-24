const fs = require("fs");
const {toAudio} = require("../lib/converter");
async function execute(bosco, msg, match) {
var quoted = msg.quoted ? msg.quoted : msg
if (isQuotedVideo || isQuotedAudio) {
let media = await bosco.downloadAndSaveMediaMessage(quoted);
 let audio = await toAudio(media, 'mp4')
 bosco.sendMessage(msg.key.remoteJid, {document: audio, mimetype: 'audio/mpeg', fileName: `${bot_name}.mp3`}, { quoted : msg })
} else {
reply('_Reply to video/audio_')
}
}

module.exports = { 
    command: "tomp3", 
    Type: "convert", 
    isDependent: false, 
    desc: "used to convert video/audio to mp3", 
    execute,
};
