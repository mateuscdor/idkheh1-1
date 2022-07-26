//------------------------------------------------//
"use strict";
require('./config')
const {
default: makeWASocket,
BufferJSON,
Browsers,
initInMemoryKeyStore,
DisconnectReason,
AnyMessageContent,
makeInMemoryStore,
useSingleFileAuthState,
fetchLatestBaileysVersion,
delay,
jidDecode,
generateForwardMessageContent, 
prepareWAMessageMedia, 
generateWAMessageFromContent, 
generateMessageID, 
downloadContentFromMessage, 
WAProto,
proto
} = require("@adiwajshing/baileys")
const figlet = require("figlet");
global.fs = require("fs");
const moment = require('moment')
const chalk = require('chalk')
const logg = require('pino')
const clui = require('clui')
const got = require('got');
const { Boom } = require('@hapi/boom')
const { Spinner } = clui
const {getBuffer, smsg} = require("./lib/myfunc");
const { color} = require("./lib/color");
const FileType = require('file-type');
const ytdl = require('ytdl-core');
const path = require("path");
const { DataTypes } = require('sequelize');
const PhoneNumber = require('awesome-phonenumber')
const { banner, start, success,getRandom, getGroupAdmins,close} = require("./lib/functions");
const time = moment(new Date()).format('HH:mm:ss DD/MM/YYYY')
const session = `./session.json`
const { state, saveState } = useSingleFileAuthState(session)
const config = require('./config');
const { getMessage } = require("./plugins/sql/greetings");
const { exec, spawn } = require("child_process");
const store = makeInMemoryStore({ logger: logg().child({ level: 'silent', stream: 'store' }) })
const boscoDB = config.DATABASE.define('bosco', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});
fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

 async function connectToWhatsApp () {
    await config.DATABASE.sync();
    const { version, isLatest } = await fetchLatestBaileysVersion()
    //console.log(color(`using WA v${version.join('.')}, isLatest: ${isLatest}`))
    const bosco = makeWASocket({
        printQRInTerminal: true,
        logger: logg({ level: 'silent' }),
        auth: state,
        browser: ["pepesir", "Safari", "3.0"],
        version,
        getMessage: async key => {
    return {
      conversation: 'ʀᴇᴄᴏɴɴᴇᴄᴛᴇᴅ..'
    }
  }
    })
    
    bosco.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update	    
if (connection === 'close') {
//console.log(color(lastDisconnect.error));
let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); process.exit(); }
            else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, Reconnecting...."); makeWASocket(); }
            else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, Reconnecting..."); makeWASocket(); }
            else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); process.exit(); }
            else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Delete Session And Scan Again.`); process.exit(); }
            else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); makeWASocket(); }
            else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); makeWASocket(); }
            else { console.log(`Unknown DisconnectReason: ${reason}|${connection}`) }
} else if (connection === 'qr') {
console.log('scan qr ...')
} else if (connection === 'connecting') {
console.log('Connecting to WhatsApp... Please wait')
} else if (connection === 'open') {
console.log('successfully connected ✅')
//await bosco.sendMessage(`917736622139@s.whatsapp.net`, {text: "Bot connected" })
    console.log('⬇️ Installing plugins...')
    // plugin function
    bosco.plugins = new Map();
    fs.readdir("./plugins", (err, files) => {
        if (err) return console.error(e);
        files.forEach((pluginFile) => {
            if (pluginFile.endsWith(".js")) {
                let pluginName = pluginFile.replace(".js", "");
                const pluginn = require(`./plugins/${pluginName}`);
                bosco.plugins.set(pluginName, pluginn);
            }
        });
    });
    console.log('✅ Plugins installed!')

}
})

    bosco.ev.on('creds.update', () => saveState)

// Working mode configuration
if (mode === 'public' || mode === 'Public' || mode === 'PUBLIC' || mode === 'publik' || mode === 'Publik' || mode === 'PUBLIK' || mode === 1 || mode === 'true') {
bosco.public = true
} else {
bosco.public = false
}

    store.bind(bosco.ev)

//------------------------------------------------//
    bosco.ev.on('messages.upsert', async m => {
        try{
            if (!m.messages) return;
            var msg = m.messages[0]
            if (!msg.message) return
            msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
            if (msg.key && msg.key.remoteJid === 'status@broadcast') return
            if (!bosco.public && !msg.key.fromMe && m.type === 'notify') return
            if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16) return
            msg = smsg(bosco, msg, store)
            msg.isBaileys = msg.key.id.startsWith('BAE5') || msg.key.id.startsWith('3EB0')
            // Bot functions
            var msg = m.messages[0]
            const { type, now, fromMe } = msg
            const content = JSON.stringify(msg.message)
            const quoted = msg.quoted ? msg.quoted : msg
            const body = (type === 'conversation') ? msg.message.conversation : (type == 'imageMessage') ? msg.message.imageMessage.caption : (type == 'videoMessage') ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId ) : ''
            global.bot_img = await getBuffer(botimg)
            const from = msg.key.remoteJid            
            // reply
            global.reply = (teks) => {
                bosco.sendMessage(from, { text: teks }, { quoted: msg })
            }
            //Button document ✓
            global.sentbutdocument = async(id, text1, desc1, gam1, but = [], options = {}) => {	
                const buttonMessage = {
                    contextInfo: options,
                    document: fs.readFileSync('./media/file.docx'),
                    mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 
                    title : "Footer text", 
                    fileLength : 999999999999, 
                    pageCount: 100, 
                    fileName : "Extream", 
                    caption: text1,
                    footer: desc1,
                    buttons: but,
                    headerType: "DOCUMENT"
                }
                await bosco.sendMessage(id, buttonMessage,options)
            } 
            //DOWNLOAD MP4
            global.downloadMp4 = async (Link ) => {
                try{
                    await ytdl.getInfo(Link);
                    let mp4File = getRandom('.mp4') 
                    //console.log("Download video with ytdl-core")
                    let nana = ytdl(Link)
                    .pipe(fs.createWriteStream(mp4File))
                    .on("finish", async () => {    
                        await bosco.sendMessage(from, { video: fs.readFileSync(mp4File),gifPlayback: false},{quoted: msg})
                        fs.unlinkSync(`./${mp4File}`)
                        })     
                        } catch(err) {
                            reply(`${err}`)
                            }
                            }
            //Message types
            global.isImage = (type === 'imageMessage')
            global.isVideo = (type === 'videoMessage')
            global.isSticker = (type == 'stickerMessage')
            global.isAudio = (type == 'audioMessage')
            global.isText = (type == 'conversation')
            global.isMedia = (type === 'imageMessage' || type === 'videoMessage')
            global.isViewOnce = (type == 'viewOnceMessage')
            global.isAllMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' || type === 'contactMessage' || type === 'locationMessage')
            global.isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            global.isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
            global.isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            global.isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            global.isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
            global.isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
            global.isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
            global.isQuotedTeks = type === 'extendedTextMessage' && content.includes('quotedMessage')
            global.isQuotedTag = type === 'extendedTextMessage' && content.includes('mentionedJid')
            global.isQuotedReply = type === 'extendedTextMessage' && content.includes('Message')
            global.isQuotedText = type === 'extendedTextMessage' && content.includes('conversation')
            global.isQuotedextendedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')

//public/self
if (!bosco.public) {
if (!msg.key.fromMe) return
  }      
      //connect body with plugin
            if (body.startsWith(handlers)) {
                let argsm = body.slice(1).trim().split(/ +/g);
                global.args = body.trim().split(/ +/).slice(1)
                let plugin = argsm.shift().toLowerCase();
                let q = args.join(" ")
                //console.log({ plugin, args });
                if (isQuotedTeks) {
                  var match = msg.quoted.text;
                } else {
                  var match = q;
                }   
                if (bosco.plugins.has(plugin)) {
                    try { bosco.plugins.get(plugin).execute(bosco, msg, match);
                    } catch (error) {
                        console.log(error);
                    }
                }
            } else if (body.startsWith('https://youtu.be/')) { //auto download yt
                let args = body.trim().split(' ')
                let match = args[0]
                bosco.plugins.get(`yt`).execute(bosco, msg, match);
            } else if  (body.startsWith('https://www.instagram.com/')) { //auto download ig
                let args = body.trim().split(' ')
                let match = args[0]
                bosco.plugins.get(`ig`).execute(bosco, msg, match);
            }     
//Filter
const FilterDb = require('./plugins/sql/filters');
var filtreler = await FilterDb.getFilter(msg.key.remoteJid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            let pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(body)) {
                await bosco.sendMessage(msg.key.remoteJid,{ text : filter.dataValues.text }, {quoted: msg });
            }
        }
    );       
        }catch (err){
            console.log(err)
        }
    })



//------------------------------------------------//
    //Welcome 
    bosco.ev.on('group-participants.update', async (anu) => {
       // console.log(anu)
        try {
            let metadata = await bosco.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
                if (anu.action == 'add') {
                  var we = await getMessage(anu.id,'welcome');
if (we !== false) {
               //     bosco.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}` })
