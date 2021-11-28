"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const command = {
    name: 'basic-info',
    run: (message, client, args) => {
        var _a;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has('ADMINISTRATOR'))) {
            return message.channel.send('❎ |**¡No tienes permisos suficientes para usar este comando!**');
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const config = require(path.join(process.cwd(), 'config.json'));
        if (!args[0]) {
            return message.channel.send('❎ |**Define el tipo de datos. \n¡Tipos de datos: `comunidad, invitacion, logo, youtube y tienda`!**');
        }
        const types = {
            'comunidad': 'community',
            'invitacion': 'invitation',
            'logo': 'logo',
            'youtube': 'youtube',
            'tienda': 'shop'
        };
        if (!types[args[0]]) {
            return message.channel.send('❎ |**El tipo de dato definido no es valido.**');
        }
        let info_basic;
        config['basic_infos'][types[args[0]]] = info_basic;
        message.channel.send(`<#${info_basic}> es el nuevo dato de ${args[0]}`);
        fs.writeFileSync(path.join(process.cwd(), 'config.json'), JSON.stringify(config, null, 4));
    }
};
module.exports = command;
