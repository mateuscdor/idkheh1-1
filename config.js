// Add values if you are not using env vars
const fs = require("fs");
require("dotenv").config();
const { Sequelize } = require('sequelize');
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

const DATABASE_URL = process.env.DATABASE_URL === undefined ? './bosco.db' : process.env.DATABASE_URL;
const DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
module.exports = {
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './bosco.db' ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: DEBUG }) : new Sequelize(DATABASE_URL, { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: DEBUG }),
    DEBUG: DEBUG
};

global.bot_name = process.env.BOT_NAME ||'ʙᴏꜱᴄᴏ'
global.session_id = process.env.SESSION_ID
global.heroku_app_name = process.env.HEROKU_APP_NAME
global.heroku_api_key = process.env.HEROKU_API_KEY
global.handlers = (process.env.PREFIX || '^[.,!]').trim()
global.botimg = process.env.BOT_THUMB ||'https://telegra.ph/file/8fd47f9ccb7c39008b998.jpg'
global.bot_footer = process.env.BOT_FOOTER ||' 「 ʙᴏꜱᴄᴏ ʙᴏᴛ 」\nᴄʀᴇᴀᴛᴇᴅ ʙy ᎮᏋᎮᏋ Sɪʀ ×፝֟͜×'
global.bot_vid = process.env.ALIVE_VIDEO ||'https://telegra.ph/file/a209db546105ed9447d2a.mp4'
global.alive_text = process.env.ALIVE_TEXT ||'Bot is alive'
global.owner_link = process.env.OWNER_LINK || 'https://instagram.com/pepe.sir_?'
global.mode = process.env.MODE || 'private'

