import * as Discord from "discord.js"
import { Command } from "../types"

let command: Command = {
    name: 'anuncio',
    run: (message, client, args) =>
    {
        let server = message.guild
        let asup = (m: any) => m.author.id === message.author.id
        let perm = message.member?.permissions.has('ADMINISTRATOR')
        if (!perm) return message.channel.send('❎**| ¡Permisos insuficientes para ejecutar este comando!.**')
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
                            title: 'El canal mencionado no se a podido encontrar.'
                        }
                    ]
                })
                message.channel.send({
                    embeds: [
                        {
                            title: 'Envía el titulo del anuncio'
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
                                    title: 'Envía la descripción del anuncio.'
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
                                            title: 'El titulo y la descripción no pueden exeder los 2049 caracteres'
                                        }
                                    ]
                                })
                                if (room?.isText())

                                    room?.send({
                                        embeds: [
                                            {
                                                description: `╔═════════════════════════╗\n          **    》${title} 《 **\n╚═════════════════════════╝\n\n${descri}`,
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
