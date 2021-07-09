const mongoose = require('mongoose')

const reqString = {
	type : String,
	required : true
}

const auctionSchema = mongoose.Schema({
	_id : reqString,
	channelId : reqString,
	seller : reqString,
	sellerId : reqString,
	bidder : {type : String, required : true, default : "No highest bidder"},
	pokemon : reqString,
	level : {type : Number, required : true},
	rarity : reqString,
	nature : reqString,
	mints : {type : Number, required : true, default : 0},
	ability : reqString,
	auto : {type : String, required : false, default : 'N/A'},
	time : {type : Number, required : true},
	offer : {type : Number, required : true, default : 0},
	acceptedPay : {type : String, required : true, default : "Coins only"},
	img : reqString,
	bundle : {type : Boolean, required : true, default : false},
	lc : {type : String, required : true, default : '<@&825233232341106738>'}
})

module.exports = mongoose.model('Auctions', auctionSchema)
