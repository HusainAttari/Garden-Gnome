const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : 'status',
  expectedArgs : '',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : 0,
  permissions : [],
  requiredRoles : [],
	requiredId : [],
  callback : async (message, arguments, text, client) => {
		const auc = await info.getAuc(message.channel.id)

		if (auc.pokemon === '') message.channel.send('No active auctions here!')
		else if (auc.bundle === false) {
		const embed = new Discord.MessageEmbed()
		.setAuthor(auc.seller)
		.addFields({
			name : '**__Pokemon :__**',
			value : `${auc.rarity} ${auc.pokemon} (Lvl. ${auc.level})`,
			inline : false
		},{
			name : '**__Nature :__**',
			value : auc.nature,
			inline : true
		},{
			name : '**__Mints used :__**',
			value : auc.mints,
			inline : true
		},{
			name : '**__Ability :__**',
			value : auc.ability,
			inline : false
		},{
			name : "**__Time Remaining__**",
			value : `${auc.time} mins`,
			inline : true
		},{
			name : "**__Highest Bidder__**",
			value : auc.bidder,
			inline : true
		},{
			name : "**__Current Offer__**",
			value : auc.offer,
			inline : true
		},{
			name : "**__Auto-Buy__**",
			value : auc.autoBuy,
			inline : true
		},{
			name : "**__Accepted Payment__**",
			value : auc.pay,
			inline : true
		})
		.setColor("#aaf0ae")
		.setTimestamp()
		.setImage(auc.img)
		.setFooter('Venture Auction Gardens')
		message.channel.send(embed)
	}else{
		const embed = new Discord.MessageEmbed()
		.setAuthor(auc.seller)
		.addFields({
			name : '**__Pokemon :__**',
			value : auc.poke,
			inline : false
		},{
			name : "**__Time Remaining__**",
			value : `${auc.time} mins`,
			inline : true
		},{
			name : "**__Highest Bidder__**",
			value : auc.bidder,
			inline : true
		},{
			name : "**__Current Offer__**",
			value : auc.offer,
			inline : true
		},{
			name : "**__Auto-Buy__**",
			value : auc.autoBuy,
			inline : true
		},{
			name : "**__Accepted Payment__**",
			value : auc.pay,
			inline : true
		})
		.setFooter('Venture Auction Gardens')
		.setColor("#aaf0ae")
		.setTimestamp()
		message.channel.send(embed)
	}
	},
}
