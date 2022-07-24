const FilterDb = require('./sql/filters');
let FILTERED = "*✅ Successfully set* ```{}``` *to filter!*"
async function execute(bosco, msg, match) {
match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        filtreler = await FilterDb.getFilter(msg.key.remoteJid);
        if (filtreler === false) {
            await reply('*❌ There are no filters in this chat!*')
        } else {
            var mesaj = "*🔎 There is your filters in this chat:*" + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await reply(mesaj);
        }
    } else {
        if (match.length < 2) {
            return await reply("*❌ Please type in reply!*\n*Example:*" + ' ```.filter "sa" "as"');
        }
        await FilterDb.setFilter(msg.key.remoteJid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
        await reply(FILTERED.format(match[0].replace(/['"]+/g, '')));
    }
/*//Stop
match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(msg.key.remoteJid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await reply(Lang.ALREADY_NO_FILTER)
    } else {
        await reply(Lang.DELETED)
    }*/


}
module.exports = { 
    command: "filter", 
    Type: "group", 
    isDependent: false, 
    desc: "Used to set filter in groups", 
    execute,
};
