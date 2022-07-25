const FilterDb = require('./sql/filters');
async function execute(bosco, msg, match) {
match = match.match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        filtreler = await FilterDb.getFilter(msg.key.remoteJid);
        if (filtreler === false) {
            await reply('_❌ There are no filters in this chat!_')
        } else {
            var mesaj = "*🔎 Filters in this chat:*" + '\n';
            filtreler.map((filter) => mesaj += '_' + filter.dataValues.pattern + '_\n');
            await reply(mesaj);
        }
    } else {
        if (match.length < 2) {
            return await reply(`_Example : ${handlers}filter "hi" "hello"_`);
        }
        await FilterDb.setFilter(msg.key.remoteJid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
        await reply(`_✅ Successfully set ${match[0].replace(/['"]+/g, '')} to filter!_`);
    }

}
module.exports = { 
    command: "filter", 
    Type: "group", 
    isDependent: false, 
    desc: "Used to set filter in groups", 
    execute,
};
