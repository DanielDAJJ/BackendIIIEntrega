import winston from "winston";
import path from 'path';
import __dirname from "../utils/index.js";

const logDir = path.join(__dirname, '../logs');

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    color: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'green',
        debug: 'blue'
    }
};

winston.addColors(customLevels.color);

const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
        winston.format.colorize({all:true}),
        winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss'}),
        winston.format.printf(({level, message, timestamp})=>{
            return `[${timestamp}] ${level}: ${message}`
        })
    ),
    transports: [
        new winston.transports.Console({level: 'debug'}),
        new winston.transports.File({
            filename: path.join(logDir, 'errors.log'),
            level: 'error'
        }),
        new winston.transports.File({
            filename: path.join(logDir, 'combined.log')
        })
    ]
});

export default logger