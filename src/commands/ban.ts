import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'ban',
    run: (message, client, args) =>
    {
        var server = message.guild;

        let config = require("../../config.json");
        let logs_channel = config.channels.logs || message.channelId;

        let permsBot = message.guild?.me?.permissions.has("BAN_MEMBERS");

        if (!permsBot) return message.channel.send("❎ **| No tengo permisos.**")

        let perms = message.member?.permissions.has("BAN_MEMBERS")

        if (!perms) return message.channel.send("❎ **| No posees permisos para ejecutar este comando.**")

        let user = message.mentions?.members?.first()
        if (!user) return message.channel.send('❎ **| ¡Debes mencionar a un usuario!**')

        if (user.id === message.author.id)
            return message.channel.send("❎ **| ¡No puedes prohibirte a ti mismo en el servidor!** ")

        if (message.member && user.roles.highest.comparePositionTo(message.member.roles?.highest) > 0)
        {
            return message.channel.send("❎ **| ¡El usuario que quieres prohibir en el servidor tiene un rol superior al tuyo!**")

        }

        var razon = args.slice(1).join(' ')
        if (!razon)
        {
            razon = `No hay una razón definida.`
        }

        razon = razon + ``

        message.guild?.members.ban(user, { reason: razon }).catch(e => message.reply("❎ **| Se ha producido un error.**"))

        let serverIconURL = server?.iconURL();

        if (!server || !serverIconURL) return;

        let embed2 = new Discord.MessageEmbed()

            .setThumbnail(serverIconURL)
            .setAuthor(server.name, serverIconURL)
            .setDescription(`${user} Fuiste prohibido en el servidor: **${server.name}**`)
            .addField(` Moderador responsable:`, message.author.tag)
            .addField(`Razón de la prohibición:`, razon)

        user.send({ embeds: [embed2] });

        let embed = new Discord.MessageEmbed()
            .setThumbnail(serverIconURL)
            .setDescription(`✅ ¡El usuario ${user} fue prohibido!...`)
            .addField(`Prohibido:`, user.id, true)
            .setColor("RED")
            .addField(`Moderador responsable:`, message.author.tag)
            .addField(`ID del moderador:`, message.author.id, true)
            .addField(`Razón de la prohibición:`, razon)
        message.channel.send({ embeds: [embed] });

        var canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText()) return;

        canal.send({ embeds: [embed] })

    }
}

export = command;
