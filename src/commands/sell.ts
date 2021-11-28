import { Command } from "../types"
import * as Discord from "discord.js"

let command: Command = {
    name: "sell",
    run: (message, client, args) =>
    {

        let config = require("../../config.json");
        let sells_channel = config.channels.sells || message.channelId;
        let logo_basic = config.basic_infos.logo;

        let algo = args.slice(0).join(' ').split('|')
        if (!algo[0]) return message.channel.send(`❎ **| Debes proporcionar tu nick del juego.**`)

        if (!algo[1]) return message.channel.send(`❎ **| Debes proporcionar la modalidad donde venderás dicho objeto.**`)

        if (!algo[2]) return message.channel.send(`❎ **| Debes proporcinar el nombre del objeto que venderás.**`)

        if (!algo[3]) return message.channel.send(`❎ **| Debes propocionar el precio del objeto que venderás.**`)

        let entregado = new Discord.MessageEmbed()

            .setDescription(`✅ **|${message.author}, ¡Tu venta ha sido enviada con exito!**`)
            .setColor("GREEN")

        message.channel.send({
            'embeds': [entregado]
        })

        let embed = new Discord.MessageEmbed()
        
            .setThumbnail(logo_basic)
            .setTitle("Sistema de Ventas | PecaBot")
            .addField("• Vendedor:", algo[0])
            .addField("• Modalidad:", algo[1])
            .addField("• Objeto en venta:", algo[2])
            .addField("• Precio:", algo[3])
            .setFooter("Sistema de Ventas | PecaBot")
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
