const FilterDb = require('./sql/filters');
const {getGroupAdmins} = require("../lib/myfunc");
async function execute(bosco, msg, match) {

const from = msg.key.remoteJid
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup ? await bosco.groupMetadata(from) : ""
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false

if (isGroup) {
 if (!isGroupAdmins) return reply('_Feature can only be used by group admins_')
}
    match = match.match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await reply(`_Example : ${handlers}stop "hii"_`)
    }

    del = await FilterDb.deleteFilter(msg.key.remoteJid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await reply("_❌ There is already no filter like this!_")
    } else {
        await reply("_✅ The filter was successfully deleted!_")
    }


}
module.exports = { 
    command: "stop", 
    Type: "group", 
    isDependent: false, 
    desc: "Used to stop filter.", 
    execute,
};
