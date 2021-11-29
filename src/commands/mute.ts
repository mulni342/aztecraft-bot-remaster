/* eslint-disable @typescript-eslint/no-var-requires */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'mute',
    run: (message, client, args) =>
    {
        const usuario = message.mentions.members?.first() || message.guild?.members.resolve(args[0]);
        const razon = args[1] ? args.slice(1).join(' ') : 'No definido.';
        const role = message.guild?.roles.cache.find(x => x.name === 'Silenciado');
        const server = message.guild;

        const config = require('../../config.json');
        const logs_channel = config.channels.logs || message.channelId;

        if (!message.member?.permissions.has('KICK_MEMBERS')) return message.channel.send('❎ **| No tienes los permisos suficientes para ejecutar este comando.**');

        if (!message.member?.permissions.has('MANAGE_MESSAGES')) return message.channel.send('❎ **| No tienes los permisos suficientes para ejecutar este comando.**');

        if (!message.guild?.me?.permissions.has('MANAGE_ROLES')) return message.channel.send('❎ **| Necesito el permiso de gestionar roles.**');

        if (!usuario) return message.channel.send('❎ **| No has mencionado a ningún usuario.**');

        if (usuario.id === message.author.id) return message.channel.send('❎ ** | No puedes silenciarte a ti mismo.**');

        if (usuario.id === client.user?.id) return message.channel.send('❎ **| No puedes silenciarme.**');

        if (message.guild?.ownerId !== message.author.id && usuario.roles.highest.comparePositionTo(message.member?.roles.highest) >= 0) return message.channel.send('❎ **| No puedes silenciar a este usuario.**');

        if (role && role.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('❎ **| No puedo dar el rol de silencio.**');

        if (role && usuario.roles.cache.has(role.id)) return message.channel.send('❎ **| Este usuario ya fue silenciado.**');

        if (razon.length > 1024) return message.channel.send('❎ **| La razón no puede exceder de los 1024 caracteres.**');

        if (!role)
        {

            message.guild.roles.create({
                name: 'Silenciado',
                color: '#6c6a6a',
                reason: 'Rol silenciador'
            }).then(role =>
            {
                message.guild?.channels.cache.forEach(r =>
                {
                    if (r.type == 'GUILD_TEXT')
                    {
                        r.permissionOverwrites.create(role, {
                            'SEND_MESSAGES': false
                        });
                    }
                });
                usuario?.roles.add(role.id);
            });

        } else
        {
            usuario.roles.add(role.id);

        }

        const embed = new Discord.MessageEmbed()

            .setTitle('Usuario silenciado.')
            .addField('Usuario:', `<@${usuario.id}>`)
            .addField('Moderador responsable:', `${message.author}`)
            .addField('Razón', razon)
            .setColor('RANDOM');

        message.channel.send({
            'embeds': [embed]
        });

        const serverIconURL = server?.iconURL();

        if (!server || !serverIconURL) return;




        const embedmd = new Discord.MessageEmbed()

            .setThumbnail(serverIconURL)
            .setAuthor(server.name, serverIconURL)
            .setDescription(`Te encuentras silenciado/a en el servidor: **${server}**`)
            .addField('Moderador responsable:', `<@${message.author.id}>`)
            .addField('Razón de ser silenciado/a:', razon)
            .setColor('RANDOM');

        usuario.send({ 'embeds': [embedmd] }).catch(e => e);

        const gafo = new Discord.MessageEmbed()
            .setTitle(`${message.author} has silenciado a ${usuario}`)
            .addField('Razón de ser silenciado/a', razon)
            .setColor('RED')
            .setTimestamp()
            .setFooter('Sistema de registros | PecaBot');

        const canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText()) return;

        canal.send({ 'embeds': [gafo] });

    }
};

export = command;
