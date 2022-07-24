const fs = require("fs");
const {getBuffer} = require("../lib/myfunc");
async function execute(bosco, msg) {
let alivevid = await getBuffer(alive_vid)
    const buttons = [
        { urlButton: { displayText: `Instagram`, url: 'https://instagram.com/pepe.sir_?' } },
        { quickReplyButton: { displayText: `Menu`, id: `.menu` } }
    ];
    await bosco.send5ButGif(from, alive_text, bot_footer, alivevid, buttons);
}

module.exports = { 
    name: "alive", 
    command: ".alive", 
    Type: "misc", 
    isDependent: false, 
    desc: "check the bot is alive or not", 
    execute,
};
