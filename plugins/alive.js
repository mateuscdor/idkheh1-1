const fs = require("fs");
const {getBuffer} = require("../lib/myfunc");
async function execute(bosco, msg, match) {
let alivevid = await getBuffer(bot_vid)
    const buttons = [
        { urlButton: { displayText: `Instagram`, url: 'https://instagram.com/pepe.sir_?' } },
        { quickReplyButton: { displayText: `Menu`, id: `.menu` } }
    ];
    await bosco.send5ButGif(msg.key.remoteJid, alive_text, bot_footer, alivevid, buttons);
}

module.exports = { 
    command: "alive", 
    Type: "misc", 
    isDependent: false, 
    desc: "check the bot is alive or not", 
    execute,
};
