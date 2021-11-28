import * as Discord from 'discord.js';
import { Event } from '../types';

import { commandsCollection } from '../index';

const event: Event = {
    name: 'messageCreate',
    run: (client, message: Discord.Message) =>
    {
        const prefix = process.env.prefix as string;

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const messageArray = message.content.split(' ');
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        const commandName = cmd.replace(prefix, '');

        const command = commandsCollection.find(cmd => cmd.name === commandName);
        if (!command) return;

        command.run(message, client, args);
    }
};

export = event;
