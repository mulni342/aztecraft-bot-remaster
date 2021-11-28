import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'ip',
    run: (message, client, args) => {
        message.channel.send('**╔═════════════════════╗**\n<a:mod**》 play.aztecraft.com 《** \n **》 Versión 1.16.5 《**\n╚═════════════════════╝ ');
    }
};

export = command;
