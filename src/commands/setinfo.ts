/* eslint-disable @typescript-eslint/no-explicit-any*/
/*import { Command } from '../types';
import * as path from 'path';
import * as fs from 'fs';

const command: Command = {
    name: 'setinfo',
    run: (message, client, args) =>
    {

        if (!message.member?.permissions.has('ADMINISTRATOR'))
        {
            return message.channel.send('❎ **| ¡No tienes permisos suficientes para usar este comando!**');
        }   

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require(path.join(process.cwd(), 'config.json'));

        if (!args[0])
        {
            return message.channel.send('❎ **| define el tipo de datos. \n¡Tipos de datos: `comunidad, invitacion, logo, youtube y tienda`!**');
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
            return message.channel.send('❎ **| El tipo de dato definido no es valido.**');
        }
        

        config['basic_infos'] = [args[0]];
        
        fs.writeFileSync(path.join(process.cwd(), 'config.json'), JSON.stringify(config, null, 4));

        message.channel.send(`Nuevo dato actualizado. ${args[0]}`);

        
    }
};

export = command;
*/