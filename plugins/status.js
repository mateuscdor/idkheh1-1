const fs = require("fs");
const {getBuffer, fetchJson, isUrl} = require("../lib/myfunc");
async function execute(bosco, msg, match) {
console.log(match)
if (isUrl(match)) {
 if(match.includes('mp4')){		           			    				
				let link = await getBuffer(match)
                bosco.sendMessage(msg.key.remoteJid, { video: link, gifPlayback: true },{ jpegThumbnail: bot_img, sendEphemeral: true, contextInfo: { forwardingScore: 9999, externalAdReply: { title: bot_footer, body: '', previewType: "PHOTO", thumbnail: bot_img, sourceUrl: match } }, quoted: msg })
                } else {
                let link = await getBuffer(match)
                bosco.sendMessage(msg.key.remoteJid, { image: link }, { jpegThumbnail: bot_img ,contextInfo: { forwardingScore: 9999, externalAdReply: { title: bot_footer, body: '', previewType: "PHOTO", thumbnail: bot_img, sourceUrl: match } }, quoted: msg })                      
               }             
} else {
let efxv = await fetchJson('https://api.pepesir.repl.co/efxvid.json')
let number = 1
let sections = []  
for (let hi of efxv.result) {
const list = {title: number++,
      rows: [
         {
          title: `${hi.caption}`,
          description: `${hi.desc}`,
          rowId: `${handlers}status ${hi.video}`
}, 
]
}
sections.push(list)  
} 
  await bosco.sendMessage(
msg.key.remoteJid, 
{
text: "\n\n",
footer: bot_footer,
title: `Status video list`,
buttonText: "CLICK HERE",
sections
}, { quoted : msg }) 
}
}

module.exports = { 
    command: "status", 
    Type: "download", 
    isDependent: false, 
    desc: "", 
    execute,
};
