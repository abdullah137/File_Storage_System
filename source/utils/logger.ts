import winston from "winston";

const getTimeStamp = ():string => {
    return new Date().toString();
}

// define the custom settings for each transport (file, console)
var otherOptions = {
    file: {
      level: 'info',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

const options:winston.LoggerOptions = {
    
    
    transports: [
        new winston.transports.Console(otherOptions.console),
        new winston.transports.File({ filename: "debug.log",level: "debug" })
    ],
    
};

const logger = winston.createLogger(options);

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        logger.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        logger.info(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`);
    }
};

const warn = (namespace: string, message: string, object?: any) => {
    if (object) {
        logger.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`, object);
    } else {
        logger.warn(`[${getTimeStamp()}] [WARN] [${namespace}] ${message}`);
    }
};


const error = (namespace: string, message: string, object?: any) => {
    if (object) {
        logger.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`, object);
    } else {
        logger.error(`[${getTimeStamp()}] [ERROR] [${namespace}] ${message}`);
    }
};

const debug = (namespace: string, message: string, object?: any) => {
    if (object) {
        logger.error(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`, object);
    } else {
        logger.error(`[${getTimeStamp()}] [DEBUG] [${namespace}] ${message}`);
    }
};

export default {
    info, 
    debug,
    error,
    warn
};