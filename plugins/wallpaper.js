const { wallpaper } = require('../lib/scraper');
async function execute(bosco, msg, match) {
if (!match) return bosco.reply(msg.key.remoteJid,`Example : ${handlers}wallpaper gojo`)
anu = await wallpaper(match)
   result = anu[Math.floor(Math.random() * anu.length)]
let buttons = [
  {buttonId: `${handlers}wallpaper ${match}`, buttonText: {displayText: 'Next'}, type: 1}
   ]
let pepe = ''
pepe += '_Title_        : *' + result.title + '*\n\n';
pepe += '_Category_     : *' + result.type + '*\n\n';pepe += '_Detail_       : *' + result.source + '*\n\n';
pepe += '_Media url_    : *' + result.image[2] || result.image[1] || result.image[0] + '*';
  let buttonMessage = {
  image: { url: result.image[0] },
  caption: pepe,
  footer: bot_footer,
  buttons: buttons,
  headerType: 4
   }
   bosco.sendMessage(msg.key.remoteJid, buttonMessage, { quoted: msg })
}

module.exports = { 
    command: "wallpaper", 
    Type: "download", 
    isDependent: false, 
    desc: "used to download wallpapers.", 
    execute,
};
