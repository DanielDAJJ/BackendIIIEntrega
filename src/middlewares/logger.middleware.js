import logger from "../config/logger.js";

const addLogger = (req, res, next) =>{
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
};

export default addLogger;