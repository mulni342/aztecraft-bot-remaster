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
let event = {
    name: "guildMemberAdd",
    run: (client, miembro) => {
        let embed = new Discord.MessageEmbed()
            .setTitle(":zap:Bienvenido a DemonCrafters:zap:")
            .setDescription("Bienvenido <@" + miembro.id + "> a DemonCrafters\n\n 🎉Disfruta del servidor con todos🎉\n\n Recuerda pasarte por los canales de información para evitar tener algún problema y estar informado de todo.\n\n :beginner:**Redes Sociales**:beginner:\n :trident:Ip: play.demoncrafters.com \n :maple_leaf:YouTube: [Click aqui]( https://www.youtube.com/channel/UCp57qm-utse3sU6cKqgBq-Q) \n :moneybag:Tienda: [Click aqui]( https://tienda.demoncrafters.com/")
            .setImage("https://cdn.discordapp.com/attachments/749083973065506937/749144207712714843/1080.png")
            .setColor("YELLOW")
            .setTimestamp()
            .setFooter("Bienvenidas de DemonCrafters | ");
        var Canal = client.channels.cache.find(channel => channel.id === ("854499272715534357"));
        if (Canal) {
            if (Canal.isText()) {
                Canal.send({ embeds: [embed] });
            }
        }
    }
};
module.exports = event;
