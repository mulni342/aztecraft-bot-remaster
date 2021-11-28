/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from '../types';
import * as path from 'path';
import * as fs from 'fs';

const command: Command = {
    name: 'channel',
    run: (message, client, args) =>
    {

        if (!message.member?.permissions.has('MANAGE_CHANNELS'))
        {
            return message.channel.send('❎ |**¡No tienes permisos suficientes para usar este comando!**');
        }   

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require(path.join(process.cwd(), 'config.json'));

        if (!args[0])
        {
            return message.channel.send('❎ |**Define el tipo de canal. \n¡Tipos de canales: `sugerencias, registros, ventas y confesiones`!**');
        }

        const types: any = {
            'sugerencias': 'suggestions',
            'registros': 'logs', 
            'ventas': 'sells',
            'confesiones': 'confessions'
        };

        if (!types[args[0]])
        {
            return message.channel.send('❎ |**El tipo de canal definido no es valido.**');
        }

        config['channels'][types[args[0]]] = message.channelId;

        message.channel.send(`<#${message.channelId}> es el nuevo canal de ${args[0]}`);

        fs.writeFileSync(path.join(process.cwd(), 'config.json'), JSON.stringify(config, null, 4));
    }
};

export = command;