await bosco.sendMessage(anu.id,{ text : we.message.replace('&title', metadata.subject).replace('&desc', metadata.desc).replace('&mention','@' + num.split("@")[0]), mentions: [num]  })
}
                } else if (anu.action == 'remove') {
                 //   bosco.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split("@")[0]} Leaving To ${metadata.subject}` })
var gb = await getMessage(anu.id,'goodbye');
if (gb !== false) {
await bosco.sendMessage(anu.id,{ text : gb.message.replace('&title', metadata.subject).replace('&desc', metadata.desc).replace('&mention','@' + num.split("@")[0]), mentions: [num]  })
}
                } else if (anu.action == 'promote') {
                  //  bosco.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Promote From ${metadata.subject}` })
                } else if (anu.action == 'demote') {
                   // bosco.sendMessage(anu.id, { image: { url: ppuser }, mentions: [num], caption: `@${num.split('@')[0]} Demote From ${metadata.subject}` })
              }
            }
        } catch (err) {
            console.log(err)
        }
    })

    bosco.reply = (from, text) => bosco.sendMessage(from, { text: text }, { quoted: msg })     

    //Set status bio bot 
    bosco.setStatus = (status) => {
        bosco.query({
            tag: 'iq',
            attrs: {
                to: '@s.whatsapp.net',
                type: 'set',
                xmlns: 'status',
            },
            content: [{
                tag: 'status',
                attrs: {},
                content: Buffer.from(status, 'utf-8')
            }]
        })
        return status
    }
    
    // anticall auto block
    bosco.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    await bosco.sendMessage(callerId, { text: `Sistem otomatis block!\nJangan menelpon bot!\nSilahkan Hubungi Owner Untuk Dibuka !`})
    await bosco.updateBlockStatus(callerId, "block")
    }
    })   
    
     //Setting
    bosco.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
    let decode = jidDecode(jid) || {}
    return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
    }
        
    bosco.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = bosco.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })
        
    bosco.getName = async (jid, withoutContact  = false) => {
    let id = await bosco.decodeJid(jid)
     withoutContact = bosco.withoutContact || withoutContact 
    let v
    if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
    v = store.contacts[id] || {}
    if (!(v.name || v.subject)) v = await bosco.groupMetadata(id) || {}
    resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international')).replace(new RegExp("[()+-/ +/]", "gi"), "") 
    })
    else v = id === '0@s.whatsapp.net' ? {
    id,
    name: 'WhatsApp'
    } : id === bosco.decodeJid(bosco.user.id) ?
    bosco.user :
    (store.contacts[id] || {})
    return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international').replace(new RegExp("[()+-/ +/]", "gi"), "") 
     }
           
    //SEND 1 KONTAK
    bosco.sendKontak = (jid, nomor, nama, org = "", quoted = '', opts = {} ) => {
    const vcard ="BEGIN:VCARD\n" 
    +"VERSION:3.0\n" 
    + "FN:" +nama +"\n"
     +"ORG:" + org + "\n" 
    +"TEL;type=CELL;type=VOICE;waid=" +nomor + ":+" +nomor +"\n" 
    +"item1.X-ABLabel:Ponsel\n"
    +"item2.EMAIL;type=INTERNET:okeae2410@gmail.com\n"
    +"item2.X-ABLabel:Email\nitem3.URL:https://instagram.com/cak_haho\n"
    +"item3.X-ABLabel:Instagram\n"
    +"item4.ADR:;;Indonesia;;;;\n"
    +"item4.X-ABLabel:Region\n"
    +"END:VCARD"
     bosco.sendMessage(jid,{contacts: {displayName: nama, contacts: [{ vcard }] }, ...opts},{quoted})
    };    
    
    /**
    * 
    * @param {*} message 
    * @param {*} filename 
    * @param {*} attachExtension 
    * @returns 
    */
    bosco.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)
    let trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    // save to file
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
    }
    
    bosco.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.type ? message.type.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])
    }
    return buffer
    } 
    
    /**
    * 
    * @param {*} path 
    * @returns 
    */
    bosco.getFile = async (path, save) => {
    let res, filename
    let data = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (res = await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : typeof path === 'string' ? path : Buffer.alloc(0)
    if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
    let type = await FileType.fromBuffer(data) || {
    mime: 'application/octet-stream',
    ext: '.bin'
    }
    if (data && save && !filename) (filename = path.join(__dirname, './src/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
    return {
    res,
    filename,
    ...type,
    data
    }
    }
        
    /**
    * 
    * @param {*} jid 
    * @param {*} path 
    * @param {*} quoted 
    * @param {*} options 
    * @returns 
    */
    bosco.sendMedia = async (jid, path, quoted, options = {}) => {
    let { ext, mime, data } = await bosco.getFile(path)
    let messageType = mime.split("/")[0]
    let pase = messageType.replace('application', 'document') || messageType
    return await bosco.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
    } 
    
    
    /**
    * 
    * @param {*} jid 
    * @param {*} message 
    * @param {*} forceForward 
    * @param {*} options 
    * @returns 
    */
    bosco.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype
    if (options.readViewOnce) {
    message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
    vtype = Object.keys(message.message.viewOnceMessage.message)[0]
    delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
    delete message.message.viewOnceMessage.message[vtype].viewOnce
    message.message = {
    ...message.message.viewOnceMessage.message
    }
    }
    let mtype = Object.keys(message.message)[0]
    let content = await generateForwardMessageContent(message, forceForward)
    let ctype = Object.keys(content)[0]
    let context = {}
    if (mtype != "conversation") context = message.message[mtype].contextInfo
    content[ctype].contextInfo = {
    ...context,
    ...content[ctype].contextInfo
    }
    const waMessage = await generateWAMessageFromContent(jid, content, options ? {
    ...content[ctype],
    ...options,
    ...(options.contextInfo ? {
    contextInfo: {
    ...content[ctype].contextInfo,
    ...options.contextInfo
    }
    } : {})
    } : {})
    await bosco.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
    return waMessage
    }
                
    bosco.cMod = (jid, copy, text = '', sender = bosco.user.id, options = {}) => {
    let mtype = Object.keys(copy.message)[0]
    let isEphemeral = mtype === 'ephemeralMessage'
    if (isEphemeral) {
    mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
    }
    let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
    let content = msg[mtype]
    if (typeof content === 'string') msg[mtype] = text || content
    else if (content.caption) content.caption = text || content.caption
    else if (content.text) content.text = text || content.text
    if (typeof content !== 'string') msg[mtype] = {
    ...content,
    ...options
    }
    if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
    if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
    else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
    copy.key.remoteJid = jid
    copy.key.fromMe = sender === bosco.user.id
    return proto.WebMessageInfo.fromObject(copy)
    } 
        
        /**
         * 
         * @param {*} jid 
         * @param {*} buttons 
         * @param {*} caption 
         * @param {*} footer 
         * @param {*} quoted 
         * @param {*} options 
         */
        bosco.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
            let buttonMessage = {
                text,
                footer,
                buttons,
                headerType: 2,
                ...options
            }
            bosco.sendMessage(jid, buttonMessage, { quoted, ...options })
        }
    
    /**
         * 
         * @param {*} jid 
         * @param {*} text 
         * @param {*} quoted 
         * @param {*} options 
         * @returns 
         */
     bosco.sendText = (jid, text, quoted = '', options) => bosco.sendMessage(jid, { text: text, ...options }, { quoted })
    
     /**
      * 
      * @param {*} jid 
      * @param {*} path 
      * @param {*} caption 
      * @param {*} quoted 
      * @param {*} options 
      * @returns 
      */
     bosco.sendImage = async (jid, path, caption = '', setquoted, options) => {
    let buffer = Buffer.isBuffer(path) ? path : await getBuffer(path)
         return await bosco.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted : setquoted})
     }
    
     /**
      * 
      * @param {*} jid 
      * @param {*} path 
      * @param {*} caption 
      * @param {*} quoted 
      * @param {*} options 
      * @returns 
      */
     bosco.sendVideo = async (jid, yo, caption = '', quoted = '', gif = false, options) => {
         //let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
         return await bosco.sendMessage(jid, { video: yo, caption: caption, gifPlayback: gif, ...options }, { quoted })
     }    
    
    /**
         * 
         * @param {*} jid 
         * @param {*} path 
         * @param {*} quoted 
         * @param {*} mime 
         * @param {*} options 
         * @returns 
         */
     bosco.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await bosco.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }
    
    /**
     * 
     * @param {*} jid 
     * @param {*} text 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bosco.sendTextWithMentions = async (jid, text, quoted, options = {}) => bosco.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })
    
        /**
         * 
         * @param {*} jid 
         * @param {*} path 
         * @param {*} quoted 
         * @param {*} options 
         * @returns 
         */
    bosco.sendImageAsSticker = async (jid, media, dev, options = {}) => {
    let { Sticker, StickerTypes } = require('wa-sticker-formatter')
    let jancok = new Sticker(media, {
        pack: packName, // The pack name
        author: authorName, // The author name
        type: StickerTypes.FULL, // The sticker type
        categories: ['🤩', '🎉'], // The sticker category
        id: '12345', // The sticker id
        quality: 50, // The quality of the output file
        background: '#FFFFFF00' // The sticker background color (only for full stickers)
    })
    let stok = getRandom(".webp")
    let nono = await jancok.toFile(stok)
    let nah = fs.readFileSync(nono)
    await bosco.sendMessage(jid,{sticker: nah},{quoted: dev})
    return await fs.unlinkSync(stok)
     }
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    bosco.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
    
        await bosco.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
       
    /**
     * send group invitation via message
     * @param {string} jid gorupJid 
     * @param {string} participant this message sent to?
     * @param {string} inviteCode group invite code
     * @param {Number} inviteExpiration invite expiration
     * @param {string} groupName group name
     * @param {string} jpegThumbnail file path or url
     * @param {string} caption message caption
     * @param {any} options message options
     */
     bosco.sendGroupV4Invite = async(jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', jpegThumbnail, caption = 'Invitation to join my WhatsApp group', options = {}) => {
        let msg = WAProto.Message.fromObject({
            groupInviteMessage: WAProto.GroupInviteMessage.fromObject({
                inviteCode,
                inviteExpiration: inviteExpiration ? parseInt(inviteExpiration) : + new Date(new Date + (3 * 86400000)),
                groupJid: jid,
                groupName: groupName ? groupName : (await bosco.groupMetadata(jid)).subject,
                jpegThumbnail: jpegThumbnail ? (await getBuffer(jpegThumbnail)).buffer : '',
                caption
            })
        })
        const m = generateWAMessageFromContent(participant, msg, options)
       return await bosco.relayMessage(participant, m.message, { messageId: m.key.id })
    }    
    
    ///Button Image ✓
    bosco.sendButImage = async(id, text1, desc1, gam1, but = [], options1 = {}) => {
    let buttonMessage = {
    image: gam1,
    caption: text1,
    footer: desc1,
    buttons: but,
    headerType: 4
    }
    
    return await bosco.sendMessage(id, buttonMessage, options1)
    }
    
    ///Button Text ✓
    bosco.sendButMessage = async (id, text1, desc1, but = [], options  ) => {
    let buttonMessage = {
    text: text1,
    footer: desc1,
    buttons: but,
    headerType: 1
    }
    return bosco.sendMessage(id, buttonMessage,{quoted: options})
    }
    
    //Button Gif ✓
    bosco.send5ButGif = async (id, text1, desc1, gam1, but = [], options = {}) => {
    let message = await prepareWAMessageMedia({ video: gam1, gifPlayback: true }, { upload: bosco.waUploadToServer })
    let template = generateWAMessageFromContent(id, proto.Message.fromObject({
    templateMessage: {
    hydratedTemplate: {
    videoMessage: message.videoMessage,
    hydratedContentText: text1,
    hydratedFooterText: desc1,
    hydratedButtons : but
    }
    }
    }), {});
    return await bosco.relayMessage(id, template.message,{ messageId: template.key.id })
    }
    
    ///Button Image 2 ✓
    bosco.send5ButImg = async(id, text1, desc1, gam1, but = []) => {
    let message = await prepareWAMessageMedia({ image: gam1}, { upload: bosco.waUploadToServer })
    let template = generateWAMessageFromContent(id, proto.Message.fromObject({
    templateMessage: {
    hydratedTemplate: {
    imageMessage: message.imageMessage,
    hydratedContentText: text1,
    hydratedFooterText: desc1,
    hydratedButtons: but
    }
    }
    }), {});
    return await bosco.relayMessage(id, template.message,{ messageId: template.key.id })                   
    }    
    
    //Button Image 2 ✓
    bosco.send5ButLoc = async(id, text1, desc1, gam1, but = []) => {
      let template = generateWAMessageFromContent(id, proto.Message.fromObject({
      templateMessage: {
      hydratedTemplate: {
      locationMessage: { 
      jpegThumbnail: gam1},
      hydratedContentText: text1,
      hydratedFooterText: desc1,
      hydratedButtons: but
      }
      }
      }), {});
      return await bosco.relayMessage(id, template.message,{ messageId: template.key.id })                   
      }
    
    ///Button Loc ✓
    bosco.sendButLoc = async(id, text1, desc1, gam1, but = [], options1 = {}) => {
    let message = await prepareWAMessageMedia({ image: gam1}, { upload: bosco.waUploadToServer })
    let buttonMessage = {
    location: { jpegThumbnail: gam1 } ,
    caption: text1,
    footer: desc1,
    buttons: but,
    headerType: "LOCATION"
    }
    return await bosco.sendMessage(id, buttonMessage, options1)
    }
    
    //Button document ✓
    bosco.sendButDoc = async(id, text1, desc1, gam1, but = [], options, options1 = {}) => {	
    if(docType === "pptx"){
    var AppType = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    } else if(docType === "xlsx"){
    var AppType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    } else if(docType === "zip"){
    var AppType = "application/zip"
    } else if(docType === "pdf"){
    var AppType = "application/pdf"
    } else if(docType === "docx"){
    var AppType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    } 
    const buttonMessage = {
    contextInfo: options,
    document: fs.readFileSync('./temp/file.docx'),
    mimetype: AppType, 
    title : "Footer text", 
    fileLength : 999999999999, 
    pageCount: 100, 
    fileName : "Extream", 
    caption: text1,
    footer: desc1,
    buttons: but,
    headerType: "DOCUMENT"
    }
    
    return await bosco.sendMessage(id, buttonMessage,options1)
    } 
        
    return bosco
    }
//------------------------------------------------//
    
    connectToWhatsApp()
 
// End :) 
