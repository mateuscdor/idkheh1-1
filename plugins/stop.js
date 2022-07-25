const FilterDb = require('./sql/filters');
async function execute(bosco, msg, match) {
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
