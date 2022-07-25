const {getGroupAdmins} = require("../lib/myfunc");
async function execute(bosco, msg, match) {

const from = msg.key.remoteJid
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup ? await bosco.groupMetadata(from) : ""
const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
const botNumber = bosco.user.id ? bosco.user.id.split(":")[0]+"@s.whatsapp.net" : bosco.user.id
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isGroupAdmins = isGroup ? groupAdmins.includes(sender) : false
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false

if (!isGroup) return reply('_Feature can only be used in groups_')
if (!isGroupAdmins) return reply('_Feature can only be used by group admins_')
if (!isBotGroupAdmins) return reply('_Bot has to be group admin to use this feature_')
if (!match) return bosco.sendButMessage(msg.key.remoteJid, `Group Mode`, bot_footer, [
 {buttonId: `${handlers}group open`, buttonText: {displayText: Open },type: 1},
 {buttonId: `${handlers}group close`, buttonText: { displayText: Close },type: 1}], msg); 
let Type = args.shift();
    switch (Type) {
        case "open": {
bosco.groupSettingUpdate(from, 'not_announcement')
}
break
case "close" {
bosco.groupSettingUpdate(from, 'announcement')
}
break
}
}
module.exports = { 
    command: "group", 
    Type: "group", 
    isDependent: false, 
    desc: "Used to open or close group.", 
    execute,
};
