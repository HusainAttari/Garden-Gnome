const discord = require('discord.js')
const mongo = require('./mongo.js')
const aucSchema = require('./schemas/auction-schema.js')


module.exports.startAuc = async (channelId, seller, pokemon, rarity, nature, mints, ability, time, level, pay, img, ab, sellerId, bundle) => {
	return await mongo().then(async mongoose => {
		try{
			const result = await aucSchema.findOneAndUpdate({
				channelId : channelId
			},{
				channelId : channelId,
				rarity : rarity,
				seller : seller,
				pokemon : pokemon,
				nature : nature,
				mints : mints,
				ability : ability,
				time : time,
				level : level,
				acceptedPay : pay,
				img : img,
				auto : ab,
				sellerId : sellerId,
				bundle : bundle
			},{
				upsert : true
			})
		}finally{
			mongoose.connection.close()
		}
	})
}


module.exports.getAuc = async (channelId) => {
	return await mongo().then(async mongoose => {
		try{
			const result = await aucSchema.findOne({
				channelId : channelId
			})

			let seller = ''
			let pokemon = ''
			let nature = ''
			let mints = 0
			let ability = ''
			let time = 0
			let level = ''
			let offer = 0
			let rarity = ''
			let bidder = ''
			let pay = ''
			let img = ''
			let autoBuy = ''
			let sellerId = ''
			let bundle = false
			let lc = ''

			if (result){
				seller = result.seller
				pokemon = result.pokemon
				nature = result.nature
				mints = result.mints
				ability = result.ability
				time = result.time
				level = result.level
				offer = result.offer
				rarity = result.rarity
				bidder = result.bidder
				pay = result.acceptedPay
				img = result.img
				autoBuy = result.auto
				sellerId = result.sellerId
				bundle = result.bundle
				lc = result.lc
			}else {
				return "There are no current auctions going on!"
			}

			return {
				seller,
				pokemon,
				nature,
				mints,
				ability,
				time,
				level,
				offer,
				rarity,
				bidder,
				pay,
				img,
				autoBuy,
				sellerId,
				bundle,
				lc
			}

		}finally{
			mongoose.connection.close()
		}
	})
}

module.exports.updateAuc = async (channelId, bidderId, offer) => {
	return await mongo().then(async mongoose => {
		try {
			const result = await aucSchema.findOneAndUpdate({
				channelId : channelId
			},{
				bidder : bidderId,
				offer : offer
			},{
				upsert : true
			})
		} finally {
			mongoose.connection.close()
		}
	})
}

module.exports.resetAuc = async (channelId) => {
	return await mongo().then(async mongoose => {
		try {
			await aucSchema.findOneAndUpdate({
				channelId : channelId
			},{
				channelId : channelId,
				rarity : '',
				seller : '',
				pokemon : '',
				nature : '',
				mints : 0,
				ability : '',
				time : 0,
				level : 0,
				acceptedPay : 'Coins only',
				bidder : 'No highest bidder',
				offer : 0,
				sellerId : '',
				bundle : false,
				lc : '<@&825233232341106738>',
				img : ''
			},{
				upsert : true
			})
		} finally {
			mongoose.connection.close()
		}
	})
}

const banner = [
	'https://imgur.com/ZxGSNFt',
	'https://imgur.com/OD8ZR68',
	'https://imgur.com/PbBw9OH',
	'https://imgur.com/Vu2HEHI',
	'https://imgur.com/q1aehn9',
	'https://imgur.com/va6LKjN',
	'https://imgur.com/jTs3oMB',
	'https://imgur.com/wKz10a4',
	'https://imgur.com/E9Ubjf8',
	'https://imgur.com/uGTQYxO',
	'https://imgur.com/I6av5d8',
	'https://imgur.com/ADhtfqV',
	'https://imgur.com/yGsLZs4',
	'https://imgur.com/QWNnaV4',
	'https://imgur.com/3UKfw8v',
	'https://imgur.com/CKFy2mS',
	'https://imgur.com/VAfgGO9'
]

module.exports.houseOpen = () => {
	var x = Math.floor(Math.random()*banner.length)
	return banner[x]
}

module.exports.updateTime = async (channelId, time) => {
	return await mongo().then(async mongoose => {
		try{
			await aucSchema.findOneAndUpdate({
				channelId : channelId
			},{
				time : time
			},{
				upsert : true
			})
		}finally{
			mongoose.connection.close()
		}
	})
}

module.exports.addLc = async (channelId, lc) => {
	return await mongo().then(async mongoose => {
		try{
			await aucSchema.findOneAndUpdate({
				channelId : channelId
			},{
				lc : lc
			},{
				upsert : true
			})
		}finally{
			mongoose.connection.close()
		}
	})
}
