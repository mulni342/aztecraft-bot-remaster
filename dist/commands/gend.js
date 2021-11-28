"use strict";
const command = {
    name: 'gend',
    run: (message, client, args) => {
        var _a, _b;
        const ms = require('ms');
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('MANAGE_MESSAGES')) && !((_b = message.member) === null || _b === void 0 ? void 0 : _b.roles.cache.some((r) => r.name === 'Giveaways'))) {
            return message.channel.send('❎**| ¡No tienes los permisos necesarios para ejecutar esté comando!** ');
        }
        if (!args[0]) {
            return message.channel.send('❎ **|¡Tienes que especificar el ID de un mensaje válido!**');
        }
        const giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
        if (!giveaway) {
            return message.channel.send('Incapaz de encontrar un regalo para `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
            message.channel.send('El sorteo terminará en menos de ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' segundos...');
        })
            .catch((e) => {
            if (e.startsWith(`El Sorteo con la ID de mensaje proporcionada:  ${giveaway.messageID} ya ha terminado.`)) {
                message.channel.send('¡Este sorteo ya terminó!');
            }
            else {
                console.error(e);
                message.channel.send('Ocurrió un error...');
            }
        });
    }
};
module.exports = command;
