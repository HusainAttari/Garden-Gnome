const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : ['lc', 'lastcall'],
  expectedArgs : '<Last call pings separated with a space>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 1,
  maxArgs : null,
  permissions : [],
  requiredRoles : ['Auctioneer'],
	requiredId : [],
  callback : async (message, arguments, text) => {
		
		let lc = ''

		for (var arg of arguments){
			arg = arg.toLowerCase()
			switch (arg){
				case 'pog' : 
					lc = lc+ '<@&838115681689010197> '
					break
				case 'legendary' :
					lc = lc + '<@&825256942791819264> '
					break
				case 'shiny' :
					lc = lc + '<@&825256996437229568> '
					break
				case 'lr' :
					lc = lc + '<@&825257678447706152> '
					break
				case 'mega' :
					lc = lc + '<@&825257756008382475> '
					break
			}
		}

		if(!lc){
			message.channel.send('Please put the last calls you want <pog/legendary/shiny/lr/mega>')
			return
		}

		message.channel.send('Last call pings set!')

		await info.addLc(message.channel.id, lc)
	},
}
