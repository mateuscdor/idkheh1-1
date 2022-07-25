async function execute(bosco, msg, match) {
const runtime = require("../lib/functions");
reply(`Runtime : ${runtime(process.uptime())}`)
}

module.exports = { 
    command: "runtime", 
    Type: "misc", 
    isDependent: false, 
    desc: "used to get runtime of bot", 
    execute,
};
