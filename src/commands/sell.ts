import { Command } from "../types"
import * as Discord from "discord.js"

let command: Command = {
    name: "sell",
    run: (message, client, args) =>
    {

        let config = require("../../config.json");
        let sells_channel = config.channels.sells || message.channelId;

        let algo = args.slice(0).join(' ').split('|')
        if (!algo[0]) return message.channel.send(`<a:error:735244847019065416> **| Debes proporcionar tu nick**`)

        if (!algo[1]) return message.channel.send(`<a:error:735244847019065416> **| Debes proporcionar la modalidad donde venderás dicho item**`)

        if (!algo[2]) return message.channel.send(`<a:error:735244847019065416> **| Debes proporcinar el articulo que venderás**`)

        if (!algo[3]) return message.channel.send(`<a:error:735244847019065416> **| Debes propocionar el precio del item que venderás**`)

        let entregado = new Discord.MessageEmbed()

            .setDescription(`**${message.author}, Tu venta ha sido enviada con exito**`)
            .setColor("GREEN")

        message.channel.send({
            'embeds': [entregado]
        })

        let embed = new Discord.MessageEmbed()

            .setThumbnail('https://cdn.discordapp.com/attachments/749083973065506937/749149007774875658/DemonCrafters.jpeg')
            .setTitle("Sistema de Ventas | DemonCrafters")
            .addField(":busts_in_silhouette: Vendedor:", algo[0])
            .addField(":rocket: Modalidad donde se vende el ariticulo:", algo[1])
            .addField(":moneybag: Articulo en venta", algo[2])
            .addField(":money_with_wings: Precio:", algo[3])
            .setFooter("Sistema de Ventas | Demoncrafters")
            .setColor("RED")
            .setTimestamp()

        var canal = client.channels.cache.find(channel => channel.id === (sells_channel));
        if (canal && canal.isText())
        {
            canal.send({
                'embeds': [embed]
            });
        }
    }
}

export = command;
