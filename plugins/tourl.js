const fs = require("fs");
const util = require("util");
const { UploadFileUgu, TelegraPh } = require('../lib/uploader')
async function execute(bosco, msg) {
    var quoted = msg.quoted ? msg.quoted : msg
    let media = await bosco.downloadAndSaveMediaMessage(quoted);
    if (isQuotedImage) {
        let anu = await TelegraPh(media);
        bosco.reply(msg.key.remoteJid,util.format(anu));
    } else if (isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        let anu = await UploadFileUgu(media);
        bosco.reply(msg.key.remoteJid,util.format(anu));
    }
    await fs.unlinkSync(media);
}
module.exports = {
  command: "tourl", 
  Type: "convert", 
  isDependent: false, 
  desc: "used to convert media into url", 
  execute,
};
