const googleTTS = require('google-translate-tts');
async function execute(bosco, msg, match) {
    if (!match)
        return await reply(`_Example : ${handlers}tts {ml} hello_`);
    let
        LANG = 'en', ttsMessage = match, SPEED = 1.0;
    if (langMatch = match.match("\\{([a-z]{2})\\}")) {
        LANG = langMatch[1];
        ttsMessage = ttsMessage.replace(langMatch[0], "");
    }
    if (speedMatch = match.match("\\{([0].[0-9]+)\\}")) {
        SPEED = parseFloat(speedMatch[1]);
        ttsMessage = ttsMessage.replace(speedMatch[0], "");
    }
    try {
        var buffer = await googleTTS.synthesize({
            text: ttsMessage,
            voice: LANG
        });
    } catch {
        return await reply("_Error ;)_");
    }
    await bosco.sendMessage(msg.key.remoteJid, { audio: buffer, mimetype: 'audio/mp4', duration: 359996400, ptt: false, contextInfo: { forwardingScore: 9999, externalAdReply: { title: bot_footer, body: '', previewType: "PHOTO", thumbnail: bot_img, sourceUrl: owner_link } }, sendEphemeral: true }, { quoted: msg });

}

module.exports = {command: "tts", Type: "convert", isDependent: false, desc: "used to convert text to speech", execute,};
