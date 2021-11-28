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
    name: "sell",
    run: (message, client, args) => {
        let config = require("../../config.json");
        let sells_channel = config.channels.sells || message.channelId;
        let logo_basic = config.basic_infos.logo || message.basic;
        let algo = args.slice(0).join(' ').split('|');
        if (!algo[0])
            return message.channel.send(`❎ **| Debes proporcionar tu nick del juego.**`);
        if (!algo[1])
            return message.channel.send(`❎ **| Debes proporcionar la modalidad donde venderás dicho objeto.**`);
        if (!algo[2])
            return message.channel.send(`❎ **| Debes proporcinar el nombre del objeto que venderás.**`);
        if (!algo[3])
            return message.channel.send(`❎ **| Debes propocionar el precio del objeto que venderás.**`);
        let entregado = new Discord.MessageEmbed()
            .setDescription(`✅ **|${message.author}, ¡Tu venta ha sido enviada con exito!**`)
            .setColor("GREEN");
        message.channel.send({
            'embeds': [entregado]
        });
        let embed = new Discord.MessageEmbed()
            .setThumbnail(logo_basic)
            .setTitle("Sistema de Ventas | PecaBot")
            .addField("• Vendedor:", algo[0])
            .addField("• Modalidad:", algo[1])
            .addField("• Objeto en venta:", algo[2])
            .addField("• Precio:", algo[3])
            .setFooter("Sistema de Ventas | PecaBot")
            .setColor("RED")
            .setTimestamp();
        var canal = client.channels.cache.find(channel => channel.id === (sells_channel));
        if (canal && canal.isText()) {
            canal.send({
                'embeds': [embed]
            });
        }
    }
};
module.exports = command;
