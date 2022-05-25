import express, { Application, Response, Request, NextFunction  } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import config from './config/config';
import logger from './utils/logger';

// Importing the dabase connection
import connect from './database/connect';

const app:Application = express();

const NAMESPACE = 'Server';


// Database connection
connect();

// ?? Logging the request

app.use((req: Request, res:Response, next: NextFunction) => {
    logger.info(NAMESPACE, `METHOD -[${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)
    
    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD -[${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`)
    });
    next();
});

// Parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rules of our API
app.use((req:Request, res:Response, next:NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTION') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});


// Error Handling
app.use((req:Request, res:Response, next:NextFunction) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});


http.createServer(app).listen(config.server.port, () => logger.info(NAMESPACE,`Server running on ${config.server.hostname}:${config.server.port}`));