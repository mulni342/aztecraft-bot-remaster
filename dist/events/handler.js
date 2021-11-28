"use strict";
const index_1 = require("../index");
let event = {
    name: "messageCreate",
    run: (client, message) => {
        let prefix = process.env.prefix;
        if (message.author.bot)
            return;
        if (!message.content.startsWith(prefix))
            return;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        let commandName = cmd.replace(prefix, "");
        let command = index_1.commandsCollection.find(cmd => cmd.name === commandName);
        if (!command)
            return;
        command.run(message, client, args);
    }
};
module.exports = event;
