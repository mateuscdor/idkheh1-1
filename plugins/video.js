    const fs = require("fs");
    const yts = require("yt-search");
    const ytdl = require('ytdl-core');
    const { FileSize, h2k, getRandom } = require('../lib/functions');
    const {getBuffer, isUrl} = require('../lib/myfunc');
    const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed|shorts\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/
    async function execute(bosco, msg, match) {
//
const downloadMp4 = async (Link ) => {
try{
await ytdl.getInfo(Link);
let mp4File = getRandom('.mp4') 
//console.log("Download video with ytdl-core")
let nana = ytdl(Link)
.pipe(fs.createWriteStream(mp4File))
.on("finish", async () => {    
await bosco.sendMessage(msg.key.remoteJid, { video: fs.readFileSync(mp4File),gifPlayback: false},{quoted: msg})
fs.unlinkSync(`./${mp4File}`)
})     
} catch(err) {
reply(`${err}`)
}
}
        if (!match)
            return await reply(`_Example : ${handlers}video text/link_`);
        const vid = ytIdRegex.exec(match);
        if (vid) {
            let ytteks = match;
            if (ytteks.includes("https://youtube.com/channel/"))
                return reply("_Give a valid video link!_");
            if (ytteks.includes("https://youtu.be/")) {
                var videoId = ytteks.replace('https://youtu.be/', '');
            } else if (ytteks.includes("https://youtube.com/watch?v=")) {
                var videoId = ytteks.split('=')[1];
            } else if (ytteks.includes("https://youtube.com/shorts/")) {
                var videoId = ytteks.replace('https://youtube.com/shorts/', '');
            }
            let link = `https://youtube.com/watch?v=${videoId}`;
            let dlink =`https://youtu.be/${videoId}`
            let anu = await yts(link);
            if (anu.all.length == "0")
                return reply("_No result found!_");
            let info = await ytdl.getInfo(link);
            let format = ytdl.chooseFormat(info.formats, { quality: '18' });
            if (Number(format.contentLength) > 80000000)
                return reply(`_File size (${FileSize(format.contentLength)}) is too large to send._`);
            let text = '';
            text += ' *YOUTUBE VIDEO DOWNLOADER*' + '\n\n';
            text += '📂 _Title_        : ' + anu.all[0].title + '\n\n';
            text += '💾 _Ext_          : ' + '360p' + '\n\n';
            text += '📄 _Size_         : ' + FileSize(format.contentLength) + '\n\n';
            text += '🆔 _Video Id_     : ' + videoId + '\n\n';
            text += '⏲️ _Duration_     : ' + anu.all[0].timestamp + '\n\n';
            text += '🌎 _Viewers_      : ' + h2k(anu.all[0].views) + '\n\n';
            text += '🌐 _Upload At_    : ' + anu.all[0].ago + '\n\n';
            text += '🔖 _Author_       : ' + anu.all[0].author.name + '\n\n';
            text += '📹 _Channel_      : ' + anu.all[0].author.url + '\n\n';
            text += '🔗 _Url_          : ' + anu.all[0].url + '\n\n';
            text += '📝 _Discription_  : ' + anu.all[0].description + '';
            await bosco.sendMessage(from, { image: { url: anu.all[0].image }, caption: text }, { quoted: msg });
            downloadMp4(dlink);
        } else {
let search = await yts(match)                   
let sections = []   
let listmenu = [`video ${search.all[0].url}`,`video ${search.all[1].url}`,`video ${search.all[2].url}`,`video ${search.all[3].url}`,`video ${search.all[4].url}`,`video ${search.all[5].url}`,`video ${search.all[6].url}`,`video ${search.all[7].url}`,`video ${search.all[8].url}`,`video ${search.all[9].url}`,`video ${search.all[10].url}`,`video ${search.all[11].url}`,`video ${search.all[12].url}`,`video ${search.all[13].url}`,`video ${search.all[14].url}`,`video ${search.all[15].url}`,`video ${search.all[16].url}`,`video ${search.all[17].url}`,`video ${search.all[18].url}`,`video ${search.all[19].url}`]
      let listmenuu = [`${search.all[0].title}`,`${search.all[1].title}`,`${search.all[2].title}`,`${search.all[3].title}`,`${search.all[4].title}`,`${search.all[5].title}`,`${search.all[6].title}`,`${search.all[7].title}`,`${search.all[8].title}`,`${search.all[9].title}`,`${search.all[10].title}`,`${search.all[11].title}`,`${search.all[12].title}`,`${search.all[13].title}`,`${search.all[14].title}`,`${search.all[15].title}`,`${search.all[16].title}`,`${search.all[17].title}`,`${search.all[18].title}`,`${search.all[19].title}`]
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
text: "\n\n",
footer: bot_footer,
title: `_$(match}_`,
buttonText: "CLICK HERE",
sections
}, { quoted : msg }) 
} 
}

                module.exports = {
                    command: "video", 
                    Type: "download", 
                    isDependent: false, 
                    desc: "used to download youtube video/Mp4 files", 
                    execute,
                };
