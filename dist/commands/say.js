"use strict";
let command = {
    name: 'say',
    run: (message, client, args) => {
        let texto = args.slice(0).join(' ');
        message.channel.send(texto);
        message.delete();
    }
};
module.exports = command;
