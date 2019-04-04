import * as dotEnv from 'dotenv';
dotEnv.config();

export const ENV = {
    PORT: process.env.PORT || '1313',

    DB_HOST: process.env.DB_HOST || 'remotemysql.com',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_NAME: process.env.DB_NAME || 'hWXPCnEMfB',
    DB_USER: process.env.DB_USER || 'hWXPCnEMfB',
    DB_PASSWORD: process.env.DB_PASSWORD || 'xmJ0oRYK5x',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'secureKey',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1y',
};
