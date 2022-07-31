const sql = require('./sql/greetings');
const Config = require('../config');
const execute = async (bosco, msg, match) => {
const from = msg.key.remoteJid
const isGroup = from.endsWith('@g.us')
	if (!isGroup) return reply('_Only works in groups_')
let hg = await sql.getMessage(from, 'goodbye');
if (!hg && !match) 
    return await reply(`You haven't set the goodbye message yet.!\nTo set: ${handlers}goodbye Goodbye bruh 👋`); 
if (match.length === 0) {
let buttons = [
                { buttonId: `${handlers}goodbye delete`, buttonText: { displayText: 'Delete' }, type: 1 }
            ];
bosco.sendButtonText(from,buttons,hg.message,bot_footer,msg)
} 
if (match === 'delete') {
if (!hg) return await reply(`You haven't set the goodbye message yet.!\nTo set: ${handlers}goodbye Goodbye bruh 👋`);
await sql.deleteMessage(msg.key.remoteJid, 'goodbye'); 
await reply("*✅ Goodbye message has been deleted successfully!*"); 
} else if (match.length > 1) {
await sql.setMessage(msg.key.remoteJid, 'goodbye', match);
return await reply("*✅ Goodbye message has been set successfully!*")  
}

};
module.exports = {
  command: "goodbye",
  Type: "group", 
  isDependent: false, 
  desc: "goodbye message ", 
  execute,
};
