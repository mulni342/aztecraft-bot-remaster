import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'say',
    run: (message, client, args) => {
        let texto=args.slice(0).join(' ')
        
        message.channel.send(texto)
    
        message.delete()
    }
}

export = command;
