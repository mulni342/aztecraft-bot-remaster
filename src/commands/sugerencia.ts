import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'sugerencia',
    run: (message, client, args) =>
    {
        let texto = args.slice(0).join(" ")
        if (!texto) return message.channel.send(`<a:error:735244847019065416> **| Debes mandar una sugerencia!..** `)

        let config = require("../../config.json");
        let suggestions_channel = config.channels.suggestions || message.channelId;


        let embed2 = new Discord.MessageEmbed()

            .setDescription(`<a:correct:741159081724608522> **${message.author}, tu sugerencia se ha enviado correctamente**`)
            .setColor("GREEN")


        message.author.send({ 'embeds': [embed2] })
            .catch(r => { })

        let userAvatarURL = client.user?.displayAvatarURL();

        if (!userAvatarURL) return;

        const embed = new Discord.MessageEmbed()

            .setAuthor("Sistema de sugerencias Demoncrafters",)
            .setTitle('<a:doge:735236350269194270> **Nueva sugerencia**')
            .addField("Sugerencia", texto)
            .addField("Autor de la sugerencia", `<@${message.author.id}>`)
            .setColor('RANDOM')
            .setFooter(`Sistema de Sugerencias Demoncrafters`)
            .setTimestamp()

        // client.channels.cache.get('735903826854543421').send({ 'embeds': [ embed ] }).then(m => { m.react('✅'), m.react('❌') })

        let channel = client.channels.cache.get(suggestions_channel);

        if (!channel || !channel.isText()) return;

        channel.send({ 'embeds': [embed] })
            .then(m =>
            {
                m.react('✅');
                m.react('❌');
            })


        message.delete()

    }
}

export = command;
