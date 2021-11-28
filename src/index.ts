/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as discord from 'discord.js';
import * as path from 'path';
import * as fs from 'fs';

import { Command } from './types';
import { GiveawaysManager } from 'discord-giveaways';

require('dotenv').config();

const config = require('../config.json');
process.env.prefix = config.prefix;

const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

(client as any).giveawaysManager = new GiveawaysManager(client, {
    storage: '../giveaways.json',
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,

        embedColor: '#FF0000',
        reaction: '🎉'
    }
});

export const commandsCollection = new discord.Collection<string, Command>();

// Command Loader
(() =>
{
    const commands = fs.readdirSync(path.join(__dirname, 'commands'));
    for (const commandDirectory of commands)
    {
        const command = require(path.join(__dirname, 'commands', commandDirectory));
        commandsCollection.set(command.name, command);
    }
})();

(() =>
{
    const events = fs.readdirSync(path.join(__dirname, 'events'));

    for (const eventDirectory of events)
    {
        const event = require(path.join(__dirname, 'events', eventDirectory));
        client.on(event.name, (...args) =>
        {
            event.run(client, ...args);
        });
    }

})();


client.login(process.env.token);


