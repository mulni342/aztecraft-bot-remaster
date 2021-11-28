/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'say',
    run: (message, client, args) => {
        const texto=args.slice(0).join(' ');
        
        message.channel.send(texto);
    
        message.delete();
    }
};

export = command;
