/* eslint-disable @typescript-eslint/no-var-requires */
import { Command } from '../types';
import * as Discord from 'discord.js';

const command: Command = {
    name: 'sell',
    run: (message, client, args) =>
    {

        const config = require('../../config.json');
        const sells_channel = config.channels.sells || message.channelId;
        const logo_basic = config.basic_infos.logo;

        const algo = args.slice(0).join(' ').split('|');
        if (!algo[0]) return message.channel.send('❎ **| Debes proporcionar tu nick del juego.**');

        if (!algo[1]) return message.channel.send('❎ **| Debes proporcionar la modalidad donde venderás dicho objeto.**');

        if (!algo[2]) return message.channel.send('❎ **| Debes proporcinar el nombre del objeto que venderás.**');

        if (!algo[3]) return message.channel.send('❎ **| Debes propocionar el precio del objeto que venderás.**');

        const entregado = new Discord.MessageEmbed()

            .setDescription(`✅ **|${message.author}, ¡Tu venta ha sido enviada con exito!**`)
            .setColor('GREEN');

        message.channel.send({
            'embeds': [entregado]
        });

        const embed = new Discord.MessageEmbed()
        
            .setThumbnail(logo_basic)
            .setTitle('Sistema de Ventas | PecaBot')
            .addField('• Vendedor:', algo[0])
            .addField('• Modalidad:', algo[1])
            .addField('• Objeto en venta:', algo[2])
            .addField('• Precio:', algo[3])
            .setFooter('Sistema de Ventas | PecaBot')
            .setColor('RED')
            .setTimestamp();

        const canal = client.channels.cache.find(channel => channel.id === (sells_channel));
        if (canal && canal.isText())
        {
            canal.send({
                'embeds': [embed]
            });
        }
    }
};

export = command;
