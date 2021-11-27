import * as Discord from "discord.js"
import { Command } from "../types"
import * as path from "path"
import * as fs from "fs"

let command: Command = {
    name: "canal",
    run: (message, client, args) =>
    {

        if (!message.member?.permissions.has("MANAGE_CHANNELS"))
        {
            return message.channel.send(":error:  |**No tienes permiso para usar este comando!!**");
        }   

        let config = require(path.join(process.cwd(), "config.json"));

        if (!args[0])
        {
            return message.channel.send(":error:  |**Define el tipo de canal. \ntipos de canales, `sugerencias, registros, ventas, confesiones`!!**")
        }

        let types: any = {
            'sugerencias': "suggestions",
            'registros': "logs", 
            'ventas': "sells",
            'confesiones': "confessions"
        };

        if (!types[args[0]])
        {
            return message.channel.send(":error: |**El tipo de canal definido es invalido**");
        }

        config['channels'][types[args[0]]] = message.channelId;

        message.channel.send(`<#${message.channelId}> es el nuevo canal de ${args[0]}`);

        fs.writeFileSync(path.join(process.cwd(), "config.json"), JSON.stringify(config, null, 4));
    }
}

export = command;
