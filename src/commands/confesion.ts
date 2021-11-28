import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'confesion',
    run: (message, client, args) =>
    {
        const texto = args.slice(0).join(' ');
        if (!texto) return message.channel.send('❎ **| Debes enviar un mensaje.**');

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require('../../config.json');
        const confessions_channel = config.channels.confessions || message.channelId;
        
        const embed = new Discord.MessageEmbed()
            .setTitle(' 💬 **Nueva confesión**')
            .setDescription(texto)
            .setColor('RANDOM')
            .setFooter('Atentamente: Un desconocido.');


        const Canal = client.channels.cache.find(channel => channel.id === (confessions_channel));
        if (!Canal || !Canal.isText()) return;

        Canal.send({ embeds: [embed] });

        message.delete();
    }
};

export = command;
