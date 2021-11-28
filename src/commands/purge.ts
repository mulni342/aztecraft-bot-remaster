/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'purge',
    run: (message, _client, args) =>
    {
        const cantidad = parseInt(args[0]);

        if (!cantidad) return message.channel.send('❎ **| ¡Tienes que escribir la cantidad de mensajes que deseas eliminar!**');

        message.delete();

        if (!(message.channel.type === 'GUILD_TEXT')) return;

        message.channel.bulkDelete(cantidad);


        message.channel.send('❎ ¡He borrado ' + cantidad + ' mensaje/s)!').then(m =>
        {
            setTimeout(() => { m.delete(); }, 5000);
        });

    }
};

export = command;
