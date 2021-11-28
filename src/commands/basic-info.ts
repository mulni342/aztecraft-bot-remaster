import * as Discord from 'discord.js';
import { Command } from '../types';
import * as path from 'path';
import * as fs from 'fs';

const command: Command = {
    name: 'basic-info',
    run: (message, client, args) =>
    {

        if (!message.member?.permissions.has('ADMINISTRATOR'))
        {
            return message.channel.send('❎ |**¡No tienes permisos suficientes para usar este comando!**');
        }   

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require(path.join(process.cwd(), 'config.json'));

        if (!args[0])
        {
            return message.channel.send('❎ |**Define el tipo de datos. \n¡Tipos de datos: `comunidad, invitacion, logo, youtube y tienda`!**');
        }

        const types: any = {
            'comunidad': 'community',
            'invitacion': 'invitation', 
            'logo': 'logo',
            'youtube': 'youtube',
            'tienda': 'shop'
        };

        if (!types[args[0]])
        {
            return message.channel.send('❎ |**El tipo de dato definido no es valido.**');
        }
        
        let info_basic: any;

<<<<<<< HEAD
        config['basic_infos'][types[args[0]]] = (message as any).basic;
=======
        config['basic_infos'][types[args[0]]] = info_basic;
>>>>>>> d4bce7c73ae293ce5f6a30d387df4d81e757762d

        message.channel.send(`<#${info_basic}> es el nuevo dato de ${args[0]}`);

        fs.writeFileSync(path.join(process.cwd(), 'config.json'), JSON.stringify(config, null, 4));
    }
};

export = command;
