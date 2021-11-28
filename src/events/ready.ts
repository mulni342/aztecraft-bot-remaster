import { Event } from "../types"

let event: Event = {
    name: 'ready',
    run: (client) =>
    {
        console.log("¡Hola PecaBot esta listo para ti!");
        function dany()
        {
            let elementos = [`PecaBot | ${process.env.prefix}help`, `play.aztecraft.com`]

            client.user?.setPresence({
                "activities": [{
                    'name': elementos[Math.floor(elementos.length * Math.random())],
                    'type': 'WATCHING'
                }],
                "status": "online"
            })

        }
        setInterval(dany, 6000)
    }
}

export = event;
