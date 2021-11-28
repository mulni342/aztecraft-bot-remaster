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
    name: 'redes',
    run: (message, client, args) => {
        var _a;
        let avatarURL = (_a = client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL();
        if (!avatarURL)
            return;
        let embed = new Discord.MessageEmbed()
            .setAuthor(`Redes Sociales de Demoncrafters`, avatarURL)
            .setThumbnail("https://cdn.discordapp.com/icons/693643999503974580/5dbdfc585724250c5b33eeec3cfa03e0.webp")
            .setDescription(`<a:hola:739628295896694855> ${message.author} Acá te estaré mostrando las redes sociales de Demoncrafters...`)
            .addField("<:youtube:751592581565251715> Youtube", " [Click aqui](https://www.youtube.com/channel/UCp57qm-utse3sU6cKqgBq-Q)")
            .addField("<a:asd:745002035933609997> Tienda oficial del servidor", "[Click aqui]( https://tienda.demoncrafters.com/)")
            .addField("<a:discord2:735673709662306424> Link de invitación a nuestro Discord Oficial", "https://discord.gg/RNUcTwwupV")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Demoncrafters");
        message.channel.send({
            'embeds': [embed]
        });
    }
};
module.exports = command;
