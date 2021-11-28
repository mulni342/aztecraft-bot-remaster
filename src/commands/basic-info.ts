import * as Discord from "discord.js"
import { Command } from "../types"
import * as path from "path"
import * as fs from "fs"

let command: Command = {
    name: "basic-info",
    run: (message, client, args) =>
    {

        if (!message.member?.permissions.has("ADMINISTRATOR"))
        {
            return message.channel.send("❎ |**¡No tienes permisos suficientes para usar este comando!**");
        }   

        let config = require(path.join(process.cwd(), "config.json"));

        if (!args[0])
        {
            return message.channel.send("❎ |**Define el tipo de datos. \n¡Tipos de datos: `comunidad, invitacion, logo, youtube y tienda`!**")
        }

        let types: any = {
            'comunidad': "community",
            'invitacion': "invitation", 
            'logo': "logo",
            'youtube': "youtube",
            'tienda': "shop"
        };

        if (!types[args[0]])
        {
            return message.channel.send("❎ |**El tipo de dato definido no es valido.**");
        }
        
        let info_basic: any;

        config['basic_infos'][types[args[0]]] = info_basic;

        message.channel.send(`<#${info_basic}> es el nuevo dato de ${args[0]}`);

        fs.writeFileSync(path.join(process.cwd(), "config.json"), JSON.stringify(config, null, 4));
    }
}

export = command;