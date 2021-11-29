/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Discord from 'discord.js';
import { Command } from '../types';

const command: Command = {
    name: 'anuncio',
    run: (message, client, args) =>
    {
        const server = message.guild;
        const asup = (m: any) => m.author.id === message.author.id;
        const perm = message.member?.permissions.has('ADMINISTRATOR');
        if (!perm) return message.channel.send('❎ **| ¡Permisos insuficientes para ejecutar este comando!.**');
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
                const fmsg = msg.first();
                if (!fmsg) return;

                const room = message.guild?.channels.cache.get(fmsg.content.replace('<#', '').replace('>', ''));
                if (!room) return message.channel.send({
                    embeds: [
                        {
                            title: 'El canal mencionado no se a podido encontrar.'
                        }
                    ]
                });
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

                        const title = msg.first()?.content;
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

                                const descri = msg.first()?.content;
                                if (!title || !descri) return;

                                if ((title.length + descri.length) > 2048) return message.channel.send({
                                    embeds: [
                                        {
                                            title: 'El titulo y la descripción no pueden exeder los 2049 caracteres'
                                        }
                                    ]
                                });
                                if (room?.isText())

                                    room?.send({
                                        embeds: [
                                            {
                                                description: `╔═════════════════════════╗\n          **    》${title} 《 **\n╚═════════════════════════╝\n\n${descri}`,
                                                color: 'YELLOW'
                                            }
                                        ]
                                    });
                            });
                        });
                    });
                });
            });
        }).catch(err => message.channel.send({
            embeds: [
                {
                    title: 'error',
                    description: `|| ${err} ||`
                }
            ]
        }));

    }
};

export = command;
