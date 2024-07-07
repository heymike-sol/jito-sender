import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" });
}

console.log('process.env.DROPLET', process.env.DROPLET);
console.log('process.env.JITO_URL', process.env.JITO_URL);

if (!process.env.JITO_URL) {
    throw new Error('JITO_URL must be defined');
}

if (!process.env.DROPLET) {
    throw new Error('DROPLET must be defined');
}

if (!process.env.MONGODB_CONNECTION_URL) {
    throw new Error('MONGODB_CONNECTION_URL must be defined');
}

