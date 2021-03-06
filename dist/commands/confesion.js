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
    name: 'confesion',
    run: (message, client, args) => {
        const texto = args.slice(0).join(' ');
        if (!texto)
            return message.channel.send('❎ **| Debes enviar un mensaje.**');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require('../../config.json');
        const confessions_channel = config.channels.confessions || message.channelId;
        const embed = new Discord.MessageEmbed()
            .setTitle(' 💬 **Nueva confesión**')
            .setDescription(texto)
            .setColor('RANDOM')
            .setFooter('Atentamente: Un desconocido.');
        const Canal = client.channels.cache.find(channel => channel.id === (confessions_channel));
        if (!Canal || !Canal.isText())
            return;
        Canal.send({ embeds: [embed] });
        message.delete();
    }
};
module.exports = command;
