import * as discord from "discord.js"
import * as path from "path"
import * as fs from "fs"

import { Command } from "./types"
import { GiveawaysManager } from "discord-giveaways";

require("dotenv").config();

let config = require("../config.json")
process.env.prefix = config.prefix;

let client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

(client as any).giveawaysManager = new GiveawaysManager(client, {
    storage: "../giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,

        embedColor: "#FF0000",
        reaction: "🎉"
    }
})

export let commandsCollection = new discord.Collection<string, Command>();

// Command Loader
(() =>
{
    let commands = fs.readdirSync(path.join(__dirname, "commands"));
    for (let commandDirectory of commands)
    {
        let command = require(path.join(__dirname, "commands", commandDirectory));
        commandsCollection.set(command.name, command);
    }
})();

(() =>
{
    let events = fs.readdirSync(path.join(__dirname, "events"));

    for (let eventDirectory of events)
    {
        let event = require(path.join(__dirname, "events", eventDirectory))
        client.on(event.name, (...args) =>
        {
            event.run(client, ...args);
        });
    }

})();


client.login(process.env.token);


