import { config } from 'dotenv';

config();

export default {
    development: {
        connectionString: process.env.DEV_DATABASE_URL,
    },
    test: {
        connectionString: process.env.TEST_DATABASE_URL,
    },
    production: {
        connectionString: process.env.DATABASE_URL,
    }
}