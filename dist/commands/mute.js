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
    name: 'mute',
    run: (message, client, args) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const usuario = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.resolve(args[0]));
        const razon = args[1] ? args.slice(1).join(' ') : 'No definido.';
        const role = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.roles.cache.find(x => x.name === 'Silenciado');
        const server = message.guild;
        const config = require('../../config.json');
        const logs_channel = config.channels.logs || message.channelId;
        if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.permissions.has('KICK_MEMBERS')))
            return message.channel.send('❎ **| No tienes los permisos suficientes para ejecutar este comando.**');
        if (!((_e = message.member) === null || _e === void 0 ? void 0 : _e.permissions.has('MANAGE_MESSAGES')))
            return message.channel.send('❎ **| No tienes los permisos suficientes para ejecutar este comando.**');
        if (!((_g = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.me) === null || _g === void 0 ? void 0 : _g.permissions.has('MANAGE_ROLES')))
            return message.channel.send('❎ **| Necesito el permiso de gestionar roles.**');
        if (!usuario)
            return message.channel.send('❎ **| No has mencionado a ningún usuario.**');
        if (usuario.id === message.author.id)
            return message.channel.send('❎ ** | No puedes silenciarte a ti mismo.**');
        if (usuario.id === ((_h = client.user) === null || _h === void 0 ? void 0 : _h.id))
            return message.channel.send('❎ ** | No puedes silenciarme.**');
        if (((_j = message.guild) === null || _j === void 0 ? void 0 : _j.ownerId) !== message.author.id && usuario.roles.highest.comparePositionTo((_k = message.member) === null || _k === void 0 ? void 0 : _k.roles.highest) >= 0)
            return message.channel.send('❎ **| No puedes silenciar a este usuario.**');
        if (role && role.comparePositionTo(message.guild.me.roles.highest) >= 0)
            return message.channel.send('❎ ** | No puedo dar el rol de silencio.**');
        if (role && usuario.roles.cache.has(role.id))
            return message.channel.send('❎ **| Este usuario ya fue silenciado.**');
        if (razon.length > 1024)
            return message.channel.send('❎ ** | La razón no puede exceder de los 1024 caracteres.**');
        if (!role) {
            message.guild.roles.create({
                name: 'Silenciado',
                color: '#6c6a6a',
                reason: 'Rol silenciador'
            }).then(role => {
                var _a;
                (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.forEach(r => {
                    if (r.type == 'GUILD_TEXT') {
                        r.permissionOverwrites.create(role, {
                            'SEND_MESSAGES': false
                        });
                    }
                });
                usuario === null || usuario === void 0 ? void 0 : usuario.roles.add(role.id);
            });
        }
        else {
            usuario.roles.add(role.id);
        }
        const embed = new Discord.MessageEmbed()
            .setTitle('Usuario silenciado.')
            .addField('Usuario:', `<@${usuario.id}>`)
            .addField('Moderador responsable:', `${message.author}`)
            .addField('Razón', razon)
            .setColor('RANDOM');
        message.channel.send({
            'embeds': [embed]
        });
        const serverIconURL = server === null || server === void 0 ? void 0 : server.iconURL();
        if (!server || !serverIconURL)
            return;
        const embedmd = new Discord.MessageEmbed()
            .setThumbnail(serverIconURL)
            .setAuthor(server.name, serverIconURL)
            .setDescription(`Te encuentras silenciado/a en el servidor: **${server}**`)
            .addField('Moderador responsable:', `<@${message.author.id}>`)
            .addField('Razón de ser silenciado/a:', razon)
            .setColor('RANDOM');
        usuario.send({ 'embeds': [embedmd] }).catch(e => e);
        const gafo = new Discord.MessageEmbed()
            .setTitle(`${message.author} has silenciado a ${usuario}`)
            .addField('Razón de ser silenciado/a', razon)
            .setColor('RED')
            .setTimestamp()
            .setFooter('Sistema de registros | PecaBot');
        const canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText())
            return;
        canal.send({ 'embeds': [gafo] });
    }
};
module.exports = command;
