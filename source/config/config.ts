import logger  from '../utils/logger';
import dotenv from 'dotenv';
import fs from 'fs';

// CONST NEEDED
const NAMESPACE = 'Config'

// Checking if .evn file exists at the absolute before
if(fs.existsSync(".env")) {
    logger.info( NAMESPACE, 'Using .env file to supply config environment variable');
    dotenv.config({ path: '.env' });
} else {
    logger.debug(NAMESPACE, "Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

// list of all connaacts to variables
const MONGO_USERNAME = process.env.MONGO_USERNAME || "abdullah";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DB = process.env.MONGO_DB || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.xbjva.mongodb.net/${MONGO_DB}`;
const HOSTNAME = 'localhost';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;


const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        hostname: HOSTNAME,
        port: SERVER_PORT
    }
}

export default config