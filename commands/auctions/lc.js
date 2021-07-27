const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : ['lc', 'lastcall'],
  expectedArgs : '<Last call pings separated with a space>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : null,
  permissions : [],
  requiredRoles : ['Auctioneer'],
	requiredId : [],
  callback : async (message, arguments, text) => {
		
	  	let x = await info.getAuc(message.channel.id)
		let lc = ''
		if (arguments.length){
			for (var arg of arguments){
				arg = arg.toLowerCase()
				switch (arg){
					case 'reset' :
						lc = '<@&825233232341106738> no last calls were set. Please ping last calls <:pepepray:864012819493289985>'
						message.channel.send('Last call pings have been reset!')
						await info.addLc(message.channel.id, lc)
						return
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
					case 'test' :
						lc = lc + '<@&865577816795250698> '
						break
					case 'excl' :
						lc = lc + '<@&867476785838161930> '
						break
					case 'legs' :
						lc = lc + '<@&825256942791819264> '
						break
				}
			}
			if (lc != ''){
				message.channel.send('Last call pings set!')

				await info.addLc(message.channel.id, lc)
			}else{
				message.channel.send('Incorrect pings set. The available last call pings are [pog/legendary/mega/shiny/lr]')
			}
			
		}else{
			if (!x.lc.startsWith('<@&825233232341106738>')){
				const embed = new Discord.MessageEmbed()
				.setColor('#aff0ae')
				.setDescription(`**Last Call Pings :**\n${x.lc}`)
				message.channel.send(embed)
			}else{
				const embed = new Discord.MessageEmbed()
				.setDescription('No last call pings set. The <@&825233232341106738> role will be pinged.')
				.setColor('#aff0ae')
				message.channel.send(embed)
			}
		}

		
	},
}
