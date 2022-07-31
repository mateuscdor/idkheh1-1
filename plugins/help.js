const {generateWAMessageFromContent, 
		relayMessage
	} = require("@adiwajshing/baileys")
const moment = require("moment-timezone")
const fs = require("fs");
const {getBuffer,sleep} = require("../lib/myfunc");
async function execute(bosco, msg) {
let plugins = bosco.plugins;
        let command = '';
        plugins.forEach((plugin) => {
            if (!plugin.isDependent) {
                    command += `\n┊▢ *${handlers}${plugin.command}*`
            }
});
const pushname = msg.pushName || "undefined"
const time = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                                let d = new Date
				let locale = 'en'
				const day = d.toLocaleDateString(locale, { weekday: 'long' })
				const calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
		       })

        let help = `──────〔 𝖕𝖊𝖕𝖊𝖘𝖎𝖗 〕──────
 𖤥 ᴜꜱᴇʀ : ${pushname} 
 𖤥 ᴄʀᴇᴀᴛᴏʀ : pepesir 
──────〔 𝖎𝖓𝖋𝖔 〕
 𖤥 ᴛɪᴍᴇ : ${time}
 𖤥 ᴅᴀʏ : ${day}
 𖤥 ᴅᴀᴛᴇ : ${date} - ${calender}
┌─────〔 𝖈𝖔𝖒𝖒𝖆𝖓𝖉𝖘 〕
┊${command}
┊
└────────────────────𔒝`;
  const fgi = {
	 key: { 
         fromMe: false,
	      participant: `0@s.whatsapp.net`, ...(from ? 
	 { remoteJid: "6289643739077-1613049930@g.us" } : {}) 
                },
	 message: { 
                 "videoMessage": { 
                 "title": bot_footer,
                 "h": bot_footer,
                 'duration': '99999', 
                 'gifPlayback': 'true', 
                 'caption': bot_footer,
                 'jpegThumbnail': bot_img
                        }
                       }
	                  } 
  
  anu = await generateWAMessageFromContent(from,{
					"productMessage": {
						"product": {
								"productImage": {
								 "url": "https://mmg.whatsapp.net/d/f/Ahb4wGLv5WRRHNDjX0oscWGguHSUTuBXrBLUDCzO0_0Z.enc",
						"mimetype": "image/jpeg",
						"fileSha256": "LxreCgbGFLCuMD0STZaaTDsyHuNg/s06FHXg9vm+qmo=",
						"fileLength": "109459",
						"height": 1280,
						"width": 1274,
						"mediaKey": "1SBZlmQxZQR+qZBVlBR5RcvDQNfYSRiYPT8uWDaEzLY=",
						"fileEncSha256": "V6JNiialXPUGHn1j7Tz7YkXpU+QzOkBvOV7GZL2PRS4=",
						"jpegThumbnail": bot_img
                                },
                            "productId": "9999999",
							"title": `Bot commands`, 
							"description": help,
							"productImageCount": 1
						},
						"businessOwnerJid": `917736622139@s.whatsapp.net`,
						"contextInfo": {
							"forwardingScore": 9999,
							"isForwarded": true
						}
					}
				},{quoted: fgi, contextInfo: {}})
                  bosco.relayMessage(msg.key.remoteJid, anu.message, { messageId: anu.key.id })
}
module.exports = {
    command: 'help',
    Type: 'misc',
    isDependent: false,
    desc: 'used to get bot commands',
    execute
};
