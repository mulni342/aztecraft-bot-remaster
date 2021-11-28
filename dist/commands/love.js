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
/* eslint-disable @typescript-eslint/no-unused-vars */
const Discord = __importStar(require("discord.js"));
const command = {
    name: 'love',
    run: (message, client) => {
        const asd1 = ['**10%**  [█. . . . . . . . . .] ', '**12%**  [█. . . . . . . . . .] ', '**13%**  [█. . . . . . . . . .] ', '**14%**  [█. . . . . . . . . .] ', '**15%**  [██ . . . . . . . . .] ', '**16%**  [██ . . . . . . . . .] ', '**17%**  [██ . . . . . . . . .] ', '**18%**  [██ . . . . . . . . .] ', '**19%**  [██ . . . . . . . . .] ', '**20%** [███  . . . . . . . .] ', '**21%** [███  . . . . . . . .]', '**22%** [███  . . . . . . . .]', '**23%** [███  . . . . . . . .]', '**24%** [█████  . . . . . . .]', '**25%** [█████  . . . . . . .]', '**27%** [█████  . . . . . . .]', '**30%** [████████  . . . . .]', '**33%** [████████  . . . . .]', '**35%** [████████  . . . . .]', '**38%** [████████████  . . .]', '**42%** [████████████  . . .]', '**44%** [████████████  . . .]', '**48%** [████████████  . . .]', '**52%** [███████████████  . .]', '**55%** [███████████████  . .]', '**58%** [█████████████████  .]', '**60%** [█████████████████  .]', '**65%** [█████████████████  .]', '**70%** [█████████████████  .]', '**75%** [█████████████████  .]', '**100%** [████████████████████]'];
        const porcentaje = asd1[Math.floor(Math.random() * asd1.length)];
        const asd = message.mentions.users.first();
        if (!asd)
            return message.channel.send('❎ **| Debes mencionar a un usuario.**');
        const cartel = new Discord.MessageEmbed()
            .addField(`💓 ¿Que porcentaje hay de que tengas una relación con **${asd.username}**?  `, `💘 ¡La probabilidad es de un ${porcentaje}!`)
            .setColor('RED');
        message.channel.send({ embeds: [cartel] });
    }
};
module.exports = command;
