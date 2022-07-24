const fs = require("fs");
const {getBuffer} = require("../lib/myfunc");
async function execute(bosco, msg, match) {

  if (!msg.key.fromMe) return reply('_only for owner_')
  if (bosco.public === true){
mode = 'public'
} else {
mode = 'private'
}
  if (!match) {
var but = [{buttonId: `${handlers}mode public`, buttonText: { displayText: 'public' }, type: 1 },
{buttonId: `${handlers}mode private`, buttonText: { displayText: 'private' }, type: 1 }]
bosco.sendMessage(msg.key.remoteJid, { caption: `working mode configuration `, image: { url: botimg }, buttons: but, footer: `Current mode : ${mode}` }, { quoted: msg })
  }
  let Type = args.shift();
    switch (Type) {
        case "private": case "self": {

bosco.public = false
   reply('_Private mode enabled ✅_')

    }
        break
   case "public": {

bosco.public = true
   reply('_Public mode enabled ✅_')
    }
        break
    }
}

module.exports = { 
    command: "mode", 
    Type: "owner", 
    isDependent: false, 
    desc: "used to change mode of bot -public/private", 
    execute,
};
