/* eslint-disable @typescript-eslint/no-var-requires */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'links',
    run: (message, client) =>
    {

        const avatarURL = client.user?.displayAvatarURL();
        const config = require('../../config.json');
        const community_basic = config.basic_infos.community;
        const logo_basic = config.basic_infos.logo;
        const youtube_basic = config.basic_infos.youtube;
        const shop_basic = config.basic_infos.shop;
        const invitation_basic = config.basic_infos.invitation;

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
