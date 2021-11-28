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
/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = __importStar(require("discord.js"));
const command = {
    name: 'report',
    run: (message, client, args) => {
        const server = message.guild;
        const config = require('../../config.json');
        const logs_channel = config.channels.logs || message.channelId;
        const user = message.mentions.users.first();
        if (!user)
            return message.channel.send(`❎ **| Debes mencionar a un usuario ejemplo: ${process.env.prefix}report @user#0000 <Razón>**.`).then(m => {
                setTimeout(() => { m.delete(); }, 5000);
            });
        if (user === message.author)
            return message.channel.send('❎ **| ¡No te puedes reportar a ti mismo!** ');
        const texto = args.slice(1).join(' ');
        if (!texto)
            return message.channel.send('❎ **| No has escrito un reporte.**').then(m => {
                setTimeout(() => { m.delete(); }, 10000);
            });
        if (texto.length > 1022)
            return message.channel.send('❎ **| La razón no puede exceder los 1022 caracteres.**');
        message.channel.send('✅ **|Tu reporte se le ha enviado al personal.**').then(m => {
            setTimeout(() => { m.delete(); }, 10000);
        });
        const serverIconURL = server === null || server === void 0 ? void 0 : server.iconURL();
        if (!serverIconURL)
            return;
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setTitle('⚠️ **Reporte de usuario.**')
            .setThumbnail(serverIconURL)
            .setDescription(`**${user}** ha sido reportado.`)
            .addField('Datos del reportado:', user.tag, true)
            .addField('Datos del reportero:', message.author.tag, true)
            .addField('Contenido del reporte:', texto)
            .setColor('RANDOM');
        const canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (canal && canal.isText()) {
            canal.send({ 'embeds': [embed] });
        }
        message.delete();
    }
};
module.exports = command;
