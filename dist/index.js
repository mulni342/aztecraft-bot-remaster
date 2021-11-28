"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandsCollection = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const discord = __importStar(require("discord.js"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const discord_giveaways_1 = require("discord-giveaways");
require('dotenv').config();
const config = require('../config.json');
process.env.prefix = config.prefix;
const client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.giveawaysManager = new discord_giveaways_1.GiveawaysManager(client, {
    storage: '../giveaways.json',
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        reaction: '🎉'
    }
});
exports.commandsCollection = new discord.Collection();
// Command Loader
(() => {
    const commands = fs.readdirSync(path.join(__dirname, 'commands'));
    for (const commandDirectory of commands) {
        const command = require(path.join(__dirname, 'commands', commandDirectory));
        exports.commandsCollection.set(command.name, command);
    }
})();
(() => {
    const events = fs.readdirSync(path.join(__dirname, 'events'));
    for (const eventDirectory of events) {
        const event = require(path.join(__dirname, 'events', eventDirectory));
        client.on(event.name, (...args) => {
            event.run(client, ...args);
        });
    }
})();
client.login(process.env.token);
