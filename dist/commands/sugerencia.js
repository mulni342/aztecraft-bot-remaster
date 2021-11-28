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
    name: 'sugerencia',
    run: (message, client, args) => {
        var _a;
        const texto = args.slice(0).join(' ');
        if (!texto)
            return message.channel.send('❎ **| ¡Debes escribir y enviar una sugerencia!** ');
        const config = require('../../config.json');
        const suggestions_channel = config.channels.suggestions || message.channelId;
        const embed2 = new Discord.MessageEmbed()
            .setDescription(`✅ **| ${message.author}, ¡Tu sugerencia fue enviada correctamente!**`)
            .setColor('GREEN');
        message.author.send({ 'embeds': [embed2] })
            .catch(r => { });
        const userAvatarURL = (_a = client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL();
        if (!userAvatarURL)
            return;
        const embed = new Discord.MessageEmbed()
            .setAuthor('Sistema de sugerencias | PecaBot')
            .setTitle('• **Nueva sugerencia** •')
            .addField('Sugerencia:', texto)
            .addField('Autor de la sugerencia:', `<@${message.author.id}>`)
            .setColor('RANDOM')
            .setFooter('Sistema de sugerencias | PecaBot')
            .setTimestamp();
        // client.channels.cache.get('735903826854543421').send({ 'embeds': [ embed ] }).then(m => { m.react('✅'), m.react('❌') })
        const channel = client.channels.cache.get(suggestions_channel);
        if (!channel || !channel.isText())
            return;
        channel.send({ 'embeds': [embed] })
            .then(m => {
            m.react('✅');
            m.react('❌');
        });
        message.delete();
    }
};
module.exports = command;
