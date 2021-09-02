const Discord = require('discord.js')

module.exports = {
	commands : 'test',
  expectedArgs : '',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : null,
  permissions : [],
  requiredRoles : [],
	requiredId : ['819620327235387408'],
  callback : (message, arguments, text) => {
    if (arguments[0] === 'embedinfo' || arguments[0] === 'ei'){
      message.channel.awaitMessages(m => m.author.id === '666956518511345684' && m.embeds[0], {max: 1, time: 30000, error: ['time']}).then(col => {
        console.log(col.first().embeds[0])
	message.channel.send(`Embed recorded!`)
      }).catch(err => console.log(err))
    }
	},
}
