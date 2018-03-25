const Discord = require("discord.js");
const client = new Discord.Client();
const weather = require("weather-js");
 Music = require("./Music.js"),
con = console.log,
music = new Music()
var prefix = "*";
var test = 2;
 
 client.on("ready", () => {
 
var memberNumber = client.users.size;
var serverNumber = client.guilds.size;
let games = [`Createur Narcisse| prefix: ${prefix}`, `` + prefix + `help`,`` + serverNumber + ` serveur`|+ memberNumber +`user`];
    setInterval(() => {
        client.user.setGame(games[Math.floor(Math.random() * games.length)], "https://twitch.tv/bot")
    }, 5000);
 
 client.user.setStatus("idle");
 
	console.log("--------------------------------------");
 
  console.log("MoNitro online\nNombre de serveurs: " + serverNumber + "\navec\n" + memberNumber + " utilisateurs");
 
});
var messages = [];
client.on('message', message => {
  const msgc = message.content;
   music.setVoiceChannel(message.member.voiceChannel);
    var array_msg = msgc.split(' ');
            messages.push(message);
            switch (array_msg[0]) {
        case (prefix +"play") :
            con("Play");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.voice();
            break;
        case (prefix +"pause") :
            con("Pause");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.pause();
            break;
        case (prefix + "resume") :
            con("Resume");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            music.resume();
            break;
        case (prefix + "stop") :
            con("Stop");
            message.delete(message.author);
            if (!music.getVoiceChannel()) return message.reply("Veuillez vous connectez en vocal !");
            if (music.getTab(0) == null) return message.reply('Aucune musique, merci d\' en ajouté.');
            else music.stop();
            message.reply("La queue à était vidé !");
            break;
        case (prefix +"add") :
            con("Add");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            search(link, opts, function(err, results) {
                if(err) return con(err);
                for (var y = 0; results[y].kind == 'youtube#channel'; y++);
                message.channel.sendMessage(results[y].link);
                music.setTabEnd(results[y].link);
            });
            break;
        case (prefix +"link") :
            con("Link");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            con(link);
            music.setTabEnd(link);
            break;
        case (prefix +"volume") :
            con("Volume");
            message.delete(message.author);
            var link = msgc.split(' ');
            link.shift();
            link = link.join(' ');
            music.volume(link/100);
            message.reply("le volume et maintenant à :" + link);
            break;
        case (prefix +"next") :
            con("Next");
            message.delete(message.author);
            if (music.getI() < music.getLengthTab()) music.setI(this.i + 1);
            if (music.getI() >= music.getLengthTab()) music.setI(0);
            music.next();
            break;
    }  
});
client.on('message', message => {
 
let msg = message.content.toUpperCase();                                          let sender = message.author;                                 
let cont = message.content.slice(prefix.length).split(" ");                                                             
let args = cont.slice(1);                                                                let messageArray = message.content.split(" ");                                            let cmd = messageArray[0];
 
if(message.content.startsWith("*help")){
message.channel.send(` **:envelope_with_arrow: Le help est en Message privé** `)
}
if(message.content.startsWith("*serveur")){ message.channel.send(`Hey tu peux rejoindre le serveur des createurs du bot Ici https://discord.gg/EupK3xW`) 
}
if (msg.startsWith(prefix + 'METEO')) {                                                                                    // You can find some of the code used here on the weather-js npm page in the description.                                                                                                                   weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.                                               if (err) message.channel.send(err);
                                                                                                                  // We also want them to know if a place they enter is invalid.                                        if (result === undefined || result.length === 0){
                message.channel.send('**Veuillez entrer un lieu valide.**') // This tells them in chat that the place they entered is invalid.                                                                              return; // This exits the code so the rest doesn't run.                                           }                                                                                                                                                                                                           // Variables                                                                                          var current = result[0].current; // This is a variable for the current part of the JSON output                                                                                                              var location = result[0].location; // This is a variable for the location part of the JSON
 output
                                                                                                                  // Let's use an embed for this.
            const embed = new Discord.RichEmbed()                                                     
.setDescription(`**${current.skytext}**`) 
.setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.                                                                                 .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed                               
.setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex                                      .
addField('Fuseau horaire',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation                                                                   .addField('Type de degré',location.degreetype, true)// This is the field that shows 
                .addField('Temperature',`${current.temperature} °`, true)
                .addField(':thermometer: Se sent comme', `${current.feelslike} °`, true)
                .addField(':dash:  les vents',current.winddisplay, true)
                .addField(':sweat_drops:Humidité', `${current.humidity}%`, true)
 
                // Now, let's display it when called
                message.channel.send({embed});

    }
if(message.content.startsWith(prefix + "uinfos")) {
let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
    if(!User) return message.channel.send("**Je ne trouve pas l'utilisteur . Veuillez ressayer.**");
    
   

    let uinfoEmbed = new Discord.RichEmbed()
    .setDescription("__**UserInfo**__")
    .setColor('#00FFE8')
    .addField("🤚 Pseudo", `${User.user.username}`)
    .addField("#⃣ ", `${User.user.discriminator}`)
    .addField("🆔", `${User.user.id}`)
    .addField("🌍 Créé le", `${User.user.createdAt}`)
    .addField("Dernier message envoyé", `${User.user.lastMessage}`)
    .addField("🤖 Bot ?", `${User.user.bot}`)
     .setThumbnail(User.user.displayAvatarURL);

    


    message.channel.send(uinfoEmbed);

 }

if(message.content.startsWith(prefix + "8ball")) {
if(!args) return message.reply("Please ask a full question")
  let replies = ["Oui", "Non", "Possible", "Re pose la Question","Certainement","Certainem
ent pas"];
 let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");                                                   let ballembed = new Discord.RichEmbed()
 .setAuthor(message.author.tag)
  .setColor("#42f453")
  .addField("Question", question)
  .addField("Reponse", replies[result]);
  message.channel.send(ballembed)
}
if(message.content.startsWith(prefix + "list")) {

    let uinfoEmbed = new Discord.RichEmbed()
    .setDescription("__**Infos**__")
                                                      .setColor('#00FFE8')
    .addField("Serveur liste", `${client.guilds.map(g=>g.name).join("\n")}`)

    message.channel.send(uinfoEmbed);                                                     
     }
if(cmd === `${prefix}report`){
                                                                                                          //!report @ned this is the reason
                                                                                                          let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send(":warning: Imposible de trouver cette utilisateur");           let rreason = args.join(" ").slice(22);                                                                                                                                                                     let reportEmbed = new Discord.RichEmbed()                                                             .setDescription("Reports")                                                                            .setColor("#15f153")
    .addField("Reported User", `${rUser.user.tag} :id: ${rUser.id}`)                                           .addField("Report Par", `${message.author.tag} :id: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Heure", message.createdAt)
    .addField("Raison", rreason);
 
    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send(":warning: Impossible de trouver la chaîne de rappports.");
 
 
    message.delete().catch(O_o=>{});                                                                      reportschannel.send(reportEmbed);                                                                                                                                                                           return;                                                                                             }
if(cmd === `${prefix}serverinfos`){
 
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Informations")                                                    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField(":shield: Nom du serveur", message.guild.name)
    .addField(":crown: Fondateur", `${message.guild.owner.user.tag}`)                          .addField(":hammer_and_pick:  Date de creation ", message.guild.createdAt)
    .addField(":airplane_arriving:  Tu a rejoint", message.member.joinedAt)                    .addField(":earth_americas: Region", `${message.guild.region}`)
     .addField('Channels', `${message.guild.channels.filter(chan => chan.type === 'voice')
.size} :loud_sound: / ${message.guild.channels.filter(chan => chan.type === 'text').size}
:keyboard:`)
    .addField(":bust_in_silhouette: Members", message.guild.memberCount);
    return message.channel.send(serverembed);                                               }
if (message.content.startsWith(prefix + "avatar")) {
        if (!message.mentions.users.first()) return message.channel.send("** ❌ | Entrez un utilisateur.**")
   let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
  let ava = user.displayAvatarURL
  let embed = {
      color:0xFF0005,
      description:"Voici l'avatar de "+user.username+": *[url]("+ava+")*",
      image:{url:ava}
    }
  message.channel.send("", {embed})
}
if(message.content.startsWith(prefix + "invite")) {    // Donc ici ton !help (le préfixe que t'as mis est !)
    message.channel.send({
            embed: {
                color: 0xC12127,
                title: "Invite Le bot",
                description: " https://bot.discord.io/monitro20 ",
                thumbnail: {
                    url: "https://bot.discord.io/monitro20"
                },
                fields: [{
                    name: "Pour l'aide.",
                    value: "`il faut faire !help `" 
                }],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Par Narcisse"
                }
            }
        });
}
if(message.content === prefix + "botinfos") {
	var help_embed = new Discord.RichEmbed()
		.setColor('#FF0004')
		.setTitle('Infos du Bot')
		.addField('Informations principales du bot','Ce Bot est un bot programé sur telephone donc si bug veuillez me le dire en mp ')
		.addField('Nouveautées d bot ','*newsbot => Nouveautés')
		.addField('Petites infos','*owner => Je vous dit mon createur')
		.addField('\n**Version:**','0.3')
		.addField('**Logiciel:**','Nodejs')
		.addField('**Date de creation:**','22/11/17')
		.addField('**Language:**','Francais')
		.addField('**Region du Bot:**','Europe')
		.addField('**Prefix:**','*')
		.addField('**Nom du Bot:**','@MoNitro#7150')
message.channel.send(help_embed);
}  
if(message.content === prefix + "help") {
	var help_embed = new Discord.RichEmbed()
		.setColor('#FF0500')
		.setTitle('Liste des commandes')
		.setFooter('Made by Narcisse')
		.addField('__**:gear:  Utile**__','\n ***avatar =>** Je donne  l avatar de la personne mentionnée \n ***ping =>** Je repond Pong + Ms')
		.addField('\n__**:newspaper2: Bot-Utiles**__','\n ***botinfos =>** Informations sur le bot \n ***report =>** Permet de report une personne au pres des admins  \n***METEO <ville> =>** Permet de voir la météo de la ville \n***serverinfos=>** Permet de voir les infos du derveur \n***invite =>** Invite le bot sur ton serveur \n ***serveur =>** rejoint mon serveur ')
		.addField('\n__**:video_game:  Fun**__',' ***flip =>** Je lance une pièce \n ***test =>** pour voir si le bot fonctionne \n***search_google =>** Permet de faire un recherche google \n***afk =>** Permet de se mettre afk \n***remafk =>** enlève ton afk \n ')
		.addField('\n__**:hammer_and_pick: Administration**__',' ***kick =>** Permet kick un membre  \n ****ban =>***Ban un membre \n***mute =>** Permet de  mute un membre \n***unmute =>** Permet de unmute un membre \n')
message.author.send(help_embed);
}});

client.on('message', message => {
if (message.content === "*flip") {
        var result = Math.floor((Math.random() * 2) + 1);
        if (result == 1) {
        message.channel.send("**Pile !**");
        } else if (result == 2) {
                message.channel.send("**Face !**");
        }
    }
});
 
	
	
 
client.on('message', message => {
  if (message.content.startsWith('*play')) {
    // On récupère le premier channel audio du serveur
    let voiceChannel = message.guild.channels
      .filter(function (channel) { return channel.type === 'voice' })
      .first()
    // On récupère les arguments de la commande 
    // il faudrait utiliser une expression régulière pour valider le lien youtube
    let args = message.content.split(' ')
    // On rejoint le channel audio
    voiceChannel
      .join()
      .then(function (connection) {
        // On démarre un stream à partir de la vidéo youtube
        let stream = YoutubeStream(args[1])
        stream.on('error', function () {
          message.reply("Je n'ai pas réussi à lire cette vidéo :(")
          connection.disconnect()
        })
        // On envoie le stream au channel audio
        // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
        connection
          .playStream(stream)
          .on('end', function () {
            connection.disconnect()
          })
      })
  }
 
})
	client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
 
    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('**Pong 🏓!** `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }
});
var fs = require('fs');
let points = JSON.parse(fs.readFileSync('./points.json', 'utf8'));
 
client.on("message", message => {
if(!message.content.startsWith(prefix)) return;
if(message.author.bot) return;
if(!points[message.author.id]) points[message.author.id] = {points: 0, level: 0};
let userData = points[message.author.id];
userData.points++;
let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
if(curLevel > userData.level) {
// Level up!
userData.level = curLevel;
message.reply(`Vous avait passer un niveau **${curLevel}**! ça fait quoi de vieillir?`);
}
if(message.content.startsWith(prefix + "level")) {
message.reply(`Vous êtes actuellement niveau ${userData.level}, avec ${userData.points}XP.`);
}
fs.writeFile('./points.json', JSON.stringify(points), (err) => {if(err) console.error(err)});
});
client.on("message", message => {
    if(message.content.startsWith(prefix + "search_google")) {
        var host_search_google = "https://www.google.fr/search?q=";
        var search_google = message.content.substr(16);        // Il faut adapter le nombre (ici 16) selon le préfixe. S'il y en a qu'un seul par exemple &, il faut mettre 15, 2 par exemple && c'est 16, 3 par exemple &&& c'est 17 ...
 
        var replace_google = /\s/gi;
        var string_google = search_google;
        var newstring_google = string_google.replace(replace_google, "+");
 
        message.channel.send({
            embed: {
                color: 0xC12127,
                title: "Recherche Google",
                description: "Recherche Google sur " + search_google,
                thumbnail: {
                    url: "https://forum.alsacreations.com/upload/16785-search.png"
                },
                fields: [{
                    name: search_google,
                    value: host_search_google +""+ newstring_google
                }],
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "By Narcisse" 
                }
            }
        });
    }
});
client.on('message', message => {
  if (message.content === 'Mon avatar') {
    message.reply(message.author.avatarURL);
  }
});
client.on('guildMemberAdd', member => {
  member.createDM().then(channel => {
    return channel.send('Bienvenue sur mon serveur ' + member.displayName)
  }).catch(console.error)
})
client.on("guildMemberAdd", member => {
const channel = member.guild.channels.find('name', 'monitro');
if(!channel) {
return;
}
channel.send(`${member.user.username} a rejoint 
${member.guild.name}`);
});
client.on("guildMemberRemove", member => {
const channel = member.guild.channels.find('name', 'monitro');
if(!channel) {
return;
}
channel.send(`${member.user.username} a quitté 
${member.guild.name}`);
});
client.on("messageDelete",  function(message) {
if(!message.author.bot){
if(message.guild){
const channel = message.guild.channels.find('name', 'monitro');
if(!channel) {
return;
}
channel.send(`message by ${message.member.user.username} deleted in 
${message.channel.name}: ${message.content}`);
}}
});
client.on("messageUpdate",  (message, oldMessage, newMessage) =>  {
if(!message.author.bot){
if(message.guild){
const channel = message.guild.channels.find('name', 'monitro');
if(!channel) {
return;
}
channel.send(`message by ${message.author.username} a edité
${message.content} à ${oldMessage}`);
}}
});
 
 client.on('message', message => {
 
 
   if (message.content.startsWith(prefix + "logout")) {
 
     if(message.author.id === "165878519107289088"){
 
      message.reply("Arrêt en cour");
 
        console.log('/ Je suis désormais offline / ');
 
        client.destroy();
 
        process.exit()
 
    } else {
 
      message.channel.send("**Erreur** ! Tu n'es pas le Créateur")
 
    }
  }  
 
const fs = require("fs");
var msg = message;
 
let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
if (message.content.startsWith(prefix + "remafk")){
if (afk[msg.author.id]) {
delete afk[msg.author.id];
if (msg.member.nickname === null) {
msg.channel.send(" re, j'ai enlever votre afk ^^");
}else{
msg.channel.send(" re, j'ai enlever votre afk ^^");
}
fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
}else{
msg.channel.send("Erreur ! Tu es déjà afk");
}
}
 
 
if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
if (afk[msg.author.id]) {
return message.channel.send("Erreur ! Tu es déja afk -_-");
}else{
let args1 = msg.content.split(" ").slice(1);
if (args1.length === 0) {
afk[msg.author.id] = {"reason" : true};
msg.delete();
msg.channel.send(`tu es désormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
}else{
afk[msg.author.id] = {"reason" : args1.join(" ")};
msg.delete();
msg.channel.send(`tu es désormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
}
fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
}
}
    
    var mentionned = message.mentions.users.first();
if(msg.mentions.users.size > 0) {
if (afk[msg.mentions.users.first().id]) {
if (afk[msg.mentions.users.first().id].reason === true) {
message.channel.send(`@${mentionned.username} is AFK: pas de raison`);
}else{
message.channel.send(`@${mentionned.username} is AFK: ${afk[msg.mentions.users.first().id].reason}`);
}
}
}
 
if(message.content.startsWith(prefix + "test")){
 
(async function() {
 
 const mainMessage = await message.channel.send("Test des réactions:\n **Page.1**");
 
await mainMessage.react("◀");
await mainMessage.react("▶");
await mainMessage.react("🛑");
 
const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
 
panier.on('collect', async(reaction) => 
{
 if (reaction.emoji.name === "◀") {
 
mainMessage.edit("Test des réactions:\n **Page.1**");
 
 }
if (reaction.emoji.name === "▶") {
 
mainMessage.edit("Test des réactions:\n **Page.2**");
 
}
if (reaction.emoji.name === "🛑") {
 
mainMessage.delete()
 
 }
 
 await reaction.remove(message.author.id);
 
});
 }());
}
if(message.content.startsWith(prefix + "reminder")){
if(message.channel.type === "dm") return;
 
if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")){return message.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
 
}else{
 
let args = message.content.split(' ');
let time = args[1];
let timeofreminder = message.content.slice(2, args.length);
 
function reminder (remind, toRemind) {
 
if(!time){
message.channel.send("**:x: Erreur format, Correcte usage: `"+ prefix + "reminder <time en secondes !> <votre reminder>`**");
}else{
if(message.content.includes("reminder .")){
 
setInterval(function() {
 
message.channel.send();
}, (time * 1000));
message.channel.send("** J'ai enlevé votre reminder avec succès :wink:**");
}else{
 
setInterval(function() {
 
message.channel.send(message.content.slice(message.content.indexOf(message.content.split(" ")[2])));
}, (time * 1000));
 
message.channel.send("** J'ai ajouter votre reminder avec succès ! Tapez `" + prefix + "reminder .` pour l'enlever :wink:**");
}
}
}
reminder(time, timeofreminder);
}
}
 
if(msg.content.startsWith(prefix + 'ban')){
if(msg.channel.type === 'dm') return;
if(!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
}
if(msg.mentions.users.size === 0){
return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez ban**")
}
if(!msg.guild.member(client.user).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Je n'ai pas la permission `ADMINISTRATOR` pour ban cet utilisateur**").catch(console.error);
}
let banMember = msg.guild.member(msg.mentions.users.first());
if(!banMember){
return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
}
banMember.ban().then(member => {
msg.channel.send(`**${member.user.username}** est allez au paradis :wave: `);
})
}
if (message.content.startsWith(prefix + "mute")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
}
let muteMember = message.guild.member(message.mentions.users.first());
if(!muteMember) {
  return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
}
if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD")) {
  return message.reply("*:x: Je n'ai pas la permission pour mute...**").catch(console.error);
}
message.channel.overwritePermissions(muteMember, { SEND_MESSAGES: false }).then(member => {
    message.channel.send(`**${muteMember.user.username}** est désormais mute dans **#${message.channel.name}** :mute:`)
})
}
if (message.content.startsWith(prefix + "unmute")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**").catch(console.error);
if(message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
}
let unmuteMember = message.guild.member(message.mentions.users.first());
if(!unmuteMember) {
  return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
}
if(!message.guild.member(client.user).hasPermission("MANAGE_GUILD")) {
  return message.reply("*:x: Je n'ai pas la permission pour unmute...**").catch(console.error);
}
message.channel.overwritePermissions(unmuteMember, { SEND_MESSAGES: true }).then(member => {
    message.channel.send(`**${unmuteMember.user.username}** est désormais unmute dans **#${message.channel.name}** :loud_sound:`)
})
}
if (message.content.startsWith(prefix + 'embed')) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**").catch(console.error);
    let args = message.content.split(" ").slice(1).join(" ");
    if(!args) return message.channel.send("Vous voulez rien me faire répéter ?");
    message.delete()
    var embed = new Discord.RichEmbed();
    embed.setColor(0xFF358B)
      .setDescription(args)
    message.channel.sendEmbed(
      embed, {
        disableEveryone: true
      }
    );
  }
