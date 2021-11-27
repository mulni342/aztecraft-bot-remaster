import { Event } from "../types"

let event: Event = {
    name: 'ready',
    run: (client) =>
    {
        console.log("Hola Dany! Estoy listo");
        function dany()
        {
            let elementos = [`DemonCrafters | ${process.env.prefix}help`, `Play.demoncrafters.com`]

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
