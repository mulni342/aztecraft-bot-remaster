"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const Discord = __importStar(require("discord.js"));
let command = {
    name: 'ban',
    run: (message, client, args) => {
        var _a, _b, _c, _d, _e, _f, _g;
        var server = message.guild;
        let config = require("../../config.json");
        let logs_channel = config.channels.logs || message.channelId;
        let permsBot = (_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has("BAN_MEMBERS");
        if (!permsBot)
            return message.channel.send("❎ **| No tengo permisos.**");
        let perms = (_c = message.member) === null || _c === void 0 ? void 0 : _c.permissions.has("BAN_MEMBERS");
        if (!perms)
            return message.channel.send("❎ **| No posees permisos para ejecutar este comando.**");
        let user = (_e = (_d = message.mentions) === null || _d === void 0 ? void 0 : _d.members) === null || _e === void 0 ? void 0 : _e.first();
        if (!user)
            return message.channel.send('❎ **| ¡Debes mencionar a un usuario!**');
        if (user.id === message.author.id)
            return message.channel.send("❎ **| ¡No puedes prohibirte a ti mismo en el servidor!** ");
        if (message.member && user.roles.highest.comparePositionTo((_f = message.member.roles) === null || _f === void 0 ? void 0 : _f.highest) > 0) {
            return message.channel.send("❎ **| ¡El usuario que quieres prohibir en el servidor tiene un rol superior al tuyo!**");
        }
        var razon = args.slice(1).join(' ');
        if (!razon) {
            razon = `No hay una razón definida.`;
        }
        razon = razon + ``;
        (_g = message.guild) === null || _g === void 0 ? void 0 : _g.members.ban(user, { reason: razon }).catch(e => message.reply("❎ **| Se ha producido un error.**"));
        let serverIconURL = server === null || server === void 0 ? void 0 : server.iconURL();
        if (!server || !serverIconURL)
            return;
        let embed2 = new Discord.MessageEmbed()
            .setThumbnail(serverIconURL)
            .setAuthor(server.name, serverIconURL)
            .setDescription(`${user} Fuiste prohibido en el servidor: **${server.name}**`)
            .addField(` Moderador responsable:`, message.author.tag)
            .addField(`Razón de la prohibición:`, razon);
        user.send({ embeds: [embed2] });
        let embed = new Discord.MessageEmbed()
            .setThumbnail(serverIconURL)
            .setDescription(`✅ ¡El usuario ${user} fue prohibido!...`)
            .addField(`Prohibido:`, user.id, true)
            .setColor("RED")
            .addField(`Moderador responsable:`, message.author.tag)
            .addField(`ID del moderador:`, message.author.id, true)
            .addField(`Razón de la prohibición:`, razon);
        message.channel.send({ embeds: [embed] });
        var canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText())
            return;
        canal.send({ embeds: [embed] });
    }
};
module.exports = command;