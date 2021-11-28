import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'help',
    run: (message, client, args) =>
    {

        let avatarURL = client.user?.displayAvatarURL();
        let config = require("../../config.json");
        let community_basic = config.basic_infos.community;
        let logo_basic = config.basic_infos.logo;

        if (!avatarURL) return;

        let embed = new Discord.MessageEmbed()
            .setAuthor(`¡Comandos de PecaBot!`, avatarURL)
            .setThumbnail(logo_basic)
            .setDescription(`¡Hola! ${message.author}, soy el bot oficial del servidor ${community_basic} acá abajo te aparecerá una lista detallada de mis comandos, espero y te sean de mucha ayuda!.. 💫`)
            .addField("Comandos Utiles", "**` ip | redes | report | sugerencia | sell | gstart | gend | anuncio`**")
            .addField("Comandos de moderación", "**` prefijo | canal | Ban | kick | mute | unmute | purge`**")
            .addField("Comandos de Entretenimiento", "**`love | say | embed | confesion`**")
            .setColor("RED")

        message.channel.send({
            'embeds': [embed]
        })
    }
}

export = command;
