'use strict'

const TelegramBot = require('node-telegram-bot-api')
const time = require('time')
const clock = require('date-events')()
const quoteOfDay = require('./utils/utils.js').quoteOfDay

let token = process.env.BOT_TELEGRAM_API
let bot = new TelegramBot(token, { polling: true })

let now = new time.Date()
now.setTimezone('UTC-4', true)

bot.on('new_chat_participant', msg => {
  let chatId = msg.chat.id || ''
  if (msg.new_chat_member.username !== 'It_oriente_bot') {
    bot.sendMessage(chatId, `Bienvenido @${msg.new_chat_member.username} te invitamos a leer las normas del grupo en el siguiente enlace https://github.com/IT-Oriente/Bienvenido \n Espero te sientas a gusto en compartir tus experiencias con nosotros en tecnología. También estamos en Twitter como @ITOrienteVE ¡Siguenos!.`)
  }
})

bot.on('left_chat_participant', msg => {
  let chatId = msg.chat.id || ''
  bot.sendMessage(chatId, `Ahí va otro cliente satisfecho @${msg.left_chat_participant.username}`)
})

clock.on('8:00', function (now) {
  bot.sendMessage(-1001094487465, quoteOfDay())
})

console.log(`Se ha iniciado el Bot ${now}`)
