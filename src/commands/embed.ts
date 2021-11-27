import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'embed',
    run: (message, client, args) =>
    {
        let algo = args.slice(0).join(' ').split('|')
        if (!algo[0]) return message.channel.send(`<a:error:735244847019065416> **| Debes proporcionar un titulo para tu texto** `)

        if (!algo[1]) return message.channel.send(`<a:error:735244847019065416> **| Debes proporcionar una descripción para tu texto** `)

        let color: any = "#ff0000";

        if (algo[2]) color = algo[2]

        let asd = new Discord.MessageEmbed()
            .setTitle(algo[0])
            .setDescription(algo[1])
            .setColor(color)

        message.channel.send({ embeds: [asd] })

        message.delete()
    }
}

export = command;
