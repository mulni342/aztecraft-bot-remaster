/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'gend',
    run: (message, client, args) =>
    {
        if (!message.member?.permissions.has('MANAGE_MESSAGES') && !message.member?.roles.cache.some((r) => r.name === 'Giveaways'))
        {
            return message.channel.send('❎**| ¡No tienes los permisos necesarios para ejecutar esté comando!** ');
        }

        if (!args[0])
        {
            return message.channel.send('❎ **|¡Tienes que especificar el ID de un mensaje válido!**');
        }


        const giveaway =

            (client as any).giveawaysManager.giveaways.find((g: any) => g.prize === args.join(' ')) ||

            (client as any).giveawaysManager.giveaways.find((g: any) => g.messageID === args[0]);


        if (!giveaway)
        {
            return message.channel.send('Incapaz de encontrar un regalo para `' + args.join(' ') + '`.');
        }

        (client as any).giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })

            .then(() =>
            {
                message.channel.send('El sorteo terminará en menos de ' + ((client as any).giveawaysManager.options.updateCountdownEvery / 1000) + ' segundos...');
            })
            .catch((e: any) =>
            {
                if (e.startsWith(`El Sorteo con la ID de mensaje proporcionada:  ${giveaway.messageID} ya ha terminado.`))
                {
                    message.channel.send('¡Este sorteo ya terminó!');
                } else
                {
                    console.error(e);
                    message.channel.send('Ocurrió un error...');
                }
            });
    }
};

export = command;
