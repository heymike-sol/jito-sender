"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var fs_1 = __importDefault(require("fs"));
if (fs_1.default.existsSync(".env")) {
    dotenv_1.default.config({ path: ".env" });
}
console.log('process.env.DROPLET', process.env.DROPLET);
console.log('process.env.JITO_URL', process.env.JITO_URL);
if (!process.env.JITO_URL) {
    throw new Error('JITO_URL must be defined');
}
if (!process.env.DROPLET) {
    throw new Error('DROPLET must be defined');
}
