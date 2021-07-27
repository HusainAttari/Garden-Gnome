const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : 'reset',
  expectedArgs : '',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : 0,
  permissions : [],
  requiredRoles : ['Auctioneer', 'Private Room Owner'],
	requiredId : [],
  callback : async (message, arguments, text) => {
		await info.resetAuc(message.channel.id)
		message.channel.send('The ongoing auction has been successfully reset.')
	},
}
