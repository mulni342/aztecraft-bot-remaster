import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'redes',
    run: (message, client, args) =>
    {

        let avatarURL = client.user?.displayAvatarURL();
        let config = require("../../config.json");
        let community_basic = config.basic_infos.community || message.basic;
        let logo_basic = config.basic_infos.logo || message.basic;
        let youtube_basic = config.basic_infos.youtube || message.basic;
        let shop_basic = config.basic_infos.youtube || message.basic;
        let invitation_basic = config.basic_infos.invitation || message.basic;

        if (!avatarURL) return;

        let embed = new Discord.MessageEmbed()
            .setAuthor(`Enlaces de redes sociales de ${community_basic}`, avatarURL)
            .setThumbnail(logo_basic)
            .setDescription(`• ${message.author} Acá te estaré mostrando las redes sociales de ${community_basic}:`)
            .addField("• Youtube:", ` [Próximamente](${youtube_basic})`)
            .addField("• Tienda oficial de la network:",`[Próximamente](${shop_basic})`)
            .addField("• Link de invitación a nuestro Discord Oficial:", `[Click Aquí](${invitation_basic})`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter(community_basic)

        message.channel.send({
            'embeds': [embed]
        })
    }
}

export = command;
