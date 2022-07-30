const yts = require("yt-search");
const ytdl = require('ytdl-core');
const { FileSize, h2k, getRandom } = require('../lib/functions');
const ytIdRegex =
	/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

const execute = async (bosco, msg, match) => {

//Download mp3
const downloadMp3 = async (Link ) => {
try{
await ytdl.getInfo(Link);
let mp3File = getRandom('.mp3') 
//console.log("Download audio with ytdl-core")
ytdl(Link, {filter: 'audioonly'})
.pipe(fs.createWriteStream(mp3File))
.on("finish", async () => {  
await bosco.sendMessage(msg.key.rwmoteJid, {audio:  fs.readFileSync(mp3File), mimetype: 'audio/mp4' },{ quoted: msg })
fs.unlinkSync(mp3File)
})       
} catch (err){
console.log(err)
}
}
  if (!match) return reply(`_Example : ${handlers}song text/link_`)
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

let teks =`*𝚈𝙾𝚄𝚃𝚄𝙱𝙴 𝙰𝚄𝙳𝙸𝙾 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁*

📂 Tɪᴛʟᴇ : ${info.videoDetails.title}
📄 Sɪᴢᴇ : ${FileSize(format[0].contentLength)}
🆔 Iᴅ : ${videoId}
⏲️ Dᴜʀᴀᴛɪᴏɴ : ${anu.all[0].timestamp}
📊 Vɪᴇᴡᴇʀꜱ : ${h2k(anu.all[0].views)}
🌐 Uᴘʟᴏᴀᴅ ᴀᴛ : ${anu.all[0].ago}
🔖 Aᴜᴛʜᴏʀ : ${anu.all[0].author.name}
👤 Cʜᴀɴɴᴇʟ : ${anu.all[0].author.url}
🔗 Uʀʟ : ${anu.all[0].url}
📝 Dɪꜱᴄʀɪᴩᴛɪᴏɴ : ${anu.all[0].description}`
await bosco.sendMessage(msg.key.remoteJid, {image: {url: foto}, caption: teks},{quoted: msg})
downloadMp3(match) 
    } else {
 let search = await yts(match)                   
let sections = []   
let listmenu = [`video ${search.all[0].url}`,`song ${search.all[1].url}`,`video ${search.all[2].url}`,`song ${search.all[3].url}`,`video ${search.all[4].url}`,`song ${search.all[5].url}`,`video ${search.all[6].url}`,`song ${search.all[7].url}`,`video ${search.all[8].url}`,`song ${search.all[9].url}`,`video ${search.all[10].url}`,`song ${search.all[11].url}`,`video ${search.all[12].url}`,`song ${search.all[13].url}`,`video ${search.all[14].url}`,`song ${search.all[15].url}`,`video ${search.all[16].url}`,`song ${search.all[17].url}`,`video ${search.all[18].url}`,`song ${search.all[19].url}`]
      let listmenuu = [`VIDEO MP4⬤: ${search.all[0].title}`,`SONG MP3⬤: ${search.all[1].title}`,`VIDEO MP4⬤: ${search.all[2].title}`,`SONG MP3⬤: ${search.all[3].title}`,`VIDEO MP4⬤: ${search.all[4].title}`,`SONG MP3⬤: ${search.all[5].title}`,`VIDEO MP4⬤: ${search.all[6].title}`,`SONG MP3⬤: ${search.all[7].title}`,`VIDEO MP4⬤: ${search.all[8].title}`,`SONG MP3⬤: ${search.all[9].title}`,`VIDEO MP4⬤: ${search.all[10].title}`,`SONG MP3⬤: ${search.all[11].title}`,`VIDEO MP4⬤: ${search.all[12].title}`,`SONG MP3⬤: ${search.all[13].title}`,`VIDEO MP4⬤: ${search.all[14].title}`,`SONG MP3⬤: ${search.all[15].title}`,`VIDEO MP4⬤: ${search.all[16].title}`,`SONG MP3⬤: ${search.all[17].title}`,`VIDEO MP4⬤: ${search.all[18].title}`,`SONG MP3⬤: ${search.all[19].title}`]
      let listmenuuu = [`\n${search.all[0].description}`,`\n${search.all[1].description}`,`\n${search.all[2].description}`,`\n${search.all[3].description}`,`\n${search.all[4].description}`,`\n${search.all[5].description}`,`\n${search.all[6].description}`,`\n${search.all[7].description}`,`\n${search.all[8].description}`,`\n${search.all[9].description}`,`\n${search.all[10].description}`,`\n${search.all[11].description}`,`\n${search.all[12].description}`,`\n${search.all[13].description}`,`\n${search.all[14].description}`,`\n${search.all[15].description}`,`\n${search.all[16].description}`,`\n${search.all[17].description}`,`\n${search.all[18].description}`,`\n${search.all[19].description}`]
      let nombor = 1
      let startnum = 0
      let startnumm = 0
      for (let x of listmenu) {
      const list = {title: 'RESULT NUMBER ' + nombor++,
      rows: [
         {
          title: `${listmenuu[startnum++]}`,
          description: `${listmenuuu[startnumm++]}`,
          rowId: `${handlers}${x}`
}, 
]
}
sections.push(list)   
}
await bosco.sendMessage(
msg.key.remoteJid, 
{
text: "\n\n*_DONE SCRAPING DATA_*",
footer: bot_footer,
title: `HERE IS YOUR RESULTS HOMIE FROM *$(match}* _select song or video below_`,
buttonText: "CLICK HERE",
sections
}, { quoted : msg }) 
} 
}

module.exports = {
  command: "song", //command . Ex command: 'test'
  Type: "download", //
  isDependent: false, //whether this command is related/dependent to some other command
  desc: "used to download youtube audio/MP3 files", // a string describing usage of this command
  execute,
};
