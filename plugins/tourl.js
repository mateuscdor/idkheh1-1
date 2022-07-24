const fs = require("fs");
const util = require("util");
const { UploadFileUgu, TelegraPh } = require('../lib/uploader')
async function execute(bosco, msg) {
    let media = await bosco.downloadAndSaveMediaMessage(quoted);
    if (isQuotedImage) {
        let anu = await TelegraPh(media);
        reply(util.format(anu));
    } else if (isQuotedVideo || isQuotedAudio || isQuotedSticker) {
        let anu = await UploadFileUgu(media);
        reply(util.format(anu));
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
