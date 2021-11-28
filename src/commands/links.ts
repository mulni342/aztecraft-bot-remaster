import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'redes',
    run: (message, client, args) =>
    {

<<<<<<< HEAD
        const avatarURL = client.user?.displayAvatarURL();
        const config = require('../../config.json');
        const community_basic = config.basic_infos.community || message.basic;
        const logo_basic = config.basic_infos.logo || message.basic;
        const youtube_basic = config.basic_infos.youtube || message.basic;
        const shop_basic = config.basic_infos.youtube || message.basic;
        const invitation_basic = config.basic_infos.invitation || message.basic;
=======
        let avatarURL = client.user?.displayAvatarURL();
        let config = require("../../config.json");
        let community_basic = config.basic_infos.community;
        let logo_basic = config.basic_infos.logo;
        let youtube_basic = config.basic_infos.youtube;
        let shop_basic = config.basic_infos.shop;
        let invitation_basic = config.basic_infos.invitation;
>>>>>>> d4bce7c73ae293ce5f6a30d387df4d81e757762d

        if (!avatarURL) return;

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Enlaces de redes sociales de ${community_basic}`, avatarURL)
            .setThumbnail(logo_basic)
            .setDescription(`• ${message.author} Acá te estaré mostrando las redes sociales de ${community_basic}:`)
            .addField('• Youtube:', ` [Próximamente](${youtube_basic})`)
            .addField('• Tienda oficial de la network:',`[Próximamente](${shop_basic})`)
            .addField('• Link de invitación a nuestro Discord Oficial:', `[Click Aquí](${invitation_basic})`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(community_basic);

        message.channel.send({
            'embeds': [embed]
        });
    }
};

export = command;
