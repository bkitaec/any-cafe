require('dotenv').config();

// DB_HOST: process.env.DB_HOST || 'remotemysql.com',
// DB_PORT: process.env.DB_PORT || '3306',
// DB_NAME: process.env.DB_NAME || 'hWXPCnEMfB',
// DB_USER: process.env.DB_USER || 'hWXPCnEMfB',
// DB_PASSWORD: process.env.DB_PASSWORD || 'xmJ0oRYK5x',
// DB_DIALECT: process.env.DB_DIALECT || 'mysql',


module.exports = {
    development: {
        username: process.env.DB_USER || 'hWXPCnEMfB',
        password: process.env.DB_PASS || 'xmJ0oRYK5x',
        database: process.env.DB_NAME || 'hWXPCnEMfB',
        host: process.env.DB_HOST || 'remotemysql.com',
        port: process.env.DB_PORT || '3306',
        dialect: 'mysql',
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
    },
};
