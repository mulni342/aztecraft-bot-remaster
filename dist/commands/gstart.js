"use strict";
const command = {
    name: 'gstart',
    run: (message, client, args) => {
        var _a, _b;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const ms = require('ms');
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('MANAGE_MESSAGES')) && !((_b = message.member) === null || _b === void 0 ? void 0 : _b.roles.cache.some((r) => r.name === 'Giveaways'))) {
            return message.channel.send('❎ **|Debe tener los permisos de administración de mensajes para comenzar los sorteos.**');
        }
        const giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.channel.send('❎ **|¡Tienes que mencionar un canal de texto válido!**');
        }
        const giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.channel.send('❎ **| No has especificado la duración.**');
        }
        const giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.channel.send('❎ **| ¡Tienes que especificar un número válido de ganadores!**');
        }
        const giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.channel.send('❎ **| ¡Tienes que especificar un premio válido!**');
        }
        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: Number(giveawayNumberWinners),
            messages: {
                giveaway: '🎉🎉 **Sorteo** 🎉🎉',
                giveawayEnded: '🎉🎉**Sorteo terminado** 🎉🎉',
                timeRemaining: 'Tiempo transcurrido: ¡**{duration}**!',
                inviteToParticipate: '¡Reacciona con 🎉 para participar!',
                winMessage: 'Felicidades, {winners}! Has ganado **{prize}**!',
                embedFooter: 'Sorteos',
                noWinner: '¡El sorteo ha sido cancelado por falta de participantes!.',
                winners: 'Ganadores',
                endedAt: 'Terminó',
                units: {
                    seconds: 'segundos',
                    minutes: 'minutos',
                    hours: 'horas',
                    days: 'días',
                    pluralS: false
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
        }).catch(() => { });
        message.channel.send(`El sorteo ha sido iniciado en ${giveawayChannel}!`);
    }
};
module.exports = command;
