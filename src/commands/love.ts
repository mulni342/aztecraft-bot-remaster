/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'love',
    run: (message, client) =>
    {
        const asd1 = ['**10%**  [█. . . . . . . . . .] ', '**12%**  [█. . . . . . . . . .] ', '**13%**  [█. . . . . . . . . .] ', '**14%**  [█. . . . . . . . . .] ', '**15%**  [██ . . . . . . . . .] ', '**16%**  [██ . . . . . . . . .] ', '**17%**  [██ . . . . . . . . .] ', '**18%**  [██ . . . . . . . . .] ', '**19%**  [██ . . . . . . . . .] ', '**20%** [███  . . . . . . . .] ', '**21%** [███  . . . . . . . .]', '**22%** [███  . . . . . . . .]', '**23%** [███  . . . . . . . .]', '**24%** [█████  . . . . . . .]', '**25%** [█████  . . . . . . .]', '**27%** [█████  . . . . . . .]', '**30%** [████████  . . . . .]', '**33%** [████████  . . . . .]', '**35%** [████████  . . . . .]', '**38%** [████████████  . . .]', '**42%** [████████████  . . .]', '**44%** [████████████  . . .]', '**48%** [████████████  . . .]', '**52%** [███████████████  . .]', '**55%** [███████████████  . .]', '**58%** [█████████████████  .]', '**60%** [█████████████████  .]', '**65%** [█████████████████  .]', '**70%** [█████████████████  .]', '**75%** [█████████████████  .]', '**100%** [████████████████████]'];
        const porcentaje = asd1[Math.floor(Math.random() * asd1.length)];
        const asd = message.mentions.users.first();
        if (!asd) return message.channel.send('❎ **| Debes mencionar a un usuario.**');

        const cartel = new Discord.MessageEmbed()
            .addField(`💓 ¿Que porcentaje hay de que tengas una relación con **${asd.username}**?  `, `💘 ¡La probabilidad es de un ${porcentaje}!`)
            .setColor('RED');

        message.channel.send({ embeds: [cartel] });

    }
};

export = command;
