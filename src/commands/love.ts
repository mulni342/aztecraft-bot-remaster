import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'love',
    run: (message, client, args) =>
    {
        let asd1 = ["**10%**  [█. . . . . . . . . .] ", "**12%**  [█. . . . . . . . . .] ", "**13%**  [█. . . . . . . . . .] ", "**14%**  [█. . . . . . . . . .] ", "**15%**  [██ . . . . . . . . .] ", "**16%**  [██ . . . . . . . . .] ", "**17%**  [██ . . . . . . . . .] ", "**18%**  [██ . . . . . . . . .] ", "**19%**  [██ . . . . . . . . .] ", "**20%** [███  . . . . . . . .] ", "**21%** [███  . . . . . . . .]", "**22%** [███  . . . . . . . .]", "**23%** [███  . . . . . . . .]", "**24%** [█████  . . . . . . .]", "**25%** [█████  . . . . . . .]", "**27%** [█████  . . . . . . .]", "**30%** [████████  . . . . .]", "**33%** [████████  . . . . .]", "**35%** [████████  . . . . .]", "**38%** [████████████  . . .]", "**42%** [████████████  . . .]", "**44%** [████████████  . . .]", "**48%** [████████████  . . .]", "**52%** [███████████████  . .]", "**55%** [███████████████  . .]", "**58%** [█████████████████  .]", "**60%** [█████████████████  .]", "**65%** [█████████████████  .]", "**70%** [█████████████████  .]", "**75%** [█████████████████  .]", "**100%** [████████████████████]"]
        var porcentaje = asd1[Math.floor(Math.random() * asd1.length)]
        let asd = message.mentions.users.first()
        if (!asd) return message.channel.send("<a:error:735244847019065416> **| Debes mencionar a alguien**")

        const cartel = new Discord.MessageEmbed()
            .addField(`💓 ¿Que porcentaje hay de que tengas una relacion con **${asd.username}**?  `, `💘 La probabilidad es de un ${porcentaje}`)
            .setColor("RED")

        message.channel.send({ embeds: [cartel] });

    }
}

export = command;
