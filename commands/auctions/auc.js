const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : ['auc','auction'],
  expectedArgs : '<time> <Auto-buy> <accepted payment> <bundle>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 1,
  maxArgs : 4,
  permissions : [],
  requiredRoles : [],
	requiredId : [],
  callback : async (message, arguments, text, client) => {
		const auc = await info.getAuc(message.channel.id)
		if (auc.pokemon != '') {
			message.channel.send('An auction is currently ongoing in this room.')
			return
		}
	  
	  	function wait(ms){
			return new Promise(r => {setTimeout(r, ms)})
		}

		let details = {
			poke : '',
			rarity : '',
			nature : '',
			mints : 0,
			ability : '',
			time : 0,
			level : 0,
			pay : 'Coins only',
			img : '',
			ab : 'N/A'
		}
	
		//checking for valid time
		if (!isNaN(arguments[0]) && arguments[0] >= 15 ){
			details.time = arguments[0]
		}else{
			message.channel.send('Please enter a valid time for the auction!')
			return
		}

		//checking for auto-buy
		if (arguments[1] === 'na' || (!isNaN(arguments[1]) && arguments[1] >= 500000)) {
			if (arguments[1] === 'na'){
				details.ab = 'N/A'
			}else{
				details.ab = arguments[1]
			}
		}else{
			message.channel.send(`Invalid Auto-buy : **${arguments[1]}**`)
			return
		}

		//checking for valid accepted pay
		if(arguments.length >= 3) {
			switch(arguments[2]){
				case 'all' : 
				details.pay = 'Coins, Pokes, Stones'
				break
				case 'none' : 
				details.pay = 'Coins only'
				break
				case 'pokes' :
				details.pay = 'Coins, Pokes'
				break
				case 'stones' :
				details.pay = 'Coins, Stones'
				break
				case 'coins' :
				details.pay = 'Coins only'
				break
				default : 
				message.channel.send(`Invalid accepted mode of payment : **${arguments[2]}**. Please refer to !help for more info.`)
				return
			}
		}

		//collecting info of the poke
		message.channel.send('Please info the pokemon(s) you want to auction. (**Make sure to remove nicknames before info-ing the poke!**)')

		let i = 0
		let c = 0

		if(arguments[3] === 'bundle'){
			message.channel.send('Say `done` when you have info-ed all your pokemons')

			let filter = m => m.author.id === '666956518511345684' || m.author.id === message.author.id	
			let collector = new Discord.MessageCollector(message.channel, filter, {time : 30000})

			collector.on('collect', m => {
				if (m.author.id === message.author.id && m.content.toLowerCase() === 'cancel'){
					c = 1
					collector.stop()
				}
				if (m.author.id === '666956518511345684' && i === 0){
					details.poke = `[Click here for the list of pokemon](${m.url})`
					details.img = 'https://imgur.com/Qa4utJA.png'
					i = 1
				}else if (m.author.id === message.author.id && m.content.toLowerCase() === 'done'){
					collector.stop()
				}else if (m.author.id === message.author.id && m.content.toLowerCase() === 'cancel'){
					details.poke = ''
					return
				}
			})
			collector.on('end', async collected => {
				if (c === 0){
					//sending the data to mongodb
					await info.startAuc(message.channel.id, `${message.author.tag}'s Auction`, details.poke, details.rarity, details.nature, details.mints, details.ability, details.time, details.level, details.pay, details.img, details.ab, message.author.id, true)

					const embed = new Discord.MessageEmbed()
					.setAuthor(`${message.author.tag}'s Auction`)
					.addFields({
						name : '**__Pokemon :__**',
						value : details.poke,
						inline : false
					},{
						name : "**__Time Remaining__**",
						value : `${details.time} mins`,
						inline : true
					},{
						name : "**__Highest Bidder__**",
						value : 'No highest bidder',
						inline : true
					},{
						name : "**__Current Offer__**",
						value : 0,
						inline : true
					},{
						name : "**__Auto-Buy__**",
						value : details.ab,
						inline : true
					},{
						name : "**__Accepted Payment__**",
						value : details.pay,
						inline : true
					})
					.setColor("#aaf0ae")
					.setTimestamp()
					.setFooter('Venture Auction Gardens')
					.setImage(details.img)
					message.channel.send(embed)
					message.channel.send('<@&825233232341106738>')
					
					const e = new Discord.MessageEmbed()
					.setAuthor(`${message.author.tag}'s Auction`)
					.setColor('#aff0ae')
					.setTimestamp()
					.setFooter('Venture Auction Gardens')
					.setImage(details.img)
					.addFields({
						name : `**Channel :**`,
						value : `<#${message.channel.id}>`
					}, {
						name : `**Pokemon :**`,
						value : `**Bundle**`
					}, {
						name : `**Duration :**`,
						value : `${details.time} mins`
					})
					client.channels.cache.get('865543980598820865').send(e).then(async msg => {
						await wait(details.time*60*1000)
						msg.delete()
					}).catch(err => console.log(err))
				}
			})

			

		}else{
		message.channel.awaitMessages(m => m.author.id === '666956518511345684', {max : 1, time : 25000}).then(async collected => {
			
			//checking for nature
			details.nature = collected.first().embeds[0].fields[4].value

			//checking for ability
			details.ability = collected.first().embeds[0].fields[6].value
			
			//checking for name and level
			let desc = collected.first().embeds[0].description.split(/[ ]+/)
			if (desc[2] === '✨'){
				details.poke = '✨ Shiny ' + desc[1]
				if (desc[3].includes('♂') || desc[3].includes('♀')){
					details.level = desc[5].replace(')', '')
				}else {
					details.level = desc[4].replace(')', '')
				}
			}else if (desc[2].includes('♂') || desc[2].includes('♀')){
				details.poke = desc[1]
				details.level = desc[4].replace(')', '')
			}else {
				details.poke = desc[1]
				details.level = desc[3].replace(')', '')
			}

			//checking for image
			details.img = collected.first().embeds[0].thumbnail.url
			
			//checking for rarity
			if(desc[0].includes('n')) {
				details.rarity = '<:VAG_N:848282749855989781>'
			}else if(desc[0].includes('ur')) {
				details.rarity = '<:VAG_UR:825264447022039062>'
			}else if(desc[0].includes('u')) {
				details.rarity = '<:VAG_U:848282822040354848>'
			}else if(desc[0].includes('lr')) {
				details.rarity = '<:VAG_LR:825264344966889473>'
			}else if(desc[0].includes('sr')) {
				details.rarity = '<:VAG_SR:825264580786782209>'
			}else if(desc[0].includes('r')) {
				details.rarity = '<:VAG_R:848282789156618270>'
			}

			//checking for mints
			let footer = collected.first().embeds[0].footer
			
			if (footer.text.startsWith('Hidden')){
				details.mints = 0
			}else{
				let m = footer.text.split(' ')
				if(m[0] === 'Evolution'){
					if(m[7] === 'mint'){
						details.mints = m[9]
					}else{
						details.mints = 0
					}
				}else{
					details.mints = m[3]
				}
			}
			 
			
			
			//sending the data to mongodb
			await info.startAuc(message.channel.id, `${message.author.tag}'s Auction`, details.poke, details.rarity, details.nature, details.mints, details.ability, details.time, details.level, details.pay, details.img, details.ab, message.author.id, false)

			//creating embed to send
			const embed = new Discord.MessageEmbed()
			.setAuthor(`${message.author.tag}'s Auction`)
			.addFields({
				name : '**__Pokemon :__**',
				value : `${details.rarity} ${details.poke} (Lvl. ${details.level})`,
				inline : false
			},{
				name : '**__Nature :__**',
				value : details.nature,
				inline : true
			},{
				name : '**__Mints used :__**',
				value : details.mints,
				inline : true
			},{
				name : '**__Ability :__**',
				value : details.ability,
				inline : false
			},{
				name : "**__Time Remaining__**",
				value : `${details.time} mins`,
				inline : true
			},{
				name : "**__Highest Bidder__**",
				value : 'No highest bidder',
				inline : true
			},{
				name : "**__Current Offer__**",
				value : 0,
				inline : true
			},{
				name : "**__Auto-Buy__**",
				value : details.ab,
				inline : true
			},{
				name : "**__Accepted Payment__**",
				value : details.pay,
				inline : true
			})
			.setColor("#aaf0ae")
			.setTimestamp()
			.setFooter('Venture Auction Gardens')
			.setImage(details.img)
			message.channel.send(embed)
			message.channel.send('<@&825233232341106738>')
			
			const e = new Discord.MessageEmbed()
			.setAuthor(`${message.author.tag}'s Auction`)
			.setColor('#aff0ae')
			.setTimestamp()
			.setFooter('Venture Auction Gardens')
			.setImage(details.img)
			.addFields({
				name : `**Channel :**`,
				value : `<#${message.channel.id}>`
			}, {
				name : `**Pokemon :**`,
				value : `${details.rarity} ${details.poke} (Lvl. ${details.level})`
			}, {
				name : `**Duration :**`,
				value : `${details.time} mins`
			})
			client.channels.cache.get('865543980598820865').send(e).then(async msg => {
				await wait(details.time*60*1000)
				msg.delete()
			})
			
		}).catch(err => {console.log(err); message.channel.send('Couldn\'t get the info of the pokemon to be auctioned. Please try again.')})
		}
		
	  	
		let timer = setInterval(async f => {
			let x = await info.getAuc(message.channel.id)
			if (x.time != 0){
				await info.updateTime(message.channel.id, -1)
				if (details.time >= 60 && x.time === 15){
					if (x.bundle === false){
						const embed1 = new Discord.MessageEmbed()
						.setAuthor(x.seller)
						.addFields({
							name : '**__Pokemon :__**',
							value : `${x.rarity} ${x.pokemon} (Lvl. ${x.level})`,
							inline : false
						},{
							name : '**__Nature :__**',
							value : x.nature,
							inline : true
						},{
							name : '**__Mints used :__**',
							value : x.mints,
							inline : true
						},{
							name : '**__Ability :__**',
							value : x.ability,
							inline : false
						},{
							name : "**__Highest Bidder__**",
							value : x.bidder,
							inline : true
						},{
							name : "**__Current Offer__**",
							value : x.offer,
							inline : true
						},{
							name : "**__Auto-Buy__**",
							value : x.autoBuy,
							inline : true
						},{
							name : "**__Accepted Payment__**",
							value : x.pay,
							inline : true
						})
						.setColor("#aaf0ae")
						.setTimestamp()
						.setImage(x.img)
						.setFooter('Venture Auction Gardens')
						message.channel.send(embed1)
					}else{			
						const embed1 = new Discord.MessageEmbed()
						.setAuthor(x.seller)
						.addFields({
							name : '**__Pokemon :__**',
							value : x.pokemon,
							inline : false
						},{
							name : "**__Highest Bidder__**",
							value : x.bidder,
							inline : true
						},{
							name : "**__Current Offer__**",
							value : x.offer,
							inline : true
						},{
							name : "**__Auto-Buy__**",
							value : x.autoBuy,
							inline : true
						},{
							name : "**__Accepted Payment__**",
							value : x.pay,
							inline : true
						})
						.setFooter('Venture Auction Gardens')
						.setColor("#aaf0ae")
						.setTimestamp()
						.setImage(x.img)
						message.channel.send(embed1)
					}
					message.channel.send(x.lc)
				}
				
				if (x.time === 0){
					if (x.bundle === false){
						const embed1 = new Discord.MessageEmbed()
						.setAuthor(x.seller)
						.addFields({
							name : '**__Pokemon :__**',
							value : `${x.rarity} ${x.pokemon} (Lvl. ${x.level})`,
							inline : false
						},{
							name : '**__Nature :__**',
							value : x.nature,
							inline : true
						},{
							name : '**__Mints used :__**',
							value : x.mints,
							inline : true
						},{
							name : '**__Ability :__**',
							value : x.ability,
							inline : false
						},{
							name : "**__Highest Bidder__**",
							value : x.bidder,
							inline : true
						},{
							name : "**__Current Offer__**",
							value : x.offer,
							inline : true
						},{
							name : "**__Auto-Buy__**",
							value : x.autoBuy,
							inline : true
						},{
							name : "**__Accepted Payment__**",
							value : x.pay,
							inline : true
						})
						.setColor("#aaf0ae")
						.setTimestamp()
						.setImage(x.img)
						.setFooter('Venture Auction Gardens')
						message.channel.send(embed1)
					}else{			
						const embed1 = new Discord.MessageEmbed()
						.setAuthor(x.seller)
						.addFields({
							name : '**__Pokemon :__**',
							value : x.pokemon,
							inline : false
						},{
							name : "**__Highest Bidder__**",
							value : x.bidder,
							inline : true
						},{
							name : "**__Current Offer__**",
							value : x.offer,
							inline : true
						},{
							name : "**__Auto-Buy__**",
							value : x.autoBuy,
							inline : true
						},{
							name : "**__Accepted Payment__**",
							value : x.pay,
							inline : true
						})
						.setFooter('Venture Auction Gardens')
						.setColor("#aaf0ae")
						.setTimestamp()
						.setImage(x.img)
						message.channel.send(embed1)
					}
					message.channel.send(`**Auction Completed!**\n${x.bidder} meet <@${x.sellerId}> in ${message.guild.channels.cache.get('825240467595329536').toString()} or ${message.guild.channels.cache.get('840078518121398332').toString()}`)
					message.channel.send(info.houseOpen())

					await info.resetAuc(message.channel.id)

					clearInterval(timer)
				}
			}else{
				clearInterval(timer)
			}
		}, 60000)
	},
}
