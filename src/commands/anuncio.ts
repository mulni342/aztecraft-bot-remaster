import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'anuncio',
    run: (message, client, args) =>
    {
        let server = message.guild
        let asup = (m: any) => m.author.id === message.author.id
        let perm = message.member?.permissions.has('ADMINISTRATOR')
        if (!perm) return message.channel.send('<a:error:735244847019065416> **| No tienes los permisos necesarios para ejecutar este comando!.**')
        message.channel.send({
            embeds: [
                {
                    title: 'Menciona al canal donde se enviara el anuncio'
                }
            ]
        }).then(() =>
        {

            message.channel.awaitMessages({
                max: 1,
                time: 20000,
                errors: ['time'],
                filter: asup
            }).then(msg =>
            {
                if (!msg) return;
                let fmsg = msg.first();
                if (!fmsg) return;

                let room = message.guild?.channels.cache.get(fmsg.content.replace('<#', '').replace('>', ''))
                if (!room) return message.channel.send({
                    embeds: [
                        {
                            title: 'No encontre ese canal'
                        }
                    ]
                })
                message.channel.send({
                    embeds: [
                        {
                            title: 'Ahora envía el titulo'
                        }
                    ]
                }).then(() =>
                {
                    message.channel.awaitMessages({
                        max: 1,
                        time: 20000,
                        errors: ['time'],
                        filter: asup
                    }).then(msg =>
                    {

                        let title = msg.first()?.content
                        message.channel.send({
                            embeds: [
                                {
                                    title: 'Ahora envía la descripción'
                                }
                            ]
                        }).then(() =>
                        {
                            message.channel.awaitMessages({
                                filter: asup,
                                max: 1,
                                time: 20000,
                                errors: ['time']
                            }).then(msg =>
                            {

                                let descri = msg.first()?.content
                                if (!title || !descri) return;

                                if ((title.length + descri.length) > 2048) return message.channel.send({
                                    embeds: [
                                        {
                                            title: 'El titulo + la descripción no pueden exeder los 2049 caracteres'
                                        }
                                    ]
                                })
                                if (room?.isText())

                                    room?.send({
                                        embeds: [
                                            {
                                                description: `╔═════════════════════════╗\n          **    <a:asd:745002035933609997> 》${title} 《<a:asd:745002035933609997>**\n╚═════════════════════════╝\n\n${descri}`,
                                                color: 'YELLOW'
                                            }
                                        ]
                                    })
                            })
                        })
                    })
                })
            })
        }).catch(err => message.channel.send({
            embeds: [
                {
                    title: 'error',
                    description: `|| ${err} ||`
                }
            ]
        }))

    }
}

export = command;
