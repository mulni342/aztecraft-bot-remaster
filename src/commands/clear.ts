import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'clear',
    run: (message, client, args) =>
    {
        let cantidad = parseInt(args[0]);

        if (!cantidad) return message.channel.send("<a:error:735244847019065416> **| Tienes que escribir la cantidad de mensajes que deseas eliminar!.**")

        message.delete()

        if (!(message.channel.type === 'GUILD_TEXT')) return;

        message.channel.bulkDelete(cantidad);


        message.channel.send("<a:si:740225748794605731> ¡He borrado " + cantidad + " mensaje/s!").then(m =>
        {
            setTimeout(() => { m.delete(); }, 5000)
        });

    }
}

export = command;
