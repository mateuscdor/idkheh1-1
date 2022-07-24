const execute = async (bosco, msg) => {
let plugins = bosco.plugins;
        let group = '';
        let download = '';
        let misc = '';
        let owner = '';
        let convert = '';
        let tools = '';
plugins.forEach((plugin) => {
            if (!plugin.isDependent) {
                if (plugin.Type === 'group')
                    group += `\n│🍁⃝❉⃟🍂 *${handlers}${plugin.command}*\n│`;
                if (plugin.Type === 'download')
                    download += `\n│🍒─⃝»͓̽  *${handlers}${plugin.command}*\n│`
                if (plugin.Type === 'convert')
                    convert += `\n│🌸─⃝»͓̽  *${handlers}${plugin.command}*\n│`
                if (plugin.Type === 'owner')
                    owner += `\n│🦋⃝❉⃟࿔ꦿ  *${handlers}${plugin.command}*\n│`
                if (plugin.Type === 'misc')
                    misc += `\n│❤️⃝➤⃟̱̱̱̱̄̄̄̄🐦 *${handlers}${plugin.command}*\n│`
                if (plugin.Type === 'tools')
                    tools += `\n│💘⃝➤⃟̱̱̱̱̄̄̄̄🦄 *${handlers}${plugin.command}*\n│`
            }
});
let menu = `╭────────────────╮
│
│ user : 
│ bot : bot_name
│ owner : pepesir   
│ mode : public
│ version : 1.0.0
│ prefix : {handlers}
│
│     
╰────────────────╯

⬙ ɢʀᴏᴜᴩ
╭────────────────╮
│${group}
╰────────────────╯

⬘ ᴅᴏᴡɴʟᴏᴀᴅ
╭────────────────╮
│${download}
╰────────────────╯

⬙ ᴍɪꜱᴄ
╭────────────────╮
│${misc}
╰────────────────╯

⬙ ᴛᴏᴏʟꜱ
╭────────────────╮
│${tools}
╰────────────────╯

⬘ ᴄᴏɴᴠᴇʀᴛ
╭────────────────╮
│${convert}
╰────────────────╯

⬙ ᴏᴡɴᴇʀ
╭────────────────╮
│${owner}
╰────────────────╯
`
let button = [
        { urlButton: { displayText: `Support Group`, url: 'https://chat.whatsapp.com/BzhyWkAEU0t8oVl3s8p94m' } },
        { urlButton: { displayText: `Github`, url: 'https://github.com/pepesir' } },
        { urlButton: { displayText: `Instagram`, url: 'https://instagram.com/pepe.sir_?' } },
        { quickReplyButton: { displayText: `Help`, id: `${handlers}help` } },
        { quickReplyButton: { displayText: `Status`, id: `${handlers}status` } }
            ];
await bosco.send5ButImg(msg.key.remoteJid, menu, bot_footer, bot_img, button) 
};

module.exports = { 
  command: "menu", 
  Type: "misc", 
  isDependent: false, 
  desc: "used to display commands.", 
  execute,
};
