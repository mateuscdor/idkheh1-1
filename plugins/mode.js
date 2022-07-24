const fs = require("fs");
const {getBuffer} = require("../lib/myfunc");
async function execute(bosco, msg, match) {
if (bosco.public === true){
mode = 'public'
} else {
mode = 'private'
}
var but = [{buttonId: `${handlers}mode public`, buttonText: { displayText: 'public' }, type: 1 },
{buttonId: `${handlers}mode private`, buttonText: { displayText: 'private' }, type: 1 }]
bosco.sendMessage(from, { caption: `working mode configuration `, image: { url: botimg }, buttons: but, footer: `Current mode : ${mode}` }, { quoted: msg })
}

module.exports = { 
    command: "mode", 
    Type: "owner", 
    isDependent: false, 
    desc: "used to change mode of bot -public/private", 
    execute,
};
