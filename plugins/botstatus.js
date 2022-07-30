const { performance } = require('perf_hooks')
let osu = require('node-os-utils')
async function execute(bosco, msg, match) {
    try {
        let NotDetect = 'Not Detect'
        let old = performance.now()
        let cpu = osu.cpu
        let cpuCore = cpu.count()
        let drive = osu.drive
        let mem = osu.mem
        let netstat = osu.netstat
        let OS = osu.os.platform()
        let cpuModel = cpu.model()
        let cpuPer
        let p1 = cpu.usage().then(cpuPercentage => {
            var cpuPer = cpuPercentage
        }).catch(() => {
            var cpuPer = NotDetect
        })
        let driveTotal, driveUsed, drivePer
        let p2 = drive.info().then(info => {
            driveTotal = (info.totalGb + ' GB'),
                driveUsed = info.usedGb,
                drivePer = (info.usedPercentage + '%')
        }).catch(() => {
            driveTotal = NotDetect,
                driveUsed = NotDetect,
                drivePer = NotDetect
        })
        let ramTotal, ramUsed
        let p3 = mem.info().then(info => {
            ramTotal = info.totalMemMb,
                ramUsed = info.usedMemMb
        }).catch(() => {
            ramTotal = NotDetect,
                ramUsed = NotDetect
        })
        let netsIn, netsOut
        let p4 = netstat.inOut().then(info => {
            netsIn = (info.total.inputMb + ' MB'),
                netsOut = (info.total.outputMb + ' MB')
        }).catch(() => {
            netsIn = NotDetect,
                netsOut = NotDetect
        })
        await Promise.all([p1, p2, p3, p4])
        await reply(`_Testing status..._`)
        let _ramTotal = (ramTotal + ' MB')
        let neww = performance.now()
        let status =`
      「 Status 」

𖤣 _OS_ : ${OS}
𖤣 _CPU Model_ : ${cpuModel}
𖤣 _CPU Core_ : ${cpuCore} Core
𖤣 _CPU_ : ${cpuPer? `${cpuPer}%`:"Not Found"}
𖤣 _Ram_ : ${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})
𖤣 _Drive_ : ${driveUsed} / ${driveTotal} (${drivePer})
𖤣 _Ping_ : ${Math.round(neww - old)} ms
𖤣 _Internet IN_ : ${netsIn}
𖤣 _Internet OUT_ : ${netsOut}
`
let button = [{"buttonId": `${handlers}infobot`,"buttonText": {"displayText": `Info bot`},"type": "RESPONSE"},
                    {"buttonId": `${handlers}menu`,"buttonText": {"displayText": `Menu`},"type": "RESPONSE"}]

bosco.sendButLoc(msg.key.remoteJid, status,bot_footer,bot_img, button)
} catch (err) {
reply(err)
}
}

module.exports = { 
    command: "botstatus", 
    Type: "misc", 
    isDependent: false, 
    desc: "used to get status of bot", 
    execute,
};
