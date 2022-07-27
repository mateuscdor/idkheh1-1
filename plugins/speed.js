const speed = require("performance-now");
const timestampp = speed();
const latensi = speed() - timestampp

async function execute(bosco, msg, match) {
bosco.reply(msg.key.remoteJid,`_Speed: ${latensi.toFixed(4)} Second_`)
}

module.exports = { 
    command: "speed", 
    Type: "misc", 
    isDependent: false, 
    desc: "used to get speed of bot", 
    execute,
};
