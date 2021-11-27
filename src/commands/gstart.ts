import { GiveawaysManager } from "discord-giveaways";
import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'gstart',
    run: (message, client, args) =>
    {
        const ms = require('ms');

        if (!message.member?.permissions.has('MANAGE_MESSAGES') && !message.member?.roles.cache.some((r) => r.name === "Giveaways"))
        {
            return message.channel.send('<a:error:735244847019065416> **|Debe tener los permisos de administración de mensajes para comenzar los sorteos.**');
        }


        let giveawayChannel = message.mentions.channels.first();

        if (!giveawayChannel)
        {
            return message.channel.send('<a:error:735244847019065416> **|¡Tienes que mencionar un canal válido!**');
        }

        let giveawayDuration = args[1];

        if (!giveawayDuration || isNaN(ms(giveawayDuration)))
        {
            return message.channel.send('<a:error:735244847019065416> **| No has especificado la duración**');
        }


        let giveawayNumberWinners = args[2];

        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0))
        {
            return message.channel.send('<a:error:735244847019065416> **| ¡Tienes que especificar un número válido de ganadores!**');
        }

        let giveawayPrize = args.slice(3).join(' ');

        if (!giveawayPrize)
        {
            return message.channel.send('<a:error:735244847019065416> **| ¡Tienes que especificar un premio válido!**');
        }


        (client as any).giveawaysManager.start(giveawayChannel, {

            time: ms(giveawayDuration),

            prize: giveawayPrize,

            winnerCount: Number(giveawayNumberWinners),


            messages: {
                giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
                giveawayEnded: "🎉🎉**Sorteo terminado** 🎉🎉",
                timeRemaining: "Tiempo transcurrido: **{duration}**!",
                inviteToParticipate: "Reacciona con 🎉 para participar!",
                winMessage: "Felicidades, {winners}! Has ganado **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: "El sorteo ha sido cancelado por falta de participantes!.",
                winners: "Ganadores",
                endedAt: "Terminó",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        }).catch((e: any) => { })

        message.channel.send(`El sorteo ha sido iniciado en ${giveawayChannel}!`);

    }
}

export = command;
