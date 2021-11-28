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
    name: 'embed',
    run: (message, client, args) => {
        let algo = args.slice(0).join(' ').split('|');
        if (!algo[0])
            return message.channel.send(`❎ **| Debes proporcionar un titulo para tu embed** `);
        if (!algo[1])
            return message.channel.send(`<❎ **| Debes proporcionar una descripción para tu embed** `);
        let color = "#ff0000";
        if (algo[2])
            color = algo[2];
        let asd = new Discord.MessageEmbed()
            .setTitle(algo[0])
            .setDescription(algo[1])
            .setColor(color);
        message.channel.send({ embeds: [asd] });
        message.delete();
    }
};
module.exports = command;
