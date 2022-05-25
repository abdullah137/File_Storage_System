import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../utils/logger';

// NAMESPACE
const NAMESPACE = 'Connect';

const databaseConnection = () => {
    
    const dbUri = config.mongo.url;

    return mongoose.connect(dbUri).then(() => {
        logger.info(NAMESPACE, 'Database Connected')
    }).catch((error) => {
        logger.error("Database Connection failed", error);
        process.exit(1);
    });
}

export default databaseConnection;