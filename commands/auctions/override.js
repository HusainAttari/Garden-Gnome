const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : ['override','or'],
  expectedArgs : '<offer> <bidder id>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 2,
  maxArgs : 2,
  permissions : [],
  requiredRoles : ['Auctioneer', 'Private Room Owner'],
	requiredId : [],
  callback : async (message, arguments, text) => {

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

			if (message.mentions.members.first()){
				buyer = `<@${message.mentions.members.first().id}>`
				
				await info.updateAuc(message.channel.id, buyer, bid).catch(err => console.log(err))

				message.channel.send('Auction has been successfully overwritten!')
			}else{
				message.channel.send('Please mention the last valid bid.')
				return
			}

			
	},
}
