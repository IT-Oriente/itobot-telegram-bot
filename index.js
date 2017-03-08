'use strict'

const TelegramBot = require('node-telegram-bot-api')
const time = require('time');
const clock = require('date-events')()
const fs = require('fs')

let token = process.env.BOT_TELEGRAM_API
let bot = new TelegramBot(token, { polling: true })

let now = new time.Date();
now.setTimezone('UTC+4');

bot.on('message', (msg) => {
  let chatId = msg.chat.id
  fs.writeFileSync(`./mensajes/${chatId}-${msg.message_id}.json`, JSON.stringify(msg, null, 2), 'utf8')
})

bot.on('text', (msg) => {
  let chatId = msg.chat.id
  bot.sendMessage(chatId, 'Recibí tu mensaje, te responderé en lo que sepa cómo')
})

bot.on('new_chat_participant', (msg) => {
  let chatId = msg.chat.id
  bot.sendMessage(chatId, `Bienvenido @${msg.new_chat_member.username} te invitamos a leer las normas del grupo en el siguiente enlace https://github.com/IT-Oriente/Bienvenido \n Espero te sientas a gusto en compartir tus experiencias con nosotros en tecnología. También estamos en Twitter como @ITOrienteVE ¡Siguenos!.`)
})

bot.on('left_chat_participant', (msg) => {
  let chatId = msg.chat.id
  bot.sendMessage(chatId, `Ahí va otro cliente satisfecho @${msg.left_chat_participant.username}`)
})

clock.on('8:00', function (now) {
    bot.sendMessage(-1001094487465, quoteOfDay)
})

console.log('Se ha iniciado el Bot')

function quoteOfDay() {

	let quotes = ['Buenos días, feliz y exitoso día a todos 😉', '¡Hola! buenos días. ¿Ya tomaron café? ☕️', '¡Hey!, ¡Que lindo día hace hoy! hora de comerse el mundo, ¡Éxitos mis orientales!😎', 'Buen día gente oriental, hoy les comparto este lindo tema https://www.youtube.com/watch?v=s5M1TuEwv-E' ];
	const min = 0;
	let max = quotes.length;
	let random = Math.floor(Math.random() * (max - min)) + min;

	return quotes[random]
}