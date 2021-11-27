import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'help',
    run: (message, client, args) =>
    {

        let avatarURL = client.user?.displayAvatarURL();

        if (!avatarURL) return;

        let embed = new Discord.MessageEmbed()
            .setAuthor(`Comandos de DemonCrafters Bot!`, avatarURL)
            .setThumbnail("https://cdn.discordapp.com/icons/693643999503974580/5dbdfc585724250c5b33eeec3cfa03e0.webp")
            .setDescription(`Holaa ${message.author}, soy el bot oficial del server DemonCrafters acá abajo te aparecerá una lista detallada de mis comandos, espero y te sean de mucha ayuda!.. 💫`)
            .addField("Comandos Utiles", "**` ip | redes | report | sugerencia | sell | gstart | gend | anuncio`**")
            .addField("Comandos de moderación", "**` prefijo | canal | Ban | kick | mute | unmute | clear`**")
            .addField("Comandos de Entretenimiento", "**`love | say | embed | confesion`**")
            .setColor("RED")

        message.channel.send({
            'embeds': [embed]
        })
    }
}

export = command;
