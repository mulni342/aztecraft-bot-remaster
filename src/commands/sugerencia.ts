import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'sugerencia',
    run: (message, client, args) =>
    {
        const texto = args.slice(0).join(' ');
        if (!texto) return message.channel.send('❎ **| ¡Debes escribir y enviar una sugerencia!** ');

        const config = require('../../config.json');
        const suggestions_channel = config.channels.suggestions || message.channelId;


        const embed2 = new Discord.MessageEmbed()

            .setDescription(`✅ **| ${message.author}, ¡Tu sugerencia fue enviada correctamente!**`)
            .setColor('GREEN');


        message.author.send({ 'embeds': [embed2] })
            .catch(r => { });

        const userAvatarURL = client.user?.displayAvatarURL();

        if (!userAvatarURL) return;

        const embed = new Discord.MessageEmbed()

            .setAuthor('Sistema de sugerencias | PecaBot',)
            .setTitle('• **Nueva sugerencia** •')
            .addField('Sugerencia:', texto)
            .addField('Autor de la sugerencia:', `<@${message.author.id}>`)
            .setColor('RANDOM')
            .setFooter('Sistema de sugerencias | PecaBot')
            .setTimestamp();

        // client.channels.cache.get('735903826854543421').send({ 'embeds': [ embed ] }).then(m => { m.react('✅'), m.react('❌') })

        const channel = client.channels.cache.get(suggestions_channel);

        if (!channel || !channel.isText()) return;

        channel.send({ 'embeds': [embed] })
            .then(m =>
            {
                m.react('✅');
                m.react('❌');
            });


        message.delete();

    }
};

export = command;
