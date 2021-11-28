import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'confesion',
    run: (message, client, args) =>
    {
        let texto = args.slice(0).join(' ')
        if (!texto) return message.channel.send("❎ **| Debes enviar un mensaje.**")

        let config = require("../../config.json");
        let confessions_channel = config.channels.confessions || message.channelId;
        
        let embed = new Discord.MessageEmbed()
            .setTitle(' 💬 **Nueva confesión**')
            .setDescription(texto)
            .setColor('RANDOM')
            .setFooter('Atentamente: Un desconocido.')


        var Canal = client.channels.cache.find(channel => channel.id === (confessions_channel));
        if (!Canal || !Canal.isText()) return;

        Canal.send({ embeds: [embed] });

        message.delete()
    }
}

export = command;
