import { config } from 'dotenv';

config();

export default {
    development: {
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
        host: process.env.HOST,
        dialect: 'postgres',
    },
    production: {
        database_url: process.env.DATABASE_URL
    }
}
