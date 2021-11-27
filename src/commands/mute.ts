import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'mute',
    run: (message, client, args) =>
    {
        let usuario = message.mentions.members?.first() || message.guild?.members.resolve(args[0])
        let razon = args[1] ? args.slice(1).join(' ') : 'No definida'
        let role = message.guild?.roles.cache.find(x => x.name === 'Silenciado')
        let server = message.guild

        let config = require("../../config.json");
        let logs_channel = config.channels.logs || message.channelId;

        if (!message.member?.permissions.has('KICK_MEMBERS')) return message.channel.send('<a:error:735244847019065416> **| No tienes los permisos para ejecutar este comando**')

        if (!message.member?.permissions.has('MANAGE_MESSAGES')) return message.channel.send('<a:error:735244847019065416> **| No tienes los permisos para ejecutar este comando**')

        if (!message.guild?.me?.permissions.has('MANAGE_ROLES')) return message.channel.send('<a:error:735244847019065416> **| Necesito el permiso de gestionar roles**');

        if (!usuario) return message.channel.send('<a:error:735244847019065416> **| No has mencionado a ningun usuario**');

        if (usuario.id === message.author.id) return message.channel.send('<a:error:735244847019065416> ** | No puedes silenciarte a ti mismo**');

        if (usuario.id === client.user?.id) return message.channel.send('<a:error:735244847019065416> ** | No puedes silenciarme**')

        if (message.guild?.ownerId !== message.author.id && usuario.roles.highest.comparePositionTo(message.member?.roles.highest) >= 0) return message.channel.send('<a:error:735244847019065416> **| No puedes silenciar a este usuario**');

        if (role && role.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('<a:error:735244847019065416> ** | No puedo dar el rol Silenciado**');

        if (role && usuario.roles.cache.has(role.id)) return message.channel.send('<a:error:735244847019065416> **| Este usuario ya está silenciado**');

        if (razon.length > 1024) return message.channel.send('<a:error:735244847019065416> ** | La razon no puede exceder de 1024 caracteres**')

        if (!role)
        {

            message.guild.roles.create({
                name: 'Silenciado',
                color: '#6c6a6a',
                reason: 'Mute role'
            }).then(role =>
            {
                message.guild?.channels.cache.forEach(r =>
                {
                    if (r.type == "GUILD_TEXT")
                    {
                        r.permissionOverwrites.create(role, {
                            'SEND_MESSAGES': false
                        })
                    }
                })
                usuario?.roles.add(role.id)
            })

        } else
        {
            usuario.roles.add(role.id)

        }

        let embed = new Discord.MessageEmbed()

            .setTitle('Usuario silenciado')
            .addField('Usuario', `<@${usuario.id}>`)
            .addField('Moderador responsable', `${message.author}`)
            .addField('Razon', razon)
            .setColor('RANDOM')

        message.channel.send({
            'embeds': [embed]
        })

        let serverIconURL = server?.iconURL();

        if (!server || !serverIconURL) return;




        let embedmd = new Discord.MessageEmbed()

            .setThumbnail(serverIconURL)
            .setAuthor(server.name, serverIconURL)
            .setDescription(`Te encuentras mutead@ del server **${server}**`)
            .addField(`Moderador responsable`, `<@${message.author.id}>`)
            .addField(`Razón del mute`, razon)
            .setColor("RANDOM")

        usuario.send({ 'embeds': [embedmd] }).catch(e => e)

        let gafo = new Discord.MessageEmbed()
            .setTitle(`${message.author} ha muteado a ${usuario}`)
            .addField(`Razón del mute`, razon)
            .setColor("RED")
            .setTimestamp()
            .setFooter("Sistema de Logs")

        var canal = client.channels.cache.find(channel => channel.id === (logs_channel));
        if (!canal || !canal.isText()) return;

        canal.send({ 'embeds': [gafo] })

    }
}

export = command;
