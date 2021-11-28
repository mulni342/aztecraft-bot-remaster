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
const command = {
    name: 'unmute',
    run: (message, client, args) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const usuario = ((_b = (_a = message.mentions) === null || _a === void 0 ? void 0 : _a.members) === null || _b === void 0 ? void 0 : _b.first()) || ((_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.resolve(args[0]));
        const role = (_d = message.guild) === null || _d === void 0 ? void 0 : _d.roles.cache.find(x => x.name === 'Silenciado');
        const server = message.guild;
        const config = require('../../config.json');
        const logs_channel = config.channels.logs || message.channelId;
        if (!((_e = message.member) === null || _e === void 0 ? void 0 : _e.permissions.has('MANAGE_MESSAGES')))
            return message.channel.send('❎ **| No tienes los permisos suficientes para ejecutar este comando.**');
        if (!((_g = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.me) === null || _g === void 0 ? void 0 : _g.permissions.has('MANAGE_ROLES')))
            return message.channel.send('❎ **| Necesito el permiso de gestionar roles.**');
        if (!usuario)
            return message.channel.send('❎ **| No has mencionado a ningún usuario.**');
        if (!message.guild.roles.cache.find(x => x.name === 'Silenciado'))
            return message.channel.send('❎ **| No puedes quitar el rol silenciador a un usuario que no lo tiene.** ');
        if (message.guild.roles.cache.find(x => x.name === 'Silenciado')) {
            if (!role)
                return;
            usuario.roles.remove(role.id);
        }
        const embed = new Discord.MessageEmbed()
            .setDescription(`¡El usuario ${usuario}, ya no se encuentra silenciado!`)
            .addField(' ID del usuario:', `**${usuario.id}**`)
            .addField('Moderador Responsable:', `**${message.author}**`)
            .setColor('GREEN');
        message.channel.send({ embeds: [embed] });
        const embedmd = new Discord.MessageEmbed()
            .setDescription(`${usuario}, ya no te encuentras silenciado en **${server}.**`)
            .setColor('GREEN');
        usuario.send({ embeds: [embedmd] });
        const gafox = new Discord.MessageEmbed()
            .setTitle(`${message.author} Ha quitado el rol silenciador a ${usuario}`)
            .addField('ID del moderador responsable:', message.author.id)
            .addField('ID del usuario:', usuario.id)
            .setColor('GREEN')
            .setTimestamp()
            .setFooter('Sistema de registros | PecaBot');
        const canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText())
            return;
        canal.send({ embeds: [gafox] });
    }
};
module.exports = command;
