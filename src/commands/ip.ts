import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'ip',
    run: (message, client, args) => {
        message.channel.send("**╔═════════════════════╗**\n<a:mod:735287610708066408> **》 play.aztecraft.com 《** <a:mod:735287610708066408>\n     <a:peis:734993308304277514> **》 Versión 1.16.5 《** <a:peis:734993308304277514>\n╚═════════════════════╝ ")
    }
}

export = command;
