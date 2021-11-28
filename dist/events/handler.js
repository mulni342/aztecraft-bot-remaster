"use strict";
const index_1 = require("../index");
const event = {
    name: 'messageCreate',
    run: (client, message) => {
        const prefix = process.env.prefix;
        if (message.author.bot)
            return;
        if (!message.content.startsWith(prefix))
            return;
        const messageArray = message.content.split(' ');
        const cmd = messageArray[0];
        const args = messageArray.slice(1);
        const commandName = cmd.replace(prefix, '');
        const command = index_1.commandsCollection.find(cmd => cmd.name === commandName);
        if (!command)
            return;
        command.run(message, client, args);
    }
};
module.exports = event;
