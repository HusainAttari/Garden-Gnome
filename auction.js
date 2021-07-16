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
				lc : '<@&825233232341106738> no last calls were set. Please ping last calls <:pepepray:864012819493289985>',
				img : '',
				auto : 'N/A'
			},{
				upsert : true
			})
		} finally {
			mongoose.connection.close()
		}
	})
}

const banner = [
	'https://imgur.com/J6HDBQA',//blaziken-mega
	'https://imgur.com/ZJvekHk',//centiskorch
	'https://imgur.com/UH9Mb5p',//cosmog
	'https://imgur.com/TQbke0b',//furret
	'https://imgur.com/JYF7s0j',//ponyta-galar
	'https://imgur.com/goqu0EE',//gardevoir-mega + gallade-mega
	'https://imgur.com/KJMZiqq',//beedrill
	'https://imgur.com/gtSwHUs',//keldeo
	'https://imgur.com/53TJrzd',//lillipup
	'https://imgur.com/y0sAGaA',//marshadow
	'https://imgur.com/puALzxt',//meowth
	'https://imgur.com/pLvPLDy',//mimikyu
	'https://imgur.com/B8HXWUf',//pachirisu
	'https://imgur.com/XG78cGX',//pichu
	'https://imgur.com/ojCgtBo',//pikachu
	'https://imgur.com/iRnfBfm',//raichu-alola
	'https://imgur.com/CIrZDM0',//rowlet
	'https://imgur.com/N9GX0ec',//spheal
	'https://imgur.com/3uxVUBO',//wailord
	'https://imgur.com/KxMjc9x',//zekrom
	'https://imgur.com/Kb9KdRj'//zigzagoon-galar
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
				$inc : {
					time : time
				}
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
