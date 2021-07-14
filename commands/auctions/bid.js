const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : ['bal','$', 'balance'],
  expectedArgs : '<bid>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 1,
  maxArgs : null,
  permissions : [],
  requiredRoles : [],
	requiredId : [],
  callback : async (message, arguments, text) => {
		const auc = await info.getAuc(message.channel.id)

		if (auc.pokemon === '') {
			message.channel.send('What\'re you bidding on dork? There are no current auctions ongoing here at the moment')
			return
		}

		if (message.author.id === auc.sellerId) {
			message.channel.send('<a:VAG_flushed_sunglasses:851870710514712646> Do I smell auction rigging?')
			return
		}

		let bid = 0
		let buyer = ''
		let x = arguments[0].slice()
		x = x[x.length-1]

		//checking for multiplyer
			if(x === 'm'){
				bid = parseInt(arguments[0].substring(0,arguments[0].length-1)*1000000)
			}else if (x === 'k') {
				bid = parseInt(arguments[0].substring(0,arguments[0].length-1)*1000)
			}else if (x === 'b') {
				bid =  parseInt(arguments[0].substring(0,arguments[0].length-1)*1000000000)
			}else{
				bid = parseInt(arguments[0])
			}

		if (typeof bid === 'number'){
		//checking for valid upbids
		if (auc.offer == 0){
			if (bid<50000){
				message.channel.send('Invalid bid. Minimum starting bid is 50k.')
				return
			}else {
				buyer = `<@${message.author.id}>`
			}
		}else if(auc.rarity.includes('VAG_LR')){
			if (bid<(auc.offer+50000)){
				message.channel.send('Invalid bid. Minimum upbid is 50k.')
				return
			}
		}else{
			if (bid<(auc.offer+20000)){
				message.channel.send('Invalid bid. Minimum upbid is 20k.')
				return
			}else{
				buyer = `<@${message.author.id}>`
			}
		}
		}else{
			message.channel.send('Invalid bid. Please bid a proper amount 🔫')
			return
		}
	  	
	  	if (auc.bidder != 'No highest bidder'){
			message.channel.send(`${auc.bidder}, you have been outbid!`)
		}

		//updating the bidder and highest offer
		await info.updateAuc(message.channel.id, buyer, bid).catch(err => {console.log(err)})

		if(auc.bundle === false){
		//creating new embed with updated info		
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
			value : `${Math.floor(auc.time/1000)} mins`,
			inline : true
		},{
			name : "**__Highest Bidder__**",
			value : buyer,
			inline : true
		},{
			name : "**__Current Offer__**",
			value : bid,
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
		
		//creating new embed with updated info		
		const embed = new Discord.MessageEmbed()
		.setAuthor(auc.seller)
		.addFields({
			name : '**__Pokemon :__**',
			value : auc.pokemon,
			inline : false
		},{
			name : "**__Time Remaining__**",
			value : `${Math.floor(auc.time/1000)} mins`,
			inline : true
		},{
			name : "**__Highest Bidder__**",
			value : buyer,
			inline : true
		},{
			name : "**__Current Offer__**",
			value : bid,
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
		.setFooter('Venture Auction Gardens')
		message.channel.send(embed)
		}
	  
	  	//extension
	  	if (auc.time <4000){
			auc.time = auc.time + 2000
			await info.updateTime(message.channel.id, auc.time)
		}else if (auc.time === 4000){
			await info.updateTime(message.channel.id, 5000)
		}

		//checking for autoBuy
		if (bid >= auc.autoBuy){
			message.channel.send(`**Auto-Buy Triggered!**\n<@${auc.sellerId}> meet ${buyer} in ${message.guild.channels.cache.get('825240467595329536').toString()} or ${message.guild.channels.cache.get('840078518121398332').toString()}`)
			message.channel.send(info.houseOpen())

			await info.resetAuc(message.channel.id)
		}
	},
}
