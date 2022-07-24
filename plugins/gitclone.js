const fetch = require('node-fetch');
const fs = require("fs");
async function execute(bosco, msg, match) {
    let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
    if (!match)
        return reply(`_Example : ${handlers}gitclone https://github.com/pepesir/Bosco_`);
    if (!regex.test(match))
        return reply('_link is not valid!_');
    let [, user, repos] = match.match(regex) || [];
    let repo = repos.replace(/.git$/, '');
    let url = `https://api.github.com/repos/${user}/${repos}/zipball`;
    let filename = (await fetch(url, { method: 'HEAD' })).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];
    await bosco.sendMedia(msg.key.remoteJid, url, msg, { contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply: { title: bot_name, body: bot_prefix, previewType: "PHOTO", thumbnail: bot_img, sourceUrl: match } }, fileName: filename });
}
module.exports = {
    command: "gitclone", 
    Type: "download", 
    isDependent: false, 
    desc: "used to download git zip", 
    execute,
};
