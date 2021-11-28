import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'kick',
    run: (message, client, args) =>
    {
        var server = message.guild;
        var perms = message.member?.permissions.has("KICK_MEMBERS")
        if (!perms) return message.channel.send("❎ **| No tienes los permisos necesarios.**").then(m =>
        {
            setTimeout(() => { m.delete() }, 5000)
        })
        try
        {
            let user = message.mentions.users.first()
            if (!user) return message.channel.send('❎ **| Debes mencionar a un usuario.**').then(m =>
            {
                setTimeout(() => { m.delete() }, 5000)
            })

            if (user === message.author)
                return message.channel.send("❎ **| ¡No te puedes expulsar a ti mismo!** ")

            let member = message.guild?.members.cache.find(m => m.id == user?.id);

            if (!member?.kickable) return message.reply('**Este usuario no puede ser expulsado.**').then(m =>
            {
                setTimeout(() => { m.delete() }, 5000)
            })
            let razon = args.slice(1).join(' ')
            if (!razon) return message.channel.send('❎ **| Razón no descrita.**').then(m =>
            {
                setTimeout(() => { m.delete() }, 5000)
            })

            member.kick(razon)

            let serverIconURL = server?.iconURL();

            if (!server || !serverIconURL) return;

            let embed2 = new Discord.MessageEmbed()

                .setThumbnail(serverIconURL)
                .setAuthor(server.name, serverIconURL)
                .setDescription(`${user} Has sido expulsado del servidor. **${server.name}**`)
                .addField(`Moderador responsable:`, message.author.tag)
                .addField(`Razón de la expulsión:`, razon)

            user.send({ embeds: [embed2] })
                .catch(e => { });

            let embed = new Discord.MessageEmbed()
                .setThumbnail(user.displayAvatarURL())
                .setDescription(`El usuario ${user} ¡ha sido expulsado con exito!`)
                .addField(`Nombre del usuario expulsado:`, user.tag,)
                .addField(`ID del usuario expulsado:`, user.id, true)
                .setColor("RANDOM")
                .addField(`Moderador responsable:`, message.author.tag,)//asd
                .addField(`ID del moderador:`, message.author.id, true)
                .addField(`Razón de la expulsión:`, razon)
            message.channel.send({ embeds: [embed] });

        } catch (er)
        {
            message.channel.send(`**Hubo un error, porfavor si el error continua comuniquelo a nuestro servidor personal.\n\nError:** ||\`${er}\`||`)
        }
    }
}

export = command;
