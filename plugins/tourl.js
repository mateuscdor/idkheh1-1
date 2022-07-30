const fs = require("fs");
const util = require("util");
const { UploadFileUgu, TelegraPh } = require('../lib/uploader')
async function execute(bosco, msg) {
    var quoted = msg.quoted ? msg.quoted : msg
    let media = await bosco.downloadAndSaveMediaMessage(quoted);
    if (isQuotedImage) {
        let anu = await TelegraPh(media);
        reply(util.format(anu));
    } else if (isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        let anu = await UploadFileUgu(media);
        reply(util.format(anu));
    } else {
        reply('_Reply to a image/video/audio/sticker_')
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
