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
/* eslint-disable @typescript-eslint/no-var-requires */
const Discord = __importStar(require("discord.js"));
const command = {
    name: 'help',
    run: (message, client, args) => {
        var _a;
        const avatarURL = (_a = client.user) === null || _a === void 0 ? void 0 : _a.displayAvatarURL();
        const config = require('../../config.json');
        const community_basic = config.basic_infos.community;
        const logo_basic = config.basic_infos.logo;
        if (!avatarURL)
            return;
        const embed = new Discord.MessageEmbed()
            .setAuthor('¡Comandos de PecaBot!', avatarURL)
            .setThumbnail(logo_basic)
            .setDescription(`¡Hola! ${message.author}, soy el bot oficial del servidor ${community_basic} acá abajo te aparecerá una lista detallada de mis comandos, espero y te sean de mucha ayuda!.. 💫`)
            .addField('Comandos Utiles', '**` ip | redes | report | sugerencia | sell | gstart | gend | anuncio`**')
            .addField('Comandos de moderación', '**` prefijo | canal | Ban | kick | mute | unmute | purge`**')
            .addField('Comandos de Entretenimiento', '**`love | say | embed | confesion`**')
            .setColor('RED');
        message.channel.send({
            'embeds': [embed]
        });
    }
};
module.exports = command;
