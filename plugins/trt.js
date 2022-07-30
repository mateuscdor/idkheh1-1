const translate = require('@vitalets/google-translate-api');
async function execute(bosco, msg, match) {
    if (!match)
        return reply(`_Example : ${handlers}trt {ml} text_`);
    let
        LANG = 'en', trtMessage = match;
    if (langMatch = match.match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1];
        trtMessage = trtMessage.replace(langMatch[0], "");
    }
    translate(trtMessage, {
        to: LANG
    }).then(async (res) => {
        if ("text" in res) {
            await reply(res.text);
        }
    });
}
module.exports = {command: "trt", Type: "tools", isDependent: false, desc: "used to translate", execute,};
