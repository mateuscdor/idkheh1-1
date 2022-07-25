const runtime = require("../lib/functions");
async function execute(bosco, msg, match) {
reply(`${runtime(process.uptime())}`)
}

module.exports = { 
    command: "runtime", 
    Type: "misc", 
    isDependent: false, 
    desc: "used to get runtime of bot", 
    execute,
};
