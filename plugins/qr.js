const qr = require('qr-image');
async function qrgen(text) {
    const data = ({
        mimetype: "image/png",
        data: await (qr.imageSync(text, { type: 'png' })),
        filename: text + ".png"
    });
    return data;
}
async function execute(bosco, msg, match) {
    if (!match) return reply(`Example : ${handlers}qr bosco`)
    let data = await qrgen(match);
    await bosco.sendMessage(msg.key.remoteJid, { image: data.data, contextInfo: { forwardingScore: 508, isForwarded: true, externalAdReply: { title: bot_footer, body: '', previewType: "PHOTO", thumbnail: bot_img, sourceUrl: owner_link } }, caption: `QR code for 👇\n` + "```" + match + "```" }, { quoted: msg });
}
module.exports = { command: "qr", Type: "tools", isDependent: false, desc: "used to generate qr for given text", execute,};
