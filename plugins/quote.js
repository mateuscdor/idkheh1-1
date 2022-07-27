const {fetchJson} = require("../lib/myfunc");
const {getRandom} = require('../lib/functions');
async function execute(bosco, msg) {
    var data = await fetchJson(`https://gist.githubusercontent.com/pepesir/6209507f9caf191ab20c154d6de53bf1/raw/a97d9d9ca32c3084b0ddd407cf1aed89eccb214b/quotes.json`);
    var hehe = data.result;
    var quote = hehe[Math.floor(Math.random() * hehe.length)];
    await bosco.reply(msg.key.remoteJid,quote.quote + '\n\n-- ' + quote.author);
}

module.exports = {
  command: "quote",
  Type: "tools", 
  isDependent: false, 
  desc: "used to get random quotes", 
  execute,
};
