const execute = async (bosco, msg) => {
    let plugins = bosco.plugins;
        let command = '';

        plugins.forEach((plugin) => {
            if (!plugin.isDependent) {
                    command += `\n┊▢ *${handlers}${plugin.command}*`
            }
});
        let help = `──────〔 𝖕𝖊𝖕𝖊𝖘𝖎𝖗 〕──────
 𖤥 ᴜꜱᴇʀ : 
 𖤥 ᴏᴡɴᴇʀ : 
 𖤥 ᴄʀᴇᴀᴛᴏʀ : 
──────〔 𝖎𝖓𝖋𝖔 〕
 𖤥 ᴛɪᴍᴇ : 
 𖤥 ᴅᴀʏ : 
 𖤥 ᴅᴀᴛᴇ :
┌─────〔 𝖈𝖔𝖒𝖒𝖆𝖓𝖉𝖘 〕
┊${command}
┊
└────────────────────𔒝`;
        await bosco.sendMessage(from, {text : help },{quoted : msg});

            };
module.exports = {
    command: 'help',
    Type: 'misc',
    isDependent: false,
    desc: 'used to get bot commands',
    execute
};
