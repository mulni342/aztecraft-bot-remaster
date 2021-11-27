import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'redes',
    run: (message, client, args) =>
    {

        let avatarURL = client.user?.displayAvatarURL();

        if (!avatarURL) return;

        let embed = new Discord.MessageEmbed()
            .setAuthor(`Redes Sociales de Demoncrafters`, avatarURL)
            .setThumbnail("https://cdn.discordapp.com/icons/693643999503974580/5dbdfc585724250c5b33eeec3cfa03e0.webp")
            .setDescription(`<a:hola:739628295896694855> ${message.author} Acá te estaré mostrando las redes sociales de Demoncrafters...`)
            .addField("<:youtube:751592581565251715> Youtube", " [Click aqui](https://www.youtube.com/channel/UCp57qm-utse3sU6cKqgBq-Q)")
            .addField("<a:asd:745002035933609997> Tienda oficial del servidor", "[Click aqui]( https://tienda.demoncrafters.com/)")
            .addField("<a:discord2:735673709662306424> Link de invitación a nuestro Discord Oficial", "https://discord.gg/RNUcTwwupV")
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter("Demoncrafters")

        message.channel.send({
            'embeds': [embed]
        })
    }
}

export = command;
