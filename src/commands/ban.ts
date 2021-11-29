/* eslint-disable @typescript-eslint/no-var-requires */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'ban',
    run: (message, client, args) =>
    {
        const server = message.guild;

        const config = require('../../config.json');
        const logs_channel = config.channels.logs || message.channelId;

        const permsBot = message.guild?.me?.permissions.has('BAN_MEMBERS');

        if (!permsBot) return message.channel.send('❎ **| No tengo permisos.**');

        const perms = message.member?.permissions.has('BAN_MEMBERS');

        if (!perms) return message.channel.send('❎ **| No posees permisos para ejecutar este comando.**');

        const user = message.mentions?.members?.first();
        if (!user) return message.channel.send('❎ **| ¡Debes mencionar a un usuario!**');

        if (user.id === message.author.id)
            return message.channel.send('❎ **| ¡No puedes prohibirte a ti mismo en el servidor!** ');

        if (message.member && user.roles.highest.comparePositionTo(message.member.roles?.highest) > 0)
        {
            return message.channel.send('❎ **| ¡El usuario que quieres prohibir en el servidor tiene un rol superior al tuyo!**');

        }

        let razon = args.slice(1).join(' ');
        if (!razon)
        {
            razon = 'No hay una razón definida.';
        }

        razon = razon + '';

        message.guild?.members.ban(user, { reason: razon }).catch(() => message.reply('❎ **| Se ha producido un error.**'));

        const serverIconURL = server?.iconURL();

        if (!server || !serverIconURL) return;

        const embed2 = new Discord.MessageEmbed()

            .setThumbnail(serverIconURL)
            .setAuthor(server.name, serverIconURL)
            .setDescription(`${user} Fuiste prohibido en el servidor: **${server.name}**`)
            .addField(' Moderador responsable:', message.author.tag)
            .addField('Razón de la prohibición:', razon);

        user.send({ embeds: [embed2] });

        const embed = new Discord.MessageEmbed()
            .setThumbnail(serverIconURL)
            .setDescription(`✅ ¡El usuario ${user} fue prohibido!`)
            .addField('Prohibido:', user.id, true)
            .setColor('RED')
            .addField('Moderador responsable:', message.author.tag)
            .addField('ID del moderador:', message.author.id, true)
            .addField('Razón de la prohibición:', razon);
        message.channel.send({ embeds: [embed] });

        const canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText()) return;

        canal.send({ embeds: [embed] });

    }
};

export = command;
