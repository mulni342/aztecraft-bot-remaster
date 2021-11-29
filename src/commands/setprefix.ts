/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Discord from 'discord.js';
import { Command } from '../types';
import * as fs from 'fs';
import * as path from 'path';

const command: Command = {
    name: 'setprefix',
    run: (message, client, args) =>
    {

        if (!message.member?.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send('❎ **| ¡No tienes permiso para usar este comando!**');
        }

        const config = require(path.join(process.cwd(), 'config.json'));

        if (args[0] == undefined)
        {
            return message.channel.send('❎ **| !No definiste un prefijo nuevo!**');
        }
        if (args[0].length > 5)
        {
            return message.channel.send('❎ **| ¡El prefijo no puede exceder los 5 caracteres!**');
        }

        config['prefix'] = args[0];
        process.env.prefix = args[0];

        fs.writeFileSync(path.join(process.cwd(), 'config.json'), JSON.stringify(config, null, 4));

        message.channel.send(`Nuevo Prefijo: **${args[0]}**`);

    }
};

export = command;
