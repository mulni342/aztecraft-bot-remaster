import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'gend',
    run: (message, client, args) =>
    {
        const ms = require('ms');

        if (!message.member?.permissions.has('MANAGE_MESSAGES') && !message.member?.roles.cache.some((r) => r.name === "Giveaways"))
        {
            return message.channel.send('<a:error:735244847019065416> **| No tienes los permisos necesarios para ejecutar esta acción!.** ');
        }

        if (!args[0])
        {
            return message.channel.send('<a:error:735244847019065416>  **|¡Tienes que especificar un ID de mensaje válido!**');
        }


        let giveaway =

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
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`))
                {
                    message.channel.send('This giveaway is already ended!');
                } else
                {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });
    }
}

export = command;
