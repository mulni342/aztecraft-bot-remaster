import { Event } from '../types';

const event: Event = {
    name: 'ready',
    run: (client) =>
    {
        console.log('¡Hola PecaBot esta listo para ti!');
        function dany()
        {
            const elementos = [`PecaBot | ${process.env.prefix}help`, 'play.aztecraft.com'];

            client.user?.setPresence({
                'activities': [{
                    'name': elementos[Math.floor(elementos.length * Math.random())],
                    'type': 'WATCHING'
                }],
                'status': 'online'
            });

        }
        setInterval(dany, 6000);
    }
};

export = event;
