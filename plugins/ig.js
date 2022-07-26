const hx = require('hxz-api');
const { instagramdl, instagramdlv2, instagramdlv3 } = require('@bochilteam/scraper');
const {isUrl, getBuffer} = require("../lib/myfunc");
const igRegex = /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com(?:\/.+?)?\/(p|reel|tv)\/)([\w-]+)(?:\/)?(\?.*)?$/
const execute = async (bosco, msg, match) => {
  if (!match)
            return await reply(`_Example : ${handlers}ig link_`);
const vid = igRegex.exec(match);
if (vid) {
                let url = match
	            hx.igdl(url)
	            .then(async(result) => {	  
	            let text = '';
            text += ' *INSTAGRAM DOWNLOADER*' + '\n\n';
            text += '⬙ _Username_          : ' + result.user.username + '\n\n';
            text += '⬙ _Fullname_          : ' + result.user.fullName + '\n\n';
            text += '⬙ _Followers_         : ' + result.user.followers + '\n\n';
            text += '⬙ _Following_         : ' + result.user.following + '\n\n';
            text += '⬙ _Id_                : ' + result.user.id + '\n\n';
            text += '⬙ _Filetype_          : ' + result.medias[0].fileType + '\n\n';
            text += '⬙ _Type_              : ' + result.medias[0].type + '\n\n';
            text += '⬙ _No of media_       : ' + result.medias.length + '\n\n';
            text += '⬙ _Url_               : ' + url + '';        	                                  	                      	            
                bosco.sendMessage(msg.key.remoteJid, { image: { url: result.user.profilePicUrl },contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply:{title: bot_footer , mediaType: 2, thumbnail: bot_img, mediaUrl: url }}, caption: text, jpegThumbnail: await getBuffer(result.user.profilePicUrl) }, { quoted: msg });

		        for(let i of result.medias) {		
		        if(i.url.includes('mp4')){		           			    				
				let link = await getBuffer(i.url)
                bosco.sendMessage(msg.key.remoteJid, { video: link, jpegThumbnail: await getBuffer(i.preview), caption: `_Instagram ${i.type}_` }, { quoted: msg })
                } else {
                let link = await getBuffer(i.url)
                bosco.sendMessage(msg.key.remoteJid, { image: link, jpegThumbnail: await getBuffer(i.preview), caption: `_Instagram ${i.type}_` }, { quoted: msg })                      
               }
              }
            }).catch((err) => {
instagramdlv3(`${url}`).then(async (data) => {            
var buf = await getBuffer(data[0].thumbnail)        
bosco.sendMessage(msg.key.remoteJid, { video: { url: data[0].url }, jpegThumbnail:buf, caption: bot_footer }, { quoted: msg })
}).catch((err) => {
reply(`_Error !_`)
})

})     
} else {
reply('_link is not valid!_');
}          
};

module.exports = {
  command: "ig",
  Type: "download", 
  isDependent: false, 
  desc: "used to download media from instagram.", 
  execute,
};
