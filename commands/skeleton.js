const Discord = require('discord.js')

module.exports = {
	commands : '',
  expectedArgs : '',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : null,
  permissions : [],
  requiredRoles : [],
	requiredId : [],
  callback : (message, arguments, text) => {
	},
}
