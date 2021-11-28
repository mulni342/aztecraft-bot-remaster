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
        let config = require("../../config.json");
        let community_basic = config.basic_infos.community || message.basic;
        let logo_basic = config.basic_infos.logo || message.basic;
        let youtube_basic = config.basic_infos.youtube || message.basic;
        let shop_basic = config.basic_infos.youtube || message.basic;
        let invitation_basic = config.basic_infos.invitation || message.basic;
        if (!avatarURL)
            return;
        let embed = new Discord.MessageEmbed()
            .setAuthor(`Enlaces de redes sociales de ${community_basic}`, avatarURL)
            .setThumbnail(logo_basic)
            .setDescription(`• ${message.author} Acá te estaré mostrando las redes sociales de ${community_basic}:`)
            .addField("• Youtube:", ` [Próximamente](${youtube_basic})`)
            .addField("• Tienda oficial de la network:", `[Próximamente](${shop_basic})`)
            .addField("• Link de invitación a nuestro Discord Oficial:", `[Click Aquí](${invitation_basic})`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(community_basic);
        message.channel.send({
            'embeds': [embed]
        });
    }
};
module.exports = command;
