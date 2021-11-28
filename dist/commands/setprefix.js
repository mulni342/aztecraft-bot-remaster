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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let command = {
    name: "setprefix",
    run: (message, client, args) => {
        var _a;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_MESSAGES"))) {
            return message.channel.send("❎ |**¡No tienes permiso para usar este comando!**");
        }
        let config = require(path.join(process.cwd(), "config.json"));
        if (args[0] == undefined) {
            return message.channel.send("❎ |**No definiste un prefijo nuevo!**");
        }
        if (args[0].length > 5) {
            return message.channel.send("❎ |**¡El prefijo no puede exceder los 5 caracteres!**");
        }
        config['prefix'] = args[0];
        process.env.prefix = args[0];
        fs.writeFileSync(path.join(process.cwd(), "config.json"), JSON.stringify(config, null, 4));
        message.channel.send(`Nuevo Prefijo: **${args[0]}**`);
    }
};
module.exports = command;
