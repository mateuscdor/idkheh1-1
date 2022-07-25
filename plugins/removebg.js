const fs = require("fs");
const got = require('got');
const FormData = require('form-data');
const stream = require('stream');
const {promisify} = require('util');
const pipeline = promisify(stream.pipeline);

const execute = async (bosco, msg) => { 
if ((!isQuotedImage) && (!isImage))  return await reply("_Reply to an image_");
        var quoted = msg.quoted ? msg.quoted : msg
        var location = await bosco.downloadAndSaveMediaMessage(quoted);
        var form = new FormData();
        form.append('image_file', fs.createReadStream(location));
        form.append('size', 'auto');
        var rbg = await got.stream.post('https://api.remove.bg/v1.0/removebg', {
            body: form,
            headers: {'X-Api-Key': 'WVKe6M9LqbKQwzL8rHc9Wu99'}
        }); 
        await pipeline(
		    rbg,
		    fs.createWriteStream('rbg.png')
        );
  await bosco.sendMessage(from, { image: fs.readFileSync('rbg.png'), contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply: { title: bot_footer, body: '', previewType: "PHOTO", thumbnail: bot_img, sourceUrl: owner_link } } }, { quoted: msg });
};

module.exports = { 
  command: "removebg", 
  Type: "convert", 
  isDependent: false, 
  desc: "used to remove background of an image.", 
  execute,
};
