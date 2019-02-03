import { Pool } from 'pg';
import configAll from '../../config/database_config';

const env = process.env.NODE_ENV || 'development';
const config = configAll[env];

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('remove', () => {
    console.log('Client removed');
    process.exit(0);
});

export default pool;
