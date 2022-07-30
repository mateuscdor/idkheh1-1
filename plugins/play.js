const yts = require("yt-search");
const ytdl = require('ytdl-core');
const fs = require("fs");
const {getBuffer} = require("../lib/myfunc");
const { FileSize, h2k } = require('../lib/functions');
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

const execute = async (bosco, msg, match) => {
  if (!match) return reply(`_Example : ${handlers}play text/link_`)
		const vid = ytIdRegex.exec(match)
		if (vid) {
let ytteks = match
if (ytteks.includes("https://youtube.com/channel/")) return reply("_Give a valid video link_")
if(ytteks.includes("https://youtu.be/")){
var videoId = ytteks.replace('https://youtu.be/', '')
} else if(ytteks.includes("https://youtube.com/watch?v=")){
var videoId = ytteks.split('=')[1]
} else if(ytteks.includes("https://youtube.com/shorts/")){
var videoId = ytteks.replace('https://youtube.com/shorts/', '')
}  
 let link =`https://youtube.com/watch?v=${videoId}` 
 let dlink =`https://youtu.be/${videoId}`
 let anu = await yts(link)
 if(anu.all.length == "0") return reply("_No result found_")
 try{
var foto = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
} catch (err){
var foto = anu.all[0].image
}
 
let info = await ytdl.getInfo(link);
let format = ytdl.filterFormats(info.formats, 'audioonly');
if(Number(format.contentLength) > 20000000 ) return reply(`_File size is ${FileSize(format.contentLength)}\nI cant download 😤_`)

let text = '';            
text += ' *𝚈𝙾𝚄𝚃𝚄𝙱𝙴 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*' + '\n\n';
text += `
📂 _Title_    : ${info.videoDetails.title}
📄 _Size_     : ${FileSize(format[0].contentLength)}
🆔 _Id_.      : ${videoId}
⏲️ _Duration_ : ${anu.all[0].timestamp}
📊 _Viewers_  : ${h2k(anu.all[0].views)}
🌐 _Upload at_: ${anu.all[0].ago}
🔖 _Author_   : ${anu.all[0].author.name}
👤 _Channel_  : ${anu.all[0].author.url}
🔗 _Url_      : ${anu.all[0].url}
📝 _Discription_: ${anu.all[0].description}`

let buttons = [
  {buttonId: `${handlers}song ${dlink}`, buttonText: {displayText: 'Song'}, type: 1},
  {buttonId: `${handlers}video ${dlink}`, buttonText: {displayText: 'Video'}, type: 1}
   ]
  let buttonMessage = {
  image: { url: foto },
  caption: text,
  footer: bot_footer,
  buttons: buttons,
  headerType: 4
   }
  await bosco.sendMessage(msg.key.remoteJid, buttonMessage, { quoted: msg })
    } else {
let search = await yts(match)                   
let sections = []   
let listmenu = [`play ${search.all[0].url}`,`play ${search.all[1].url}`,`play ${search.all[2].url}`,`play ${search.all[3].url}`,`play ${search.all[4].url}`,`play ${search.all[5].url}`,`play ${search.all[6].url}`,`play ${search.all[7].url}`,`play ${search.all[8].url}`,`play ${search.all[9].url}`,`play ${search.all[10].url}`,`play ${search.all[11].url}`,`play ${search.all[12].url}`,`play ${search.all[13].url}`,`play ${search.all[14].url}`,`play ${search.all[15].url}`,`play ${search.all[16].url}`,`play ${search.all[17].url}`,`play ${search.all[18].url}`,`play ${search.all[19].url}`]
      let listmenuu = [`${search.all[0].title}`,`${search.all[1].title}`,`${search.all[2].title}`,`${search.all[3].title}`,`${search.all[4].title}`,`${search.all[5].title}`,`${search.all[6].title}`,`${search.all[7].title}`,`${search.all[8].title}`,`${search.all[9].title}`,`${search.all[10].title}`,`${search.all[11].title}`,`${search.all[12].title}`,`${search.all[13].title}`,`${search.all[14].title}`,`${search.all[15].title}`,`${search.all[16].title}`,`${search.all[17].title}`,`${search.all[18].title}`,`${search.all[19].title}`]
      let nombor = 1
      let startnum = 0
      let startnumm = 0
      for (let x of listmenu) {
      const list = {title: nombor++,
      rows: [
         {
          title: `${listmenuu[startnum++]}`,
          description: ``,
          rowId: `${handlers}${x}`
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
title: `_${match}_`,
buttonText: "CLICK HERE",
sections
}, { quoted : msg }) 
} 
}
module.exports = {
  command: "play", //command with prefix. Ex command: '!test'
  Type: "download", //
  isDependent: false, //whether this command is related/dependent to some other command
  desc: "used to get the yt play list", // a string descring how to use this command Ex = help : 'To use this command type !test arguments'
  execute,
};
