import * as Discord from "discord.js"
import { Event } from "../types"

import { commandsCollection } from "../index"

let event: Event = {
    name: "messageCreate",
    run: (client, message: Discord.Message) =>
    {
        let prefix = process.env.prefix as string;

        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);

        let commandName = cmd.replace(prefix, "");

        let command = commandsCollection.find(cmd => cmd.name === commandName);
        if (!command) return;

        command.run(message, client, args);
    }
}

export = event;
