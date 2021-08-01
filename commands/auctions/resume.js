const Discord = require('discord.js')
const info = require('../../auction.js')

module.exports = {
	commands : 'resume',
  expectedArgs : '<bundle>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : 1,
  permissions : [],
  requiredRoles : ['Auctioneer'],
	requiredId : [],
  callback : async (message, arguments, text, client) => {
    const filter = m => m.author.id === message.author.id
 
    const q1 = ['Please enter the rarity of the pokemon :',
               'Please enter the name of the pokemon :',
               'Please enter the level of the pokemon :',
               'Please enter the nature of the pokemon :',
               'Please enter the ability of the pokemon :',
               'Please enter the number of mints used :',
               'Please enter the time remaining :',
               'Please enter auto buy if any :',
               'Please enter accepted payment :'
              ]
    
    const q2 = [
      'Please enter the link of the first poke in the bundle :',
      'Please enter the time remaining',
      'Please enter the auto buy if any :',
      'Please enter the accepted payment :'
    ]
    
    const a = []
    
    const deets = {
      rarity : '',
      name : '',
      level : 0,
      nature : '',
      ability : '',
      mints : 0,
      time : 0,
      ab : 'N/A',
      pay : '',
      img : ''
    }
    
    if (arguments[0] === 'bundle'){
      for (let i = 0, cancel = false; i < q2.length && cancel === false; i++){
        await message.channel.send(q2[i])
        await message.channel.awaitMessages(filter, {max : 1, time : 30000, errors : ['time']})
          .then(async col => {
            if (col.first().content.toLowerCase() === 'cancel'){
              await message.channel.send('Aborted.')
              cancel = true
            }else{
              a.push(col.first())
            }
            
          }).catch(async () => {
            await message.channel.send(':hourglass: Application timed out.')
            cancel = true
          })
      }
      deets.name = a[0]
      deets.time = a[1]
      
      if (a[2].toLowerCase() === 'na'){
        deets.ab = 'N/A'
      }else{
        if (!isNaN(a[2]) && a[2] >= 500000){
          deets.ab = a[2]
        }
      }
      
      deets.pay = a[3]
      switch (a[3]){
          case 'all' : 
				    deets.pay = 'Coins, Pokes, Stones'
				    break
				  case 'none' : 
				    deets.pay = 'Coins only'
				    break
				  case 'pokes' :
				    deets.pay = 'Coins, Pokes'
				    break
				  case 'stones' :
				    deets.pay = 'Coins, Stones'
				    break
				  case 'coins' :
				    deets.pay = 'Coins only'
				    break
				  default : 
				    message.channel.send(`Invalid accepted mode of payment : **${a[2]}**. Please refer to !help for more info.`)
				    return
      }
      
      deets.img = 'https://imgur.com/Qa4utJA.png'
      
    }
    
    
    
	},
}
