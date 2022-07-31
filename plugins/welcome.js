const sql = require('./sql/greetings');
const Config = require('../config');
const execute = async (bosco, msg, match) => {
const from = msg.key.remoteJid
const isGroup = from.endsWith('@g.us')
	if (!isGroup) return reply('_Only works in groups_')
let hg = await sql.getMessage(from,'welcome');
if (!hg && !match) 
    return await reply(`You haven't set the welcome message yet.!\nTo set: ${handlers}welcome hi bro`); 
if (match.length === 0) {
let buttons = [
                { buttonId: `${handlers}welcome delete`, buttonText: { displayText: 'Delete' }, type: 1 }
            ];
bosco.sendButtonText(from,buttons,hg.message,bot_footer,msg)
} 
if (match === 'delete') {
if (!hg) return await reply(`You haven't set the welcome message yet.!\nTo set: ${handlers}welcome hi bro`);
await sql.deleteMessage(msg.key.remoteJid, 'welcome'); 
await reply("*✅ Welcome message has been deleted successfully!*"); 
} else if (match.length > 1) {
await sql.setMessage(msg.key.remoteJid, 'welcome', match);
return await reply("*✅ Welcome message has been set successfully!*")  
}

};
module.exports = {
  command: "welcome",
  Type: "group", 
  isDependent: false, 
  desc: "welcome message ", 
  execute,
};
