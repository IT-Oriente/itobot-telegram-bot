'use strict'

const TelegramBot = require('node-telegram-bot-api')
const clock = require('date-events')()
const moment = require('moment-timezone')
const quoteOfDay = require('./utils/utils.js').quoteOfDay

const token = process.env.BOT_API_KEY
const botName = process.env.BOT_NAME
const groupId = process.env.GROUP_ID

const bot = new TelegramBot(token, { polling: true })

const now = moment.tz('America/Caracas')

bot.on('new_chat_participant', msg => {
  if (!msg || !msg.chat || !msg.chat.id || !msg.new_chat_member || msg.new_chat_member.username === botName) return;

  const chatId = msg.chat.id
  const userName = msg.new_chat_member.username ? `@${msg.new_chat_member.username} ` : ''
  bot.sendMessage(chatId, `Bienvenido ${userName}te invitamos a leer las normas del grupo en el siguiente 
  enlace https://github.com/IT-Oriente/Bienvenido \n Espero te sientas a gusto en compartir tus experiencias con nosotros en tecnología. 
  También estamos en Twitter como @ITOrienteVE ¡Siguenos!.`)
  
})

bot.on('left_chat_participant', msg => {
  if (!msg || !msg.chat || !msg.chat.id) return;

  const chatId = msg.chat.id
  bot.sendMessage(chatId, `Ahí va otro cliente satisfecho`)
})

clock.on('8:00', function (now) {
  bot.sendMessage(groupId, quoteOfDay())
})

console.log(`Se ha iniciado el Bot ${now}`)
