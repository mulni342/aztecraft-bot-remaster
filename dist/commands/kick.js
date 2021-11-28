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
/* eslint-disable @typescript-eslint/no-empty-function */
const Discord = __importStar(require("discord.js"));
const command = {
    name: 'kick',
    run: (message, client, args) => {
        var _a, _b;
        const server = message.guild;
        const perms = (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('KICK_MEMBERS');
        if (!perms)
            return message.channel.send('❎ **| No tienes los permisos necesarios.**').then(m => {
                setTimeout(() => { m.delete(); }, 5000);
            });
        try {
            const user = message.mentions.users.first();
            if (!user)
                return message.channel.send('❎ **| Debes mencionar a un usuario.**').then(m => {
                    setTimeout(() => { m.delete(); }, 5000);
                });
            if (user === message.author)
                return message.channel.send('❎ **| ¡No te puedes expulsar a ti mismo!** ');
            const member = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.cache.find(m => m.id == (user === null || user === void 0 ? void 0 : user.id));
            if (!(member === null || member === void 0 ? void 0 : member.kickable))
                return message.reply('**Este usuario no puede ser expulsado.**').then(m => {
                    setTimeout(() => { m.delete(); }, 5000);
                });
            const razon = args.slice(1).join(' ');
            if (!razon)
                return message.channel.send('❎ **| Razón no descrita.**').then(m => {
                    setTimeout(() => { m.delete(); }, 5000);
                });
            member.kick(razon);
            const serverIconURL = server === null || server === void 0 ? void 0 : server.iconURL();
            if (!server || !serverIconURL)
                return;
            const embed2 = new Discord.MessageEmbed()
                .setThumbnail(serverIconURL)
                .setAuthor(server.name, serverIconURL)
                .setDescription(`${user} Has sido expulsado del servidor. **${server.name}**`)
                .addField('Moderador responsable:', message.author.tag)
                .addField('Razón de la expulsión:', razon);
            user.send({ embeds: [embed2] })
                .catch(() => { });
            const embed = new Discord.MessageEmbed()
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`El usuario ${user} ¡ha sido expulsado con exito!`)
                .addField('Nombre del usuario expulsado:', user.tag)
                .addField('ID del usuario expulsado:', user.id, true)
                .setColor('RANDOM')
                .addField('Moderador responsable:', message.author.tag) //asd
                .addField('ID del moderador:', message.author.id, true)
                .addField('Razón de la expulsión:', razon);
            message.channel.send({ embeds: [embed] });
        }
        catch (er) {
            message.channel.send(`**Hubo un error, porfavor si el error continua comuniquelo a nuestro servidor personal.\n\nError:** ||\`${er}\`||`);
        }
    }
};
module.exports = command;
