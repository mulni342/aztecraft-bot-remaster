"use strict";
const command = {
    name: 'say',
    run: (message, client, args) => {
        const texto = args.slice(0).join(' ');
        message.channel.send(texto);
        message.delete();
    }
};
module.exports = command;
