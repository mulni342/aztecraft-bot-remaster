import * as Discord from "discord.js"
import { Event } from "../types"

let event: Event = {
    name: "guildMemberAdd",
    run: (client, miembro: Discord.GuildMember) =>
    {
        let embed = new Discord.MessageEmbed()

            .setTitle(":zap:Bienvenido a DemonCrafters:zap:")
            .setDescription("Bienvenido <@" + miembro.id + "> a DemonCrafters\n\n 🎉Disfruta del servidor con todos🎉\n\n Recuerda pasarte por los canales de información para evitar tener algún problema y estar informado de todo.\n\n :beginner:**Redes Sociales**:beginner:\n :trident:Ip: play.demoncrafters.com \n :maple_leaf:YouTube: [Click aqui]( https://www.youtube.com/channel/UCp57qm-utse3sU6cKqgBq-Q) \n :moneybag:Tienda: [Click aqui]( https://tienda.demoncrafters.com/")
            .setImage("https://cdn.discordapp.com/attachments/749083973065506937/749144207712714843/1080.png")
            .setColor("YELLOW")
            .setTimestamp()
            .setFooter("Bienvenidas de DemonCrafters | ")

        var Canal = client.channels.cache.find(channel => channel.id === ("854499272715534357"));
        if (Canal)
        {
            if (Canal.isText())
            {
                Canal.send({ embeds: [embed] });
            }
        }
    }
}

export = event;
