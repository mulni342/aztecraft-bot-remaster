"use strict";
const command = {
    name: 'anuncio',
    run: (message, client, args) => {
        var _a;
        const server = message.guild;
        const asup = (m) => m.author.id === message.author.id;
        const perm = (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('ADMINISTRATOR');
        if (!perm)
            return message.channel.send('❎**| ¡Permisos insuficientes para ejecutar este comando!.**');
        message.channel.send({
            embeds: [
                {
                    title: 'Menciona al canal donde se enviara el anuncio'
                }
            ]
        }).then(() => {
            message.channel.awaitMessages({
                max: 1,
                time: 20000,
                errors: ['time'],
                filter: asup
            }).then(msg => {
                var _a;
                if (!msg)
                    return;
                const fmsg = msg.first();
                if (!fmsg)
                    return;
                const room = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(fmsg.content.replace('<#', '').replace('>', ''));
                if (!room)
                    return message.channel.send({
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
                }).then(() => {
                    message.channel.awaitMessages({
                        max: 1,
                        time: 20000,
                        errors: ['time'],
                        filter: asup
                    }).then(msg => {
                        var _a;
                        const title = (_a = msg.first()) === null || _a === void 0 ? void 0 : _a.content;
                        message.channel.send({
                            embeds: [
                                {
                                    title: 'Envía la descripción del anuncio.'
                                }
                            ]
                        }).then(() => {
                            message.channel.awaitMessages({
                                filter: asup,
                                max: 1,
                                time: 20000,
                                errors: ['time']
                            }).then(msg => {
                                var _a;
                                const descri = (_a = msg.first()) === null || _a === void 0 ? void 0 : _a.content;
                                if (!title || !descri)
                                    return;
                                if ((title.length + descri.length) > 2048)
                                    return message.channel.send({
                                        embeds: [
                                            {
                                                title: 'El titulo y la descripción no pueden exeder los 2049 caracteres'
                                            }
                                        ]
                                    });
                                if (room === null || room === void 0 ? void 0 : room.isText())
                                    room === null || room === void 0 ? void 0 : room.send({
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
module.exports = command;
