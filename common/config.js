'use strict';

const configMap = {
    serviceName: process.env.SERVICE_NAME,
    mysql: {
        database: process.env.MYSQL_DATABASE,
        userName: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        options: {
            dialect: process.env.MYSQL_OPTIONS_DIALECT,
            host: process.env.MYSQL_OPTIONS_HOST,
            pool: {
                max: parseInt(process.env.MYSQL_OPTIONS_POOL_MAX),
                min: parseInt(process.env.MYSQL_OPTIONS_POOL_MIN),
                idle: parseInt(process.env.MYSQL_OPTIONS_POOL_IDLE)
            },
            logging: (process.env.MYSQL_OPTIONS_LOGGING == 1) ? console.log : false
        }
    },
};


module.exports = configMap;