if (message.content.startsWith(prefix + "addrole")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**");
if(message.mentions.users.size === 0) {
  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");
}
let addmember = message.guild.member(message.mentions.users.first());
if(!addmember) return message.channel.send("**:x: Je ne suis pas sur que cet utilisateur existe...**");
let args = message.content.split(" ").slice(1);
                      var amount = message.content.slice(message.content.indexOf(message.content.split(" ")[2]))
let userRoleID = message.guild.roles.find("name", `${amount}`);
if(!message.guild.roles.exists("name", `${amount}`)) {
        message.channel.send(":x: Le role **"+amount+"** n'a pas été trouvé");
      }else{
 
            addmember.addRole(userRoleID).catch(error => console.log(error));
  message.channel.send(`**${addmember}** à désormais le role **${amount} :smile:**`)
}
}
if (message.content.startsWith(prefix + "purge")) {
if (message.channel.type === "dm") return;
if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `manage-guild` dans ce serveur**").catch(console.error);
 
const user = message.mentions.users.first();
 const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('**:x: Veuillez spécifier une limite de message**');
if (!amount && !user)
return message.reply('**:x: Veuillez spécifier une limite de message**');
if (!user){
if(isNaN(message.content.split(' ')[1]) || parseInt(message.content.split(' ')[1]) < 2 || parseInt(message.content.split(' ')[1]) > 100){
message.channel.send('**:x: Veuillez spécifier une limite de message comprise entre 2 et 100**')
}
}
if(message.content.split(' ')[2]){
if(isNaN(message.content.split(' ')[2]) || parseInt(message.content.split(' ')[2]) < 2 || parseInt(message.content.split(' ')[2]) > 100){
message.channel.send('**:x: Veuillez spécifier une limite de message comprise entre 2 et 100**')
}
}
 message.channel.fetchMessages({ limit: amount, }).then((messages) => {
 if (user) {
const filterBy = user ? user.id : Client.user.id;
messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
 
message.channel.send(":wastebasket: | `" + amount + "` messages supprimés");
 
});
}
});
 
client.login(process.env.TOKEN)
 