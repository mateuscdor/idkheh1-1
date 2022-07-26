const performance = require('perf_hooks');

async function execute(bosco, msg, match) {
try {
let new = performance.now()
let old = performance.now()
reply(`_Ping_ : ${Math.round(new - old)} ms`)
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
