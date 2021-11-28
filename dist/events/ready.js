"use strict";
let event = {
    name: 'ready',
    run: (client) => {
        console.log("¡Hola PecaBot esta listo para ti!");
        function dany() {
            var _a;
            let elementos = [`PecaBot | ${process.env.prefix}help`, `play.aztecraft.com`];
            (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
                "activities": [{
                        'name': elementos[Math.floor(elementos.length * Math.random())],
                        'type': 'WATCHING'
                    }],
                "status": "online"
            });
        }
        setInterval(dany, 6000);
    }
};
module.exports = event;
