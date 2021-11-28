/* eslint-disable @typescript-eslint/no-var-requires */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'unmute',
    run: (message, client, args) =>
    {

        const usuario = message.mentions?.members?.first() || message.guild?.members.resolve(args[0]);
        const role = message.guild?.roles.cache.find(x => x.name === 'Silenciado');
        const server = message.guild;

        const config = require('../../config.json');
        const logs_channel = config.channels.logs || message.channelId;

        if (!message.member?.permissions.has('MANAGE_MESSAGES')) return message.channel.send('❎ **| No tienes los permisos suficientes para ejecutar este comando.**');

        if (!message.guild?.me?.permissions.has('MANAGE_ROLES')) return message.channel.send('❎ **| Necesito el permiso de gestionar roles.**');

        if (!usuario) return message.channel.send('❎ **| No has mencionado a ningún usuario.**');

        if (!message.guild.roles.cache.find(x => x.name === 'Silenciado')) return message.channel.send('❎ **| No puedes quitar el rol silenciador a un usuario que no lo tiene.** ');

        if (message.guild.roles.cache.find(x => x.name === 'Silenciado'))
        {
            if (!role) return;
            usuario.roles.remove(role.id);

        }

        const embed = new Discord.MessageEmbed()

            .setDescription(`¡El usuario ${usuario}, ya no se encuentra silenciado!`)
            .addField(' ID del usuario:', `**${usuario.id}**`)
            .addField('Moderador Responsable:', `**${message.author}**`)
            .setColor('GREEN');

        message.channel.send({ embeds: [ embed ] });

        const embedmd = new Discord.MessageEmbed()

            .setDescription(`${usuario}, ya no te encuentras silenciado en **${server}.**`)
            .setColor('GREEN');

        usuario.send({ embeds: [ embedmd ] });

        const gafox = new Discord.MessageEmbed()

            .setTitle(`${message.author} Ha quitado el rol silenciador a ${usuario}`)
            .addField('ID del moderador responsable:', message.author.id)
            .addField('ID del usuario:', usuario.id)
            .setColor('GREEN')
            .setTimestamp()
            .setFooter('Sistema de registros | PecaBot');

        const canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText()) return;

        canal.send({ embeds: [ gafox ] });
    }
};

export = command;
