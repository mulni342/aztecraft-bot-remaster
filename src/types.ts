/* eslint-disable @typescript-eslint/no-explicit-any */
import * as discord from 'discord.js';

export interface Event {
    name: keyof discord.ClientEvents,
    run: (client: discord.Client, ...args: any) => void;
}

export interface Command {
    name: string,
    run: (message: discord.Message, client: discord.Client, args: string[] | any) => void;
}
