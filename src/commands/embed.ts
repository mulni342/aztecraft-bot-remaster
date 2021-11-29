/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'embed',
    run: (message, client, args) =>
    {
        const algo = args.slice(0).join(' ').split('|');
        if (!algo[0]) return message.channel.send('❎ **| Debes proporcionar un titulo para tu embed** ');

        if (!algo[1]) return message.channel.send('❎ **| Debes proporcionar una descripción para tu embed** ');

        let color: any = '#ff0000';

        if (algo[2]) color = algo[2];

        const asd = new Discord.MessageEmbed()
            .setTitle(algo[0])
            .setDescription(algo[1])
            .setColor(color);

        message.channel.send({ embeds: [asd] });

        message.delete();
    }
};

export = command;
