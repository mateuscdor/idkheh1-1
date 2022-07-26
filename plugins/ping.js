const performance = require('perf_hooks');

async function execute(bosco, msg, match) {
try {
var heh = performance.now()
var hehe = performance.now()
reply(`_Ping_ : ${Math.round(heh - hehe)} ms`)
} catch (err) {
reply(err)
}
}

module.exports = { 
    command: "ping", 
    Type: "misc", 
    isDependent: false, 
    desc: "used to get ping of bot", 
    execute,
};
