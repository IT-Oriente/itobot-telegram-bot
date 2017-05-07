exports.quoteOfDay = () => {
  let quotes = ['Buenos días, feliz y exitoso día a todos 😉', '¡Hola! buenos días. ¿Ya tomaron café? ☕️', '¡Hey!, ¡Que lindo día hace hoy! hora de comerse el mundo, ¡Éxitos mis orientales!😎', 'Buen día gente oriental, hoy les comparto este lindo tema https://www.youtube.com/watch?v=s5M1TuEwv-E']
  const min = 0
  let max = quotes.length
  let random = Math.floor(Math.random() * (max - min)) + min

  return quotes[random]
}
