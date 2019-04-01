import * as dotEnv from 'dotenv';
dotEnv.config();

export const ENV = {
    PORT: process.env.PORT || '3000',

    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_NAME: process.env.DB_NAME || 'anycafe',
    DB_USER: process.env.DB_USER || 'anycafe',
    DB_PASSWORD: process.env.DB_PASSWORD || 'anycafe',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',

    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || 'secureKey',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1y',
};
