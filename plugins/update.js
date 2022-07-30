// © Whatsasena <3
const fs = require("fs");
const simpleGit = require('simple-git');
const git = simpleGit();
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: heroku_api_key })
const {getBuffer} = require("../lib/myfunc");
async function execute(bosco, msg, match) {
if (!msg.key.fromMe) return reply('_only for owner_')
    if (!match) {
        await git.fetch();
        var commits = await git.log(['main' + '..origin/' + 'main']);
        var mss = '';
        if (commits.total === 0) {
            mss = "_Bot is up to date_";
            var buttons = [
                { urlButton: { displayText: `Instagram`, url: 'https://instagram.com/pepe.sir_?' } }
            ];
        } else {
            var changelog = "_Updates are available_\n\n";
            commits['all'].map(
                (commit) => {
                    changelog += `𔗃 *${commit.message}* [${commit.date.substring(0, 10)}] \n`;
                }
            );
            mss = changelog;
            var buttons = [
                { urlButton: { displayText: `Instagram`, url: 'https://instagram.com/pepe.sir_?' } },
                { quickReplyButton: { displayText: `update now`, id: `${handlers}update now` } }
            ];
        }
        let video = await getBuffer(`https://telegra.ph/file/aebe3bd1f5db4c5f59084.mp4`)
        await bosco.send5ButGif(msg.key.remoteJid, mss, bot_footer, video, buttons);
    }
    let Type = args.shift();
    switch (Type) {
        case "now": {
            await git.fetch();
            var commits = await git.log(['main' + '..origin/' + 'main']);
            if (commits.total === 0) {
                return await reply("_Bot is up to date_");
            } else {
                await reply("_Build started ⚒⚙_");
                try {
                    var app = await heroku.get('/apps/' + heroku_app_name);
                } catch {
                    await reply("_Heroku app name/api key is wrong ‼️_");

                    await new Promise(r => setTimeout(r, 1000));
                }
                git.fetch('upstream', 'main');
                git.reset('hard', ['FETCH_HEAD']);

                var git_url = app.git_url.replace(
                    "https://", "https://api:" + heroku_api_key + "@"
                );

                try {
                    await git.addRemote('heroku', git_url);
                } catch { console.log('Deploy error catched. Retrying...'); }
                try { await git.push('heroku', 'main'); } catch (e) {
                    if (e.message.includes("concurrent"))
                        return await reply("_Your account has reached in-parallel build limit! Please wait for the other app to finish its deploy ‼️_");
                }
                await bosco.sendMessage(msg.key.remoteJid,{text :"_Build finished! Restarting..._"});
            }
        }
            break;
    }
}
module.exports = { 
  command: "update", 
  Type: "owner", 
  isDependent: false, 
  desc: "used to update bot", 
  execute,
};
