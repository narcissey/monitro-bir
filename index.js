const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = "!";
 

 client.on("ready", () => {

var memberNumber = client.users.size;
var serverNumber = client.guilds.size;

 client.user.setGame(`prefix: ${prefix}` + " | Createur Narcisse", "https://bot.discord.io/monitro");

 client.user.setStatus("idle");

	console.log("--------------------------------------");

  console.log("MoNitro online\nNombre de serveurs: " + serverNumber + "\navec\n" + memberNumber + " utilisateurs");

});
client.on('message', message => {
if(message.content.startsWith("bonjour")){
message.channel.send(`Hey ca va **${message.author.username}** ?`)
}
if(message.content.startsWith("lol")){
message.channel.send(`Hmm pas marrant`)
}
if(message.content.startsWith("re")){
message.channel.send(`Hey **${message.author.username}** est revenue`)
}
if(message.content.startsWith("Monitro")){
message.channel.send(`Je sais que vous etes choquer mais moi je suis pas MoNitro mais MoNitro 2.0 je suis la version patcher de monitro il yavais un bug qui fesai bug tous les serveur ou il yavais monitro Narcisse a regler le bug 

Escusez moi`)
}
if(message.content.startsWith("bonjour")){
message.channel.send(`Hey ca va **${message.author.username}** ?`)
}
if(message.content.startsWith("GG")){
message.channel.send(`je te connais pas mais gg`)
}
if(message.content == '!help') {
    const embed = new Discord.RichEmbed()
      .setColor('#00AE86')
      .setAuthor("Commandes de MoNitro")
      .setTitle("__Voici les comande de MoNitro__:")
      .setThumbnail(message.author.avatarURL)
      .setDescription("**Voici les commandes** : \n" +
          " `!kick` : *le bot Kick un membre *\n" +
          "`!afk` : *Le bot te met afk*\n")
    message.author.sendMessage({embed});
}
});
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
channel.send(`${member.user.username} a quittÃ© 
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
channel.send(`message by ${message.author.username} a editÃ©
${message.content} Ã  ${oldMessage}`);
}}
});

 client.on('message', message => {


   if (message.content.startsWith(prefix + "logout")) {

     if(message.author.id === "165878519107289088"){

      message.reply("ArrÃªt en cour");

        console.log('/ Je suis dÃ©sormais offline / ');

        client.destroy();

        process.exit()

    } else {

      message.channel.send("**Erreur** ! Tu n'es pas l'owner")

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
msg.channel.send("Erreur ! Tu es dÃ©jÃ  afk");
}
}


if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
if (afk[msg.author.id]) {
return message.channel.send("Erreur ! Tu es dÃ©jÃ  afk -_-");
}else{
let args1 = msg.content.split(" ").slice(1);
if (args1.length === 0) {
afk[msg.author.id] = {"reason" : true};
msg.delete();
msg.channel.send(`tu es dÃ©sormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
}else{
afk[msg.author.id] = {"reason" : args1.join(" ")};
msg.delete();
msg.channel.send(`tu es dÃ©sormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
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

 const mainMessage = await message.channel.send("Test des rÃ©actions:\n **Page.1**");

await mainMessage.react("â—€");
await mainMessage.react("â–¶");
await mainMessage.react("ðŸ›‘");

const panier = mainMessage.createReactionCollector((reaction, user) => user.id === message.author.id);
 
panier.on('collect', async(reaction) => 
{
 if (reaction.emoji.name === "â—€") {

mainMessage.edit("Test des rÃ©actions:\n **Page.1**");

 }
if (reaction.emoji.name === "â–¶") {

mainMessage.edit("Test des rÃ©actions:\n **Page.2**");
 
}
if (reaction.emoji.name === "ðŸ›‘") {

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
message.channel.send("** J'ai enlevÃ© votre reminder avec succÃ¨s :wink:**");
}else{

setInterval(function() {

message.channel.send(message.content.slice(message.content.indexOf(message.content.split(" ")[2])));
}, (time * 1000));

message.channel.send("** J'ai ajouter votre reminder avec succÃ¨s ! Tapez `" + prefix + "reminder .` pour l'enlever :wink:**");
}
}
}
reminder(time, timeofreminder);
}
}

if(msg.content.startsWith(prefix + 'kick')){
if(msg.channel.type === 'dm') return;
if(!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
}
if(msg.mentions.users.size === 0){
return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez kick**")
}
if(!msg.guild.member(client.user).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Je n'ai pas la permission `ADMINISTRATOR` pour kick cet utilisateur**").catch(console.error);
}
let kickMember = msg.guild.member(msg.mentions.users.first());
if(!kickMember){
return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
}
kickMember.kick().then(member => {
msg.channel.send(`**${member.user.username}** a bien Ã©tÃ© kick**`);
})
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
msg.channel.send(`**${member.user.username}** a bien Ã©tÃ© ban**`);
})
}
if(msg.content.startsWith(prefix + 'mute')){
if(msg.channel.type === 'dm') return;
if(!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
}
if(msg.mentions.users.size === 0){
return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez mute**")
}
if(!msg.guild.member(client.user).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Je n'ai pas la permission `ADMINISTRATOR` pour mute cet utilisateur**").catch(console.error);
}
let muteMember = msg.guild.member(msg.mentions.users.first());
if(!muteMember){
return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
}
msg.channel.overwritePermissions(muteMember, {SEND_MESSAGES: false}).then(member => {
msg.channel.send(`**${member.user.username}** a bien Ã©tÃ© mute**`);
})
}
if(msg.content.startsWith(prefix + 'unmute')){
if(msg.channel.type === 'dm') return;
if(!msg.guild.member(msg.author).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Vous n'avez pas la permissions d'utiliser cette commande**").catch(console.error);
}
if(msg.mentions.users.size === 0){
return msg.reply("**:x: Veuillez mentionner l'utilisateur que vous voulez unmute**")
}
if(!msg.guild.member(client.user).hasPermission('ADMINISTRATOR')){
return msg.reply("**:x: Je n'ai pas la permission `ADMINISTRATOR` pour unmute cet utilisateur**").catch(console.error);
}
let unmuteMember = msg.guild.member(msg.mentions.users.first());
if(!unmuteMember){
return msg.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
}
msg.channel.overwritePermissions(unmuteMember, {SEND_MESSAGES: true}).then(member => {
msg.channel.send(`**${member.user.username}** a bien Ã©tÃ© unmute**`);
})                             
}
});

client.login(process.env.TOKEN)
	    
	

