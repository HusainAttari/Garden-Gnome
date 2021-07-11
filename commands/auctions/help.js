const Discord = require('discord.js')

module.exports = {
	commands : 'help',
  expectedArgs : '<command>',
  permissionError : 'You do not have permission to run this command.',
  minArgs : 0,
  maxArgs : 1,
  permissions : [],
  requiredRoles : [],
	requiredId : [],
  callback : (message, arguments, text) => {
    if (arguments.length === 1){
       let cmd = arguments[0]
       if (cmd === 'auc' || cmd === 'auction'){
         const embed = new Discord.MessageEmbed()
         .setDescription(`**${cmd} :**\nDescription : To start an auction\nArguments : <time> <Auto-buy> <accepted payment> <bundle>\nFor example, \`!auc 60 100000 coins\`\nP.S. Mention bundle if you want to do a bundle. If not, leave it out.`)
         .setFooter('Aliases : auction, auc')
         .setColor('#aff0ae')
         message.channel.send(embed)
       }else if (cmd === 'bal' || cmd === 'balance' || cmd === '$'){
         const embed = new Discord.MessageEmbed()
         .setColor('#aff0ae')
         .setFooter('Aliases : bal, balance, $')
         .setDescription(`**${cmd} :**\nDescription : To bid on an ongoing auction\nArguments : <bid> [Pokemons/Stones if accepted]\nFor example, \`!bal 50k\`, \`!$ 100k\`, \`!balance 150m LR Xerneas\``)
         message.channel.send(embed)
       }else if (cmd === 'lc' || cmd === 'lastcall'){
         const embed = new Discord.MessageEmbed()
         .setColor('#aff0ae')
         .setFooter('Aliases : lc, lastcall')
         .setDescription(`**${cmd} :**\nDescription : Set last call pings. (Auctioneer only)\nArguments : <last calls separated with space>\nFor example, \`!lc pog shiny mega\`\nThe available pings are [pog/shiny/mega/legendary]. To reset the last call pings, \`!lc reset\``)
         message.channel.send(embed)
       }else if (cmd === 'or' || cmd === 'override'){
         const embed = new Discord.MessageEmbed()
         .setFooter('Aliases : or, override')
         .setColor('#aff0ae')
         .setDescription(`**${cmd} :**\nDescription : Overwrite the current auction. (Auctioneer only)\nArguments : <offer> <bidder id/mention the bidder>\nFor example, \`!or 100k @user\``)
         message.channel.send(embed)
       }else if (cmd === 'reset'){
         const embed = new Discord.MessageEmbed()
         .setColor('#aff0ae')
         .setFooter('Aliases : reset')
         .setDescription(`**${cmd} :**\nDescription : Resets the ongoing auction. (Auctioneer only)\nFor example, \`!reset\``)
         message.channel.send(embed)
       }else if (cmd === 'status'){
         const embed = new Discord.MessageEmbed()
         .setColor('#aff0ae')
         .setFooter('Aliases : status')
         .setDescription(`**${cmd} :**\nDescription : Shows the status of the ongoing auction\nFor example, \`!status\``)
         message.channel.send(embed)
       }else if (cmd === 'help'){
         const embed = new Discord.MessageEmbed()
         .setColor('#aff0ae')
         .setFooter('Aliases : help')
         .setDescription(`**${cmd} :**\nDescription : Shows the help screen\nArguments : <command>\nFor example, \`!help\`, \`!help status\``)
         message.channel.send(embed)
       }
    }else{
      const embed = new Discord.MessageEmbed()
      .setColor('#aff0ae')
      .setFooter('Created by @Diablo#1234')
      .setDescription('[Join here to support the creator](https://discord.gg/QQ5N4uspdK)\n[Click here for VAG Server link](https://discord.gg/tzfehaGZ2H)\n\nUse `!help <command>` to get more information about a command.\n\n**List of all available commands :**\n\n`!auc` - To start an auction\n`!bid` - To bid on an ongoing auction\n`!status` - To view the status of an ongoing auction\n`!lc` - To set last call pings. (Auctioneer only)\n`!or` - To overwrite an auction. (Auctioneer only)\n`!reset` - To reset an ongoing auction. (Auctioneer only)')
      /*.addFields({
          name : '`!auc`',
          value : 'To start an auction'
      },{
          name : '`!bid`',
          value : 'To bid on an auction'
      },{
          name : '`!lc`',
          value : 'To set last call pings. (Auctioneer only)'
      },{
          name : '`!or`',
          value : 'To overwrite auctions. (Auctioneer only)'
      },{
          name : '`!reset`',
          value : 'To reset an ongoing auction. (Auctioneer only)'
      },{
          name : '`!status`',
          value : 'To view the current status of the auction'
      })*/
      .setTitle('Help')
      message.channel.send(embed)
    }
    
	},
}
