import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'unmute',
    run: (message, client, args) =>
    {

        let usuario = message.mentions?.members?.first() || message.guild?.members.resolve(args[0])
        let role = message.guild?.roles.cache.find(x => x.name === 'Silenciado')
        let server = message.guild;

        let config = require("../../config.json");
        let logs_channel = config.channels.logs || message.channelId;

        if (!message.member?.permissions.has('MANAGE_MESSAGES')) return message.channel.send('<a:error:735244847019065416> **| No tienes los permisos para ejecutar este comando**')

        if (!message.guild?.me?.permissions.has('MANAGE_ROLES')) return message.channel.send('<a:error:735244847019065416> **| Necesito el permiso de gestionar roles**');

        if (!usuario) return message.channel.send('<a:error:735244847019065416> **| No has mencionado a ningun usuario**');

        if (!message.guild.roles.cache.find(x => x.name === 'Silenciado')) return message.channel.send('<a:error:735244847019065416> ** | No puedes desmutear a alguien que no está muteado** ')

        if (message.guild.roles.cache.find(x => x.name === 'Silenciado'))
        {
            if (!role) return;
            usuario.roles.remove(role.id)

        }

        let embed = new Discord.MessageEmbed()

            .setDescription(`El usuario ${usuario}, ya no se encuentra muteado!.`)
            .addField(` ID del usuario desmuteado:`, `**${usuario.id}**`)
            .addField(`Moderador Responsable:`, `**${message.author}**`)
            .setColor("GREEN")

        message.channel.send({ embeds: [ embed ] })

        let embedmd = new Discord.MessageEmbed()

            .setDescription(`${usuario}, ya no te encuentras muteado de **${server}**`)
            .setColor("GREEN")

        usuario.send({ embeds: [ embedmd ] })

        let gafox = new Discord.MessageEmbed()

            .setTitle(`${message.author} ha desmuteado a ${usuario}`)
            .addField(`ID del moderador responsable`, message.author.id)
            .addField(`ID del usuario desmuteado`, usuario.id)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter("Sistema de Logs")

        var canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText()) return;

        canal.send({ embeds: [ gafox ] })
    }
}

export = command;
