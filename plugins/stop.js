const FilterDb = require('./sql/filters');
let FILTERED = "*✅ Successfully set* ```{}``` *to filter!*"
async function execute(bosco, msg, match) {
match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await reply("*❌ Please type in reply!*\n*Example:*" + '\n*Example:* ```.stop "hello"```')
    }

    del = await FilterDb.deleteFilter(msg.key.remoteJid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await reply("*❌ There is already no filter like this!*")
    } else {
        await reply("*✅ The filter was successfully deleted!*")
    }


}
module.exports = { 
    command: "stop", 
    Type: "group", 
    isDependent: false, 
    desc: "Used to stop previous added filter.", 
    execute,
};